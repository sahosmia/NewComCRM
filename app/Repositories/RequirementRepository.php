<?php

namespace App\Repositories;

use App\Models\Requirement;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class RequirementRepository
{
    public function paginateForIndex(array $params): LengthAwarePaginator
    {
        $perPage = $params['per_page'] ?? setting('paginated_quantity', 10);
        $user = auth()->user();


        return Requirement::query()
            ->with([
                'customer.assignedUser',
                'customer.company',
                'items.product.unit',
                'user'
            ])

            ->when($params['search'] ?? null, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhereHas('customer', function ($sub) use ($search) {
                            $sub->where('name', 'like', "%{$search}%");
                        });
                });
            })

            ->when($params['customer_id'] ?? null, function ($query, $customer_id) {
                $query->where('customer_id', $customer_id);
            })
            ->when($params['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($params['user_id'] ?? null, function ($query, $user_id) {
                $query->where('user_id', $user_id);
            })
            ->when($params['company_id'] ?? null, function ($query, $company_id) {
                $query->whereHas('customer', function ($q) use ($company_id) {
                    $q->where('company_id', $company_id);
                });
            })

            ->when($params['start_date'] ?? null, fn($query, $startDate) => $query->whereDate('created_at', '>=', $startDate))
            ->when($params['end_date'] ?? null, fn($query, $endDate) => $query->whereDate('created_at', '<=', $endDate))
            ->when($params['period'] ?? null, function ($query, $period) {
                match ($period) {
                    'today' => $query->whereDate('created_at', today()),
                    'total' => $query,
                    default => null,
                };
            })
            ->latest($params['sort'] ?? 'created_at') // Simplified sorting

            ->paginate($perPage)
            ->withQueryString();
    }

    public function create(array $data): Requirement
    {
        return Requirement::query()->create($data);
    }

    public function update(Requirement $requirement, array $data): void
    {
        $requirement->update($data);
    }

    public function delete(Requirement $requirement): void
    {
        $requirement->delete();
    }

    public function bulkDelete(array $ids): void
    {
        $query = Requirement::query();

        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }

        $query->delete();
    }

    public function getForExport(array $ids): \Illuminate\Database\Eloquent\Collection
    {
        return Requirement::query()
            ->with(['customer', 'items.product'])
            ->when(!empty($ids), fn($q) => $q->whereIn('id', $ids))
            ->get();
    }

    public function selectOptions(): \Illuminate\Database\Eloquent\Collection
    {
        return Requirement::query()
            ->select('id', 'title', 'customer_id')
            ->get();
    }

}
