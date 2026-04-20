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

        if (!isset($data['assigned_to']) && !auth()->user()->isSuperAdmin()) {
            $data['assigned_to'] = auth()->id();
        }

        return $this->customers->create($data);
    }

    public function update(Customer $customer, array $data): void
    {
        $this->customers->update($customer, $data);
    }

    public function bulkDelete(array $ids): void
    {
        $this->customers->bulkDelete($ids);
    }
}
