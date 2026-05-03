<?php

namespace App\Repositories;

use App\Models\Sale;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class SaleRepository
{
    public function paginateForIndex(array $params): LengthAwarePaginator
    {
        $perPage = $params['per_page'] ?? 10;

        return Sale::query()
            ->with(['customer', 'requirement.items.product'])
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function bulkDelete(array $ids): void
    {
        $query = Sale::query();

        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }

        $query->delete();
    }

    public function getForExport(array $ids): Collection
    {
        return Sale::query()
            ->with(['customer', 'requirement.items.product'])
            ->when(!empty($ids), fn($q) => $q->whereIn('id', $ids))
            ->get();
    }
}
