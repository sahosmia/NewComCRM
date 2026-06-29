<?php

namespace App\Services;

use App\Models\Requirement;
use App\Repositories\RequirementRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class RequirementService
{
    public function __construct(
        private RequirementRepository $requirements,
    ) {
    }

    public function paginateIndex(array $filters): LengthAwarePaginator
    {
        return $this->requirements->paginateForIndex($filters);
    }



    public function create(array $data): Requirement
    {
        return DB::transaction(function () use ($data) {
            $requirementData = collect($data)->except(['items', 'accessories', 'installations'])->toArray();
            
            $requirement = $this->requirements->create($requirementData);

            $requirement->items()->createMany($data['items']);
            if ($data['has_accessories'] ?? false) {
                $accessories = collect($data['accessories'] ?? [])->filter(fn($item) => !empty($item['title']))->toArray();
                if (!empty($accessories)) {
                    $requirement->accessories()->createMany($accessories);
                }
            }

            if ($data['has_installation'] ?? false) {
                $installations = collect($data['installations'] ?? [])->filter(fn($item) => !empty($item['title']))->toArray();
                if (!empty($installations)) {
                    $requirement->installations()->createMany($installations);
                }
            }

            // Explicitly calculate to ensure taxes/accessories/installation are included
            $requirement->calculateGrandTotal();

            if ($requirement->status === 'purchased') {
                $this->decreaseStock($requirement);
                $this->createSale($requirement);
            }

            return $requirement;
        });
    }

    public function update(Requirement $requirement, array $data): void
    {
        DB::transaction(function () use ($requirement, $data) {
            $newStatus = $data['status'] ?? $requirement->status;
            $requirementData = collect($data)->except(['items', 'accessories', 'installations', 'status'])->toArray();

            // Update basic info except status first
            $this->requirements->update($requirement, $requirementData);

            // Sync items/accessories/installations
            $requirement->items()->delete();
            $requirement->items()->createMany($data['items']);

            $requirement->accessories()->delete();
            if (($data['has_accessories'] ?? false)) {
                $accessories = collect($data['accessories'] ?? [])->filter(fn($item) => !empty($item['title']))->toArray();
                if (!empty($accessories)) {
                    $requirement->accessories()->createMany($accessories);
                }
            }

            $requirement->installations()->delete();
            if (($data['has_installation'] ?? false)) {
                $installations = collect($data['installations'] ?? [])->filter(fn($item) => !empty($item['title']))->toArray();
                if (!empty($installations)) {
                    $requirement->installations()->createMany($installations);
                }
            }

            // Refresh items to ensure observer uses new ones
            $requirement->load('items');

            // Update status and trigger calculations (and observer if status changed)
            $requirement->status = $newStatus;
            $requirement->calculateGrandTotal();
        });
    }

    public function delete(Requirement $requirement): void
    {
        $this->requirements->delete($requirement);
    }

    public function bulkDelete(array $ids): void
    {
        $this->requirements->bulkDelete($ids);
    }

    public function getForExport(array $ids): Collection
    {
        return $this->requirements->getForExport($ids);
    }

    public function selectOptions(): Collection
    {
        return $this->requirements->selectOptions();
    }

    public function decreaseStock(Requirement $requirement): void
    {
        foreach ($requirement->items as $item) {
            if ($item->product) {
                $item->product->decrement('stock_quantity', $item->quantity);
            }
        }
    }

    public function increaseStock(Requirement $requirement): void
    {
        foreach ($requirement->items as $item) {
            if ($item->product) {
                $item->product->increment('stock_quantity', $item->quantity);
            }
        }
    }

    public function createSale(Requirement $requirement): void
    {
        \App\Models\Sale::updateOrCreate(
            ['requirement_id' => $requirement->id],
            [
                'customer_id' => $requirement->customer_id,
                'amount' => $requirement->grand_total,
                'sale_date' => now(),
            ]
        );
    }

    public function cancelSale(Requirement $requirement): void
    {
        \App\Models\Sale::where('requirement_id', $requirement->id)->forceDelete();
    }

    /* Generate PDF for a requirement.
     */
    public function generatePdf(Requirement $requirement)
    {
        $requirement->load([
            'customer.company',
            'items.product.unit',
            'accessories.unit',
            'installations.unit',
            'quotationRecipient.company',
            'quotationSender',
            'user',
        ]);

        $data = [
            'requirement' => $requirement,
            'date' => now()->format('Y-m-d'),
            'header_logo_1' => $this->getImageBase64(setting('logo')),
            'header_logo_2' => $this->getImageBase64(setting('secondary_logo')),
            'signature' => $this->getImageBase64($requirement->quotationSender?->signature ?? $requirement->customer->assignedUser?->signature),
            'seal' => $this->getImageBase64(setting('company_seal')),
        ];

        return Pdf::loadView('pdf.my_report', $data);
    }

    /**
     * Get image as base64 string for PDF rendering.
     */
    private function getImageBase64($path)
    {
        if (!$path)
            return null;

        $fullPath = storage_path('app/public/' . $path);

        if (!file_exists($fullPath))
            return null;

        $type = pathinfo($fullPath, PATHINFO_EXTENSION);
        $data = file_get_contents($fullPath);
        return 'data:image/' . $type . ';base64,' . base64_encode($data);
    }
}
