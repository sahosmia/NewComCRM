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

    public function paginateForIndex(array $params): LengthAwarePaginator
    {
        $perPage = $params['per_page'] ?? 10;

        return User::query()
            ->when($params['search'] ?? null, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phones', 'like', "%{$search}%");
                });
            })
            ->when($params['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            })

            ->when($params['role'] ?? null, function ($query, $role) {
                $query->where('type', $role);
            })
            // ------------------------------------
            ->when(isset($params['sort']), function ($query) use ($params) {
                $query->orderBy($params['sort'], $params['direction'] ?? 'desc');
            }, function ($query) {
                $query->latest();
            })
            ->paginate($perPage)
            ->withQueryString($params);
    }

    public function create(array $data): User
    {

        return User::query()->create($data);
    }

    public function update(User $user, array $data): void
    {
        $user->update($data);
    }

    public function delete(User $user): void
    {
        $user->delete();
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
            ->when(! $user->isSuperAdmin(), fn($query) => $query->where('assigned_to', $user->id))
            ->get();
    }

    public function findWithRequirementsForQuotation(?int $userId): ?User
    {
        if (! $userId) {
            return null;
        }

        return User::query()
            ->with('requirements.product')
            ->find($userId);
    }
}
