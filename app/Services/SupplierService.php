<?php

namespace App\Services;

use App\Models\Supplier;
use App\Repositories\SupplierRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class SupplierService
{
    public function __construct(
        private SupplierRepository $suppliers,
    ) {}

    public function paginateIndex(array $filters): LengthAwarePaginator
    {
        return $this->suppliers->paginateForIndex($filters);
    }

    public function all(): Collection
    {
        return $this->suppliers->all();
    }

    public function create(array $data): Supplier
    {
        return $this->suppliers->create($data);
    }

    public function update(Supplier $supplier, array $data): void
    {
        $this->suppliers->update($supplier, $data);
    }

    public function delete(Supplier $supplier): void
    {
        $this->suppliers->delete($supplier);
    }

    public function bulkDelete(array $ids): void
    {
        $this->suppliers->bulkDelete($ids);
    }
}
