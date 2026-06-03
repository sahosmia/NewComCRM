<?php

namespace App\Services;

use App\Contracts\LookupProvider;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class LookupRegistry
{
    /** @var array<string, LookupProvider> */
    protected array $providers = [];

    public function register(LookupProvider $provider): void
    {
        $this->providers[$provider->key()] = $provider;
    }

    /**
     * @param array<string|array> $keys
     * @return array<string, Collection>
     */
    public function get(array $keys): array
    {
        $results = [];

        foreach ($keys as $key => $params) {
            // Handle both ['customers', 'users'] and ['customers' => ['status' => 'active']]
            $actualKey = is_int($key) ? $params : $key;
            $actualParams = is_int($key) ? [] : $params;

            if (isset($this->providers[$actualKey])) {
                $results[$actualKey] = $this->providers[$actualKey]->handle($actualParams);
            }
        }

        return $results;
    }

    /**
     * Helper to get cached static lookups
     */
    public function getCached(string $key, int $ttl = 3600): Collection
    {
        return Cache::remember("lookup:{$key}", $ttl, function () use ($key) {
            return $this->providers[$key]->handle();
        });
    }
}
