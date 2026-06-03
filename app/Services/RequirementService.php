<?php

namespace App\Services;

use App\Models\Requirement;
use App\Repositories\CustomerRepository;
use App\Repositories\ProductRepository;
use App\Repositories\RequirementRepository;
use App\Repositories\UnitRepository;
use App\Repositories\UserRepository;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class RequirementService
{
    public function __construct(
        private RequirementRepository $requirements,
        private CustomerRepository $customers,
        private ProductRepository $products,
        private UnitRepository $units,
    ) {}

    public function paginateIndex(array $filters): LengthAwarePaginator
    {
        return $this->requirements->paginateForIndex($filters);
    }


    public function create(array $data): Requirement
    {
        return DB::transaction(function () use ($data) {
            $requirementData = collect($data)->except(['items'])->toArray();
            $requirementData['status'] = 'pending';

            $requirement = $this->requirements->create($requirementData);

            $requirement->items()->createMany($data['items']);

            // Explicitly calculate to ensure taxes/accessories/installation are included
            $requirement->calculateGrandTotal();

            return $requirement;
        });
    }

    public function update(Requirement $requirement, array $data): void
    {
        DB::transaction(function () use ($requirement, $data) {
            $requirementData = collect($data)->except(['items'])->toArray();

            $this->requirements->update($requirement, $requirementData);

            $requirement->items()->delete();

            $requirement->items()->createMany($data['items']);

            // Explicitly calculate to ensure taxes/accessories/installation are included
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

    public function generatePdf(Requirement $requirement)
    {
        $requirement->load([
            'customer.assignedUser',
            'items.product.unit',
            'accessoriesUnit',
            'installationUnit',
            'quotationRecipient.company',
            'quotationSender'
        ]);

        $getImage = function ($path) {
            if (!file_exists($path)) return "";
            $data = file_get_contents($path);
            $type = pathinfo($path, PATHINFO_EXTENSION);
            return 'data:' . $type . ';base64,' . base64_encode($data);
        };

        $assignedUser = $requirement->customer->assignedUser;

        $customerSignaturePath = null;
        if ($assignedUser && $assignedUser->signature) {
            $customerSignaturePath = storage_path('app/public/' . $assignedUser->signature);
        }

        $data = [
            'header_logo_1' => $getImage(public_path('pdf-logo1.png')),
            'header_logo_2' => $getImage(public_path('crystal-logo-png.png')),
            'seal'    => $getImage(public_path('seal.png')),
            'signature' => $getImage($customerSignaturePath),
            'title' => 'Project Report',
            'date' => date('d F Y'),
            'requirement' => $requirement,
        ];

        ini_set('memory_limit', '256M');

        return Pdf::loadView('pdf.my_report', $data)
            ->setPaper('a4', 'portrait')
            ->setOption(['isPhpEnabled' => true]);
    }
}
