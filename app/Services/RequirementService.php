<?php

namespace App\Services;

use App\Models\Requirement;
use App\Repositories\CustomerRepository;
use App\Repositories\ProductRepository;
use App\Repositories\RequirementRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class RequirementService
{
    public function __construct(
        private RequirementRepository $requirements,
        private CustomerRepository $customers,
        private ProductRepository $products,
    ) {}

    public function paginateIndex(array $filters): LengthAwarePaginator
    {
        return $this->requirements->paginateForIndex($filters);
    }

    /**
     * @return array{customers: \Illuminate\Database\Eloquent\Collection, products: \Illuminate\Database\Eloquent\Collection}
     */
    public function formOptions(): array
    {
        return [
            'customers' => $this->customers->forRequirementForm(),
            'products' => $this->products->forRequirementForm(),
        ];
    }

    public function create(array $data): Requirement
    {
        return $this->requirements->create($data);
    }

    public function update(Requirement $requirement, array $data): void
    {
        $this->requirements->update($requirement, $data);
    }

    public function delete(Requirement $requirement): void
    {
        $this->requirements->delete($requirement);
    }
}
