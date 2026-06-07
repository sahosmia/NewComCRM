<?php

namespace App\Repositories;

use App\Models\Sale;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class SaleRepository
{
    public function paginateForIndex(array $params): LengthAwarePaginator
    {
        $perPage = $params['per_page'] ?? setting('paginated_quantity', 10);
        $search = $params['search'] ?? null;
        $customerId = $params['customer_id'] ?? null;
        $userId = $params['user_id'] ?? null;
        $startDate = $params['start_date'] ?? null;
        $endDate = $params['end_date'] ?? null;

        return Sale::query()
            ->with(['customer.assignedUser', 'customer.company', 'requirement.items.product'])
            ->when($search, function ($query, $search) {
                $query->whereHas('requirement', function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%");
                });
            })
            ->when($customerId, fn($q) => $q->where('customer_id', $customerId))
            ->when($userId, function ($query, $userId) {
                $query->whereHas('customer', fn($q) => $q->where('assigned_to', $userId));
            })
            ->when($startDate, fn($q) => $q->whereDate('sale_date', '>=', $startDate))
            ->when($endDate, fn($q) => $q->whereDate('sale_date', '<=', $endDate))
            ->when($params['sort'] ?? null, function ($query, $sort) use ($params) {
                $query->orderBy($sort, $params['direction'] ?? 'desc');
            }, function ($query) {
                $query->latest();
            })
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
            ->with(['customer.assignedUser', 'customer.company', 'requirement.items.product'])
            ->when(!empty($ids), fn($q) => $q->whereIn('id', $ids))
            ->get();
    }
}
