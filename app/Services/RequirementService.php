<?php

namespace App\Services;

use App\Models\Requirement;
use App\Repositories\CustomerRepository;
use App\Repositories\ProductRepository;
use App\Repositories\RequirementRepository;
use App\Repositories\UnitRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
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

    public function formOptions(): array
    {
        return [
            'customers' => $this->customers->forRequirementForm(),
            'products'  => $this->products->forRequirementForm(),
            'units'     => $this->units->all(),
        ];
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

    public function getForExport(array $ids): \Illuminate\Support\Collection
    {
        return $this->requirements->getForExport($ids);
    }
}
