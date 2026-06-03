<?php

namespace App\Contracts;

use Illuminate\Support\Collection;

interface LookupProvider
{
    /**
     * @param array $params
     * @return Collection<\App\DTOs\LookupOption>
     */
    public function handle(array $params = []): Collection;

    /**
     * Unique key for the lookup (e.g., 'customers', 'active_requirements')
     */
    public function key(): string;
}
