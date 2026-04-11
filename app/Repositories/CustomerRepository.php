<?php

namespace App\Repositories;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class CustomerRepository
{
    public function selectOptions(): Collection
    {
        return Customer::query()
            ->select('id', 'name')
            ->get();
    }

    public function paginateForIndex(array $params): LengthAwarePaginator
    {
        $perPage = $params['per_page'] ?? 10;

        return Customer::query()
            ->with('assignedUser')
            ->when($params['search'] ?? null, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                    ->orWhere('company_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($params['sort_by'] ?? 'created_at', function ($query, $sortBy) use ($params) {
                $direction = $params['sort_direction'] ?? 'desc';
                $query->orderBy($sortBy, $direction);
            }, function ($query) {
                $query->latest();
            })
            ->paginate($perPage)
            ->withQueryString();
    }

    public function create(array $data): Customer
    {
        
        return Customer::query()->create($data);
    }

    public function update(Customer $customer, array $data): void
    {
        $customer->update($data);
    }

    public function delete(Customer $customer): void
    {
        $customer->delete();
    }

    public function forRequirementForm(): Collection
    {
        return Customer::query()
            ->select('id', 'name', 'company_name')
            ->get();
    }

    public function activeForQuotation(User $user): Collection
    {
        return Customer::query()
            ->active()
            ->when(! $user->isSuperAdmin(), fn ($query) => $query->where('assigned_to', $user->id))
            ->get();
    }

    public function findWithRequirementsForQuotation(?int $customerId): ?Customer
    {
        if (! $customerId) {
            return null;
        }

        return Customer::query()
            ->with('requirements.product')
            ->find($customerId);
    }
}
