<?php

namespace App\Contracts;

use Illuminate\Support\Collection;

interface LookupProvider
{
    /**
     * @param array $params
     * @return Collection<array{value: string|int, label: string, meta?: array}>
     */
    public function handle(array $params = []): Collection;

    /**
     * Unique key for the lookup (e.g., 'customers', 'active_requirements')
     */
    public function key(): string;
}
