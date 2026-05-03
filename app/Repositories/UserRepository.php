<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;

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
        if (isset($data['signature']) && $data['signature'] instanceof \Illuminate\Http\UploadedFile) {
            $data['signature'] = $data['signature']->store('signatures', 'public');
        }

        return User::query()->create($data);
    }

    public function update(User $user, array $data): void
    {
        if (empty($data['password'])) {
            unset($data['password']);
        }

        if (isset($data['signature']) && $data['signature'] instanceof \Illuminate\Http\UploadedFile) {
            if ($user->signature) {
                Storage::disk('public')->delete($user->signature);
            }
            $data['signature'] = $data['signature']->store('signatures', 'public');
        }

        $user->update($data);
    }

    public function delete(User $user): void
    {
        $user->delete();
    }

    public function bulkDelete(array $ids): void
    {
        $query = User::query();

        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }

        $query->delete();
    }
}
