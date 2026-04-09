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

    public function paginateIndex(int $perPage = 10): LengthAwarePaginator
    {
        return $this->users->paginateForIndex($perPage);
    }

    public function usersForForm(): Collection
    {
        return $this->users->selectOptions();
    }

    public function create(array $data): User
    {
        return $this->users->create($data);
    }

    public function update(User $customer, array $data): void
    {
        $this->users->update($customer, $data);
    }

    public function delete(User $customer): void
    {
        $this->users->delete($customer);
    }
}
