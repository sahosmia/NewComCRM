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
            ->with(['customer.assignedUser', 'requirement.items.product'])
            ->when($params['search'] ?? null, function ($query, $search) {
                $query->whereHas('requirement', function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%");
                });
            })
            ->when($params['customer_id'] ?? null, fn ($query, $id) => $query->where('customer_id', $id))
            ->when($params['assigned_to'] ?? null, function ($query, $userId) {
                $query->whereHas('customer', function ($q) use ($userId) {
                    $q->where('assigned_to', $userId);
                });
            })
            ->when($params['start_date'] ?? null, fn ($query, $startDate) => $query->whereDate('sale_date', '>=', $startDate))
            ->when($params['end_date'] ?? null, fn ($query, $endDate) => $query->whereDate('sale_date', '<=', $endDate))
            ->when(isset($params['sort']), function ($query) use ($params) {
                $query->orderBy($params['sort'], $params['direction'] ?? 'desc');
            }, function ($query) {
                $query->latest();
            })
            ->paginate($perPage)
            ->withQueryString($params);
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
            ->with(['customer.assignedUser', 'requirement.items.product'])
            ->when(!empty($ids), fn($q) => $q->whereIn('id', $ids))
            ->get();
    }
}
