<?php

namespace App\Repositories;

use App\Models\Requirement;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class RequirementRepository
{
    public function paginateForIndex(array $params): LengthAwarePaginator
    {
        $perPage = $params['per_page'] ?? 10;
        $user = auth()->user();

        return Requirement::query()
            ->with([
                'customer',
                'items.product.unit'
            ])

            ->when(!$user->isSuperAdmin(), function ($query) use ($user) {
                $query->whereHas('customer', function ($q) use ($user) {
                    $q->where('assigned_to', $user->id);
                });
            })

            ->when($params['search'] ?? null, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->whereHas('customer', function ($sub) use ($search) {
                        $sub->where('name', 'like', "%{$search}%");
                    })->orWhereHas('items.product', function ($sub) use ($search) {
                        $sub->where('name', 'like', "%{$search}%");
                    });
                });
            })

            ->when($params['customer_id'] ?? null, function ($query, $customer_id) {
                $query->where('customer_id', $customer_id);
            })

            ->when(isset($params['sort']), function ($query) use ($params) {
                $query->orderBy($params['sort'], $params['direction'] ?? 'desc');
            }, function ($query) {
                $query->latest();
            })

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
}
