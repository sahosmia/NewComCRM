<?php

namespace App\Repositories;

use App\Models\Supplier;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class SupplierRepository
{
    public function paginateForIndex(array $params): LengthAwarePaginator
    {
        $perPage = $params['per_page'] ?? setting('paginated_quantity', 10);

        return Supplier::query()
            ->when($params['search'] ?? null, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%");
                });
            })
            ->when(isset($params['sort']), function ($query) use ($params) {
                $query->orderBy($params['sort'], $params['direction'] ?? 'desc');
            }, function ($query) {
                $query->latest();
            })
            ->paginate($perPage)
            ->withQueryString($params);
    }

    public function all(): Collection
    {
        return Supplier::query()->get();
    }

    public function create(array $data): Supplier
    {
        return Supplier::query()->create($data);
    }

    public function update(Supplier $supplier, array $data): void
    {
        $supplier->update($data);
    }

    public function delete(Supplier $supplier): void
    {
        $supplier->delete();
    }

    public function bulkDelete(array $ids): void
    {
        $query = Supplier::query();

        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }

        $query->delete();
    }
}
