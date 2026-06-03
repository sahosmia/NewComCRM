<?php

namespace App\Lookups;

use App\Contracts\LookupProvider;
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
            ->map(fn($req) => [
                'value' => $req->id,
                'label' => $req->title ?? "Requirement #{$req->id}",
                'meta' => ['customer_id' => $req->customer_id],
            ]);
    }

    public function key(): string
    {
        return 'requirements';
    }
}
