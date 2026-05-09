<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Quotation;
use App\Models\User;
use App\Repositories\CustomerRepository;
use App\Repositories\ProductRepository;
use App\Repositories\QuotationRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class QuotationService
{
    public function __construct(
        private QuotationRepository $quotations,
        private CustomerRepository $customers,
        private ProductRepository $products,
    ) {}

    public function paginateIndex(array $filters, User $user)
    {
        return $this->quotations->paginateForIndex($filters, $user);
    }

    public function stats(): array
    {
        return $this->quotations->indexStats();
    }

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
            $quotation = Quotation::query()->create(array_merge($validated, [
                'user_id' => $userId,
            ]));

            foreach ($validated['items'] as $item) {
                $quotation->items()->create($item);
            }

            return $quotation;
        });
    }

    public function update(Quotation $quotation, array $validated): void
    {
        DB::transaction(function () use ($quotation, $validated) {
            $quotation->update($validated);

            $quotation->items()->delete();

            foreach ($validated['items'] as $item) {
                $quotation->items()->create($item);
            }
        });
    }

    public function delete(Quotation $quotation): void
    {
        $quotation->delete();
    }

    public function bulkDelete(array $ids): void
    {
        $this->quotations->bulkDelete($ids);
    }

    public function send(Quotation $quotation): void
    {
        // Mail logic would go here if Mailables exist
        // Mail::to($quotation->customer->email)->send(new QuotationMail($quotation));

        $quotation->update(['status' => 'sent']);
    }

    public function downloadPdf(Quotation $quotation)
    {
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.quotation', [
            'quotation' => $quotation->load(['customer.company', 'user', 'items.product'])
        ]);

        return $pdf->download('quotation-' . $quotation->quotation_number . '.pdf');
    }

    public function duplicate(Quotation $quotation): Quotation
    {
        $newQuotation = $quotation->replicate();
        $newQuotation->status = 'draft';
        $newQuotation->pdf_path = null;
        $newQuotation->save(); // quotation_number generated on creating boot

        foreach ($quotation->items as $item) {
            $newItem = $item->replicate();
            $newItem->quotation_id = $newQuotation->id;
            $newItem->save();
        }

        return $newQuotation;
    }
}
