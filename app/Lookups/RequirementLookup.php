<?php

namespace App\Lookups;

use App\Contracts\LookupProvider;
use App\DTOs\LookupOption;
use App\Services\RequirementService;
use Illuminate\Support\Collection;

class RequirementLookup implements LookupProvider
{
    public function __construct(
        private RequirementService $service
    ) {}

    public function handle(array $params = []): Collection
    {
        return $this->service->selectOptions()
            ->map(fn($req) => new LookupOption(
                $req->id,
                $req->title ?? "Requirement #{$req->id}",
                ['customer_id' => $req->customer_id]
            ));
    }

    public function key(): string
    {
        return 'requirements';
    }
}
