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
        $sort = $params['sort'] ?? 'sale_date';
        $direction = $params['direction'] ?? 'desc';

        return Sale::query()
            ->with(['customer.assignedUser', 'customer.company', 'requirement.items.product', 'requirement.user'])
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
            ->when($params['period'] ?? null, function ($query, $period) {
                match ($period) {
                    'today' => $query->whereDate('sale_date', today()),
                    'upcoming' => $query->whereDate('sale_date', '>', today()),
                    default => null,
                };
            })
            ->orderBy($sort, $direction)
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
            ->latest()
            ->get();
    }
}
