<?php

namespace App\Lookups;

use App\Contracts\LookupProvider;
use App\DTOs\LookupOption;
use App\Repositories\UserRepository;
use Illuminate\Support\Collection;

class UserLookup implements LookupProvider
{
    public function __construct(
        private UserRepository $repository
    ) {}

    public function handle(array $params = []): Collection
    {
        return $this->repository->selectOptions()
            ->map(fn($user) => new LookupOption(
                $user->id,
                $user->name
            ));
    }

    public function key(): string
    {
        return 'users';
    }
}
