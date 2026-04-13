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

    public function paginateIndex(array $filters): LengthAwarePaginator
    {
        return $this->customers->paginateForIndex($filters);
    }

    public function usersForForm(): Collection
    {
        return $this->users->selectOptions();
    }

    public function create(array $data): Customer
    {
        $data['phones'] = array_filter($data['phones'] ?? []);

        $data['addresses'] = array_filter($data['addresses'] ?? []);
        return $this->customers->create($data);
    }

    public function update(Customer $customer, array $data): void
    {
        $this->customers->update($customer, $data);
    }
}
