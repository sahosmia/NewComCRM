<?php

namespace App\Services;

use App\Mail\QuotationMail;
use App\Models\Product;
use App\Models\Quotation;
use App\Models\User;
use App\Repositories\CustomerRepository;
use App\Repositories\ProductRepository;
use App\Repositories\QuotationRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class QuotationService
{
    public function __construct(
        private QuotationRepository $quotations,
        private CustomerRepository $customers,
        private ProductRepository $products,
    ) {}

    /**
     * @return array{quotations: \Illuminate\Contracts\Pagination\LengthAwarePaginator, filters: array, stats: array}
     */
    public function indexData(User $user, Request $request): array
    {
        return [
            'quotations' => $this->quotations->paginateForIndex(
                $user,
                $request->status,
                $request->customer_id,
                $request->date_from,
                $request->date_to,
                $request->sort_field ?? 'created_at',
                $request->sort_direction ?? 'desc',
                (int) ($request->per_page ?? 10)
            ),
            'filters' => $request->only(['status', 'customer_id', 'date_from', 'date_to']),
            'stats' => $this->quotations->indexStats(),
        ];
    }

    /**
     * @return array{customers: \Illuminate\Database\Eloquent\Collection, products: \Illuminate\Database\Eloquent\Collection, selectedCustomer: ?\App\Models\Customer}
     */
    public function createPageData(User $user, Request $request): array
    {
        return [
            'customers' => $this->customers->activeForQuotation($user),
            'products' => $this->products->all(),
            'selectedCustomer' => $this->customers->findWithRequirementsForQuotation(
                $request->customer_id ? (int) $request->customer_id : null
            ),
        ];
    }

    /**
     * @return array{customers: \Illuminate\Database\Eloquent\Collection, products: \Illuminate\Database\Eloquent\Collection}
     */
    public function editPageData(User $user, Quotation $quotation): array
    {
        return [
            'customers' => $this->customers->activeForQuotation($user),
            'products' => $this->products->all(),
        ];
    }

    public function store(array $validated, int $userId): Quotation
    {
        return DB::transaction(function () use ($validated, $userId) {
            $subtotal = collect($validated['items'])->sum(
                fn ($item) => $item['quantity'] * $item['unit_price']
            );
            $tax = $validated['tax'] ?? 0;
            $discount = $validated['discount'] ?? 0;
            $total = $subtotal + $tax - $discount;

            $quotation = Quotation::query()->create([
                'customer_id' => $validated['customer_id'],
                'user_id' => $userId,
                'quotation_date' => now(),
                'valid_until' => $validated['valid_until'],
                'subtotal' => $subtotal,
                'tax' => $tax,
                'discount' => $discount,
                'total' => $total,
                'terms_conditions' => $validated['terms_conditions'] ?? null,
                'notes' => $validated['notes'] ?? null,
                'status' => $validated['status'],
            ]);

            foreach ($validated['items'] as $item) {
                $quotation->items()->create([
                    'product_id' => $item['product_id'],
                    'description' => $item['description'] ?? Product::query()->find($item['product_id'])->name,
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total' => $item['quantity'] * $item['unit_price'],
                ]);
            }

            if ($validated['status'] === 'sent') {
                $quotation->generatePDF();
            }

            return $quotation;
        });
    }

    public function update(Quotation $quotation, array $validated): void
    {
        DB::transaction(function () use ($quotation, $validated) {
            $subtotal = collect($validated['items'])->sum(
                fn ($item) => $item['quantity'] * $item['unit_price']
            );
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
                'status' => $validated['status'],
            ]);

            $quotation->items()->delete();

            foreach ($validated['items'] as $item) {
                $quotation->items()->create([
                    'product_id' => $item['product_id'],
                    'description' => $item['description'] ?? Product::query()->find($item['product_id'])->name,
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total' => $item['quantity'] * $item['unit_price'],
                ]);
            }

            if ($validated['status'] === 'sent') {
                $quotation->generatePDF();
            }
        });
    }

    public function delete(Quotation $quotation): void
    {
        $quotation->delete();
    }

    public function send(Quotation $quotation): void
    {
        if ($quotation->status === 'draft') {
            $quotation->generatePDF();
        }

        Mail::to($quotation->customer->email)->send(new QuotationMail($quotation));

        $quotation->update(['status' => 'sent']);
    }

    public function downloadPdf(Quotation $quotation): StreamedResponse
    {
        if (! $quotation->pdf_path || ! Storage::exists('public/'.$quotation->pdf_path)) {
            $quotation->generatePDF();
        }

        return Storage::download('public/'.$quotation->pdf_path);
    }

    public function duplicate(Quotation $quotation): Quotation
    {
        $newQuotation = $quotation->replicate();
        $newQuotation->status = 'draft';
        $newQuotation->quotation_number = Quotation::generateQuotationNumber();
        $newQuotation->save();

        foreach ($quotation->items as $item) {
            $newQuotation->items()->create($item->toArray());
        }

        return $newQuotation;
    }
}
