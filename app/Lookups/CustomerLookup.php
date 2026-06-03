<?php

namespace App\Lookups;

use App\Contracts\LookupProvider;
use App\Repositories\CustomerRepository;
use Illuminate\Support\Collection;

class CustomerLookup implements LookupProvider
{
    public function __construct(
        private CustomerRepository $repository
    ) {}

    public function handle(array $params = []): Collection
    {
        return $this->repository->selectOptions()
            ->map(fn($customer) => [
                'value' => $customer->id,
                'label' => $customer->name,
                'meta' => ['company' => $customer->company?->name],
            ]);
    }

    public function key(): string
    {
        return 'customers';
    }
}
