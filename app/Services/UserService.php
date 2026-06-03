<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class UserService
{
    public function __construct(
        private UserRepository $users,
    ) {}

    public function paginateIndex(array $filters): LengthAwarePaginator
    {
        return $this->users->paginateForIndex($filters);
    }


    public function create(array $data): User
    {
        if (isset($data['signature']) && $data['signature'] instanceof \Illuminate\Http\UploadedFile) {
            $data['signature'] = $data['signature']->store('signatures', 'public');
        }

        return $this->users->create($data);
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

        $this->users->update($user, $data);
    }

    public function bulkDelete(array $ids): void
    {
        $this->users->bulkDelete($ids);
    }
}
