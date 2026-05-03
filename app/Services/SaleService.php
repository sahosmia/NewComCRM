<?php

namespace App\Services;

use App\Repositories\SaleRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class SaleService
{
    public function __construct(
        private SaleRepository $sales
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
}
