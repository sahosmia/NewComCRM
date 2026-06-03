<?php

namespace App\Providers;

use App\Services\LookupRegistry;
use App\Lookups\CustomerLookup;
use App\Lookups\RequirementLookup;
use App\Lookups\UserLookup;
use App\Lookups\CompanyLookup;
use Illuminate\Support\ServiceProvider;

class LookupServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(LookupRegistry::class, function ($app) {
            $registry = new LookupRegistry();

            // Registration will happen here after concrete classes are created
            // We use the container to resolve dependencies for each provider

            return $registry;
        });
    }

    public function boot(): void
    {
        $registry = $this->app->make(LookupRegistry::class);

        $registry->register($this->app->make(CustomerLookup::class));
        $registry->register($this->app->make(RequirementLookup::class));
        $registry->register($this->app->make(UserLookup::class));
        $registry->register($this->app->make(CompanyLookup::class));
    }
}
