<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class UserService
{
    public function __construct(
        private UserRepository $users,
    ) {}

    public function paginateIndex(array $filters): LengthAwarePaginator
    {
        return $this->users->paginateForIndex($filters);
    }

    public function usersForForm(): Collection
    {
        return $this->users->selectOptions();
    }

    public function create(array $data): User
    {
        return $this->users->create($data);
    }

    public function update(User $user, array $data): void
    {
        $this->users->update($user, $data);
    }
}
