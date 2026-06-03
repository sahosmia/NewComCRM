<?php

namespace App\Lookups;

use App\Contracts\LookupProvider;
use App\DTOs\LookupOption;
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
            ->map(fn($company) => new LookupOption(
                $company->id,
                $company->name
            ));
    }

    public function key(): string
    {
        return 'companies';
    }
}
