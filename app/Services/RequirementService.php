<?php

namespace App\Services;

use App\Models\Requirement;
use App\Repositories\CustomerRepository;
use App\Repositories\ProductRepository;
use App\Repositories\RequirementRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

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

    public function formOptions(): array
    {
        return [
            'customers' => $this->customers->forRequirementForm(),
            'products' => $this->products->forRequirementForm(),
        ];
    }

    public function create(array $data): Requirement
    {
        return DB::transaction(function () use ($data) {
            $requirement = $this->requirements->create([
                'customer_id' => $data['customer_id'],
                'notes'       => $data['notes'] ?? null,
                'status'      => 'pending'
            ]);

            $requirement->items()->createMany($data['items']);

            return $requirement;
        });
    }

    public function update(Requirement $requirement, array $data): void
    {
        DB::transaction(function () use ($requirement, $data) {
            $this->requirements->update($requirement, [
                'customer_id' => $data['customer_id'],
                'notes'       => $data['notes'] ?? null,
                'status'       => $data['status'] ?? 'pending',
            ]);

            $requirement->items()->delete();

            $requirement->items()->createMany($data['items']);
        });
    }

    public function delete(Requirement $requirement): void
    {
        $this->requirements->delete($requirement);
    }
}
