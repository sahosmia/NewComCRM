<?php

namespace App\Repositories;

use App\Models\Requirement;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class RequirementRepository
{
    public function paginateForIndex(array $params): LengthAwarePaginator
    {
        $perPage = $params['per_page'] ?? 10;

        return Requirement::query()
            ->with(['customer', 'product'])
            ->when($params['search'] ?? null, function ($query, $search) {
                $query->whereHas('customer', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                })->orWhereHas('product', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
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
            ->withQueryString($params);
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
