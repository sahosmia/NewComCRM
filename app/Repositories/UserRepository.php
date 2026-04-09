<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class UserRepository
{
    public function selectOptions(): Collection
    {
        return User::query()
            ->select('id', 'name')
            ->get();
    }

    public function paginateForIndex(int $perPage = 10): LengthAwarePaginator
    {
        return User::query()
            ->latest()
            ->paginate($perPage);
    }

    public function create(array $data): User
    {
        return User::query()->create($data);
    }

    public function update(User $customer, array $data): void
    {
        $customer->update($data);
    }

    public function delete(User $customer): void
    {
        $customer->delete();
    }

    public function forRequirementForm(): Collection
    {
        return User::query()
            ->select('id', 'name', 'company_name')
            ->get();
    }

    public function activeForQuotation(User $user): Collection
    {
        return User::query()
            ->active()
            ->when(! $user->isSuperAdmin(), fn ($query) => $query->where('assigned_to', $user->id))
            ->get();
    }

    public function findWithRequirementsForQuotation(?int $customerId): ?User
    {
        if (! $customerId) {
            return null;
        }

        return User::query()
            ->with('requirements.product')
            ->find($customerId);
    }

}
