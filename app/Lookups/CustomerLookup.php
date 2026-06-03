<?php

namespace App\Lookups;

use App\Contracts\LookupProvider;
use App\DTOs\LookupOption;
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
            ->map(fn($customer) => new LookupOption(
                $customer->id,
                $customer->name,
                ['company' => $customer->company?->name]
            ));
    }

    public function key(): string
    {
        return 'customers';
    }
}
