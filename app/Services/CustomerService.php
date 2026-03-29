<?php

namespace App\Services;

use App\Models\Customer;
use App\Repositories\CustomerRepository;
use App\Repositories\UserRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class CustomerService
{
    public function __construct(
        private CustomerRepository $customers,
        private UserRepository $users,
    ) {}

    public function paginateIndex(int $perPage = 10): LengthAwarePaginator
    {
        return $this->customers->paginateForIndex($perPage);
    }

    public function usersForForm(): Collection
    {
        return $this->users->selectOptions();
    }

    public function create(array $data): Customer
    {
        return $this->customers->create($data);
    }

    public function update(Customer $customer, array $data): void
    {
        $this->customers->update($customer, $data);
    }

    public function delete(Customer $customer): void
    {
        $this->customers->delete($customer);
    }
}
