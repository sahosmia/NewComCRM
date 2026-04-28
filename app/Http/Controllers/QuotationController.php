<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuotationRequest;
use App\Http\Requests\UpdateQuotationRequest;
use App\Models\Quotation;
use App\Models\User;
use App\Services\QuotationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class QuotationController extends Controller
{
    public function __construct(
        private QuotationService $quotationService,
    ) {}

    public function index(Request $request)
    {
        $user = Auth::user();
        if (! $user instanceof User) {
            abort(401);
        }

        return Inertia::render('Quotations/Index', [
            'quotations' => $this->quotationService->paginateIndex($request->all(), $user),
            'stats' => $this->quotationService->stats(),
        ]);
    }

    public function create(Request $request)
    {
        $user = Auth::user();
        if (! $user instanceof User) {
            abort(401);
        }

        return Inertia::render('Quotations/Create', $this->quotationService->createPageData($user, $request));
    }

    public function store(StoreQuotationRequest $request)
    {
        $quotation = $this->quotationService->store(
            $request->validated(),
            (int) Auth::id()
        );

        return redirect()->route('quotations.index')
            ->with('success', 'Quotation created successfully.');
    }

    public function show(Quotation $quotation)
    {
        return Inertia::render('Quotations/Show', [
            'quotation' => $quotation->load(['customer', 'user', 'items.product']),
        ]);
    }

    public function edit(Quotation $quotation)
    {
        $user = Auth::user();
        if (! $user instanceof User) {
            abort(401);
        }

        return Inertia::render('Quotations/Edit', array_merge(
            [
                'quotation' => $quotation->load('items'),
            ],
            $this->quotationService->editPageData($user, $quotation)
        ));
    }

    public function update(UpdateQuotationRequest $request, Quotation $quotation)
    {
        $this->quotationService->update($quotation, $request->validated());

        return redirect()->route('quotations.index')
            ->with('success', 'Quotation updated successfully.');
    }

    public function destroy(Quotation $quotation)
    {
        $this->quotationService->delete($quotation);

        return redirect()->route('quotations.index')
            ->with('success', 'Quotation deleted successfully.');
    }

     public function updateStatus(Request $request, Quotation $quotation)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:draft,sent,accepted,declined',
        ]);

        $quotation->update(['status' => $validated['status']]);

        return back()->with('success', 'Quotation status updated successfully');
    }
}
