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

    public function paginateForIndex(int $perPage = 10): LengthAwarePaginator
    {
        return Customer::query()
            ->with('assignedUser')
            ->latest()
            ->paginate($perPage);
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
