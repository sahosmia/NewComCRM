<?php
namespace App\Http\Controllers;

use App\Models\Quotation;
use App\Models\Customer;
use App\Models\Product;
use App\Http\Requests\StoreQuotationRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\QuotationMail;

class QuotationController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $quotations = Quotation::with(['customer', 'user'])
            ->when(!$user->isSuperAdmin(), function ($query) use ($user) {
                return $query->where('user_id', $user->id);
            })
            ->when($request->status, function ($query, $status) {
                return $query->where('status', $status);
            })
            ->when($request->customer_id, function ($query, $customerId) {
                return $query->where('customer_id', $customerId);
            })
            ->when($request->date_from, function ($query, $dateFrom) {
                return $query->whereDate('quotation_date', '>=', $dateFrom);
            })
            ->when($request->date_to, function ($query, $dateTo) {
                return $query->whereDate('quotation_date', '<=', $dateTo);
            })
            ->orderBy($request->sort_field ?? 'created_at', $request->sort_direction ?? 'desc')
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('Quotations/Index', [
            'quotations' => $quotations,
            'filters' => $request->only(['status', 'customer_id', 'date_from', 'date_to']),
            'stats' => [
                'draft' => Quotation::draft()->count(),
                'sent' => Quotation::sent()->count(),
                'accepted' => Quotation::accepted()->count(),
                'total' => Quotation::accepted()->sum('total')
            ]
        ]);
    }

    public function create(Request $request)
    {
        $customers = Customer::active()
            ->when(!Auth::user()->isSuperAdmin(), function ($query) {
                return $query->where('assigned_to', Auth::id());
            })
            ->get();

        $products = Product::all();

        $selectedCustomer = null;
        if ($request->customer_id) {
            $selectedCustomer = Customer::with('requirements.product')
                ->find($request->customer_id);
        }

        return Inertia::render('Quotations/Create', [
            'customers' => $customers,
            'products' => $products,
            'selectedCustomer' => $selectedCustomer
        ]);
    }

    public function store(StoreQuotationRequest $request)
    {
        $validated = $request->validated();

        // Calculate totals
        $subtotal = collect($validated['items'])->sum(function ($item) {
            return $item['quantity'] * $item['unit_price'];
        });

        $tax = $validated['tax'] ?? 0;
        $discount = $validated['discount'] ?? 0;
        $total = $subtotal + $tax - $discount;

        $quotation = Quotation::create([
            'customer_id' => $validated['customer_id'],
            'user_id' => Auth::id(),
            'quotation_date' => now(),
            'valid_until' => $validated['valid_until'],
            'subtotal' => $subtotal,
            'tax' => $tax,
            'discount' => $discount,
            'total' => $total,
            'terms_conditions' => $validated['terms_conditions'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'status' => $validated['status']
        ]);

        foreach ($validated['items'] as $item) {
            $quotation->items()->create([
                'product_id' => $item['product_id'],
                'description' => $item['description'] ?? Product::find($item['product_id'])->name,
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'total' => $item['quantity'] * $item['unit_price']
            ]);
        }

        if ($validated['status'] === 'sent') {
            $quotation->generatePDF();
        }

        return redirect()->route('quotations.show', $quotation)
            ->with('success', 'Quotation created successfully.');
    }

    public function show(Quotation $quotation)
    {
        $this->authorize('view', $quotation);

        $quotation->load(['customer', 'user', 'items.product']);

        return Inertia::render('Quotations/Show', [
            'quotation' => $quotation
        ]);
    }

    public function edit(Quotation $quotation)
    {
        $this->authorize('update', $quotation);

        if ($quotation->status !== 'draft') {
            return redirect()->route('quotations.show', $quotation)
                ->with('error', 'Only draft quotations can be edited.');
        }

        $customers = Customer::active()
            ->when(!Auth::user()->isSuperAdmin(), function ($query) {
                return $query->where('assigned_to', Auth::id());
            })
            ->get();

        $products = Product::all();

        return Inertia::render('Quotations/Edit', [
            'quotation' => $quotation->load('items'),
            'customers' => $customers,
            'products' => $products
        ]);
    }

    public function update(Request $request, Quotation $quotation)
    {
        $this->authorize('update', $quotation);

        if ($quotation->status !== 'draft') {
            return redirect()->back()
                ->with('error', 'Only draft quotations can be updated.');
        }

        $validated = $request->validate([
            'valid_until' => 'required|date|after:today',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.description' => 'nullable|string',
            'tax' => 'nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'terms_conditions' => 'nullable|string',
            'notes' => 'nullable|string',
            'status' => 'required|in:draft,sent'
        ]);

        // Calculate totals
        $subtotal = collect($validated['items'])->sum(function ($item) {
            return $item['quantity'] * $item['unit_price'];
        });

        $tax = $validated['tax'] ?? 0;
        $discount = $validated['discount'] ?? 0;
        $total = $subtotal + $tax - $discount;

        $quotation->update([
            'valid_until' => $validated['valid_until'],
            'subtotal' => $subtotal,
            'tax' => $tax,
            'discount' => $discount,
            'total' => $total,
            'terms_conditions' => $validated['terms_conditions'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'status' => $validated['status']
        ]);

        // Delete old items and create new ones
        $quotation->items()->delete();

        foreach ($validated['items'] as $item) {
            $quotation->items()->create([
                'product_id' => $item['product_id'],
                'description' => $item['description'] ?? Product::find($item['product_id'])->name,
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'total' => $item['quantity'] * $item['unit_price']
            ]);
        }

        if ($validated['status'] === 'sent') {
            $quotation->generatePDF();
        }

        return redirect()->route('quotations.show', $quotation)
            ->with('success', 'Quotation updated successfully.');
    }

    public function destroy(Quotation $quotation)
    {
        $this->authorize('delete', $quotation);

        $quotation->delete();

        return redirect()->route('quotations.index')
            ->with('success', 'Quotation deleted successfully.');
    }

    public function send(Quotation $quotation)
    {
        $this->authorize('update', $quotation);

        if ($quotation->status === 'draft') {
            $quotation->generatePDF();
        }

        // Send email
        Mail::to($quotation->customer->email)
            ->send(new QuotationMail($quotation));

        $quotation->update(['status' => 'sent']);

        return redirect()->back()
            ->with('success', 'Quotation sent successfully.');
    }

    public function download(Quotation $quotation)
    {
        $this->authorize('view', $quotation);

        if (!$quotation->pdf_path || !\Storage::exists('public/' . $quotation->pdf_path)) {
            $quotation->generatePDF();
        }

        return \Storage::download('public/' . $quotation->pdf_path);
    }

    public function duplicate(Quotation $quotation)
    {
        $this->authorize('create', Quotation::class);

        $newQuotation = $quotation->replicate();
        $newQuotation->status = 'draft';
        $newQuotation->quotation_number = Quotation::generateQuotationNumber();
        $newQuotation->save();

        foreach ($quotation->items as $item) {
            $newQuotation->items()->create($item->toArray());
        }

        return redirect()->route('quotations.edit', $newQuotation)
            ->with('success', 'Quotation duplicated successfully.');
    }
}
