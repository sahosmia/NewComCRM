<?php

namespace App\Lookups;

use App\Contracts\LookupProvider;
use App\Services\CompanyService;
use Illuminate\Support\Collection;

class CompanyLookup implements LookupProvider
{
    public function __construct(
        private CompanyService $service
    ) {}

    public function handle(array $params = []): Collection
    {
        return $this->service->listAll()
            ->map(fn($company) => [
                'value' => $company->id,
                'label' => $company->name,
            ]);
    }

    public function key(): string
    {
        return 'companies';
    }
}
