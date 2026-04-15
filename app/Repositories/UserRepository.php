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
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($params['role'] ?? null, function ($query, $role) {
                $query->where('role', $role);
            })
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
        if (empty($data['password'])) {
            unset($data['password']);
        }
        $user->update($data);
    }

    public function delete(User $user): void
    {
        $user->delete();
    }
}
