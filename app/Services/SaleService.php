<?php

namespace App\Services;

use App\Repositories\CustomerRepository;
use App\Repositories\SaleRepository;
use App\Repositories\UserRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class SaleService
{
    public function __construct(
        private SaleRepository $sales,
        private CustomerRepository $customers,
        private UserRepository $users
    ) {}

    public function paginateIndex(array $filters): LengthAwarePaginator
    {
        return $this->sales->paginateForIndex($filters);
    }

    public function bulkDelete(array $ids): void
    {
        $this->sales->bulkDelete($ids);
    }

    public function getForExport(array $ids): Collection
    {
        return $this->sales->getForExport($ids);
    }

    public function customersForForm(): Collection
    {
        return $this->customers->selectOptions();
    }

    public function usersForForm(): Collection
    {
        return $this->users->selectOptions();
    }
}
