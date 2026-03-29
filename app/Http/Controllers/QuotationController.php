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

        return Inertia::render('Quotations/Index', $this->quotationService->indexData($user, $request));
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

        return redirect()->route('quotations.show', $quotation)
            ->with('success', 'Quotation created successfully.');
    }

    public function show(Quotation $quotation)
    {
        $this->authorize('view', $quotation);

        $quotation->load(['customer', 'user', 'items.product']);

        return Inertia::render('Quotations/Show', [
            'quotation' => $quotation,
        ]);
    }

    public function edit(Quotation $quotation)
    {
        $this->authorize('update', $quotation);

        if ($quotation->status !== 'draft') {
            return redirect()->route('quotations.show', $quotation)
                ->with('error', 'Only draft quotations can be edited.');
        }

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
        $this->authorize('update', $quotation);

        if ($quotation->status !== 'draft') {
            return redirect()->back()
                ->with('error', 'Only draft quotations can be updated.');
        }

        $this->quotationService->update($quotation, $request->validated());

        return redirect()->route('quotations.show', $quotation)
            ->with('success', 'Quotation updated successfully.');
    }

    public function destroy(Quotation $quotation)
    {
        $this->authorize('delete', $quotation);

        $this->quotationService->delete($quotation);

        return redirect()->route('quotations.index')
            ->with('success', 'Quotation deleted successfully.');
    }

    public function send(Quotation $quotation)
    {
        $this->authorize('update', $quotation);

        $this->quotationService->send($quotation);

        return redirect()->back()
            ->with('success', 'Quotation sent successfully.');
    }

    public function download(Quotation $quotation)
    {
        $this->authorize('view', $quotation);

        return $this->quotationService->downloadPdf($quotation);
    }

    public function duplicate(Quotation $quotation)
    {
        $this->authorize('create', Quotation::class);

        $newQuotation = $this->quotationService->duplicate($quotation);

        return redirect()->route('quotations.edit', $newQuotation)
            ->with('success', 'Quotation duplicated successfully.');
    }
}
