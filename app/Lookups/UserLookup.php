<?php

namespace App\Lookups;

use App\Contracts\LookupProvider;
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
            ->map(fn($user) => [
                'value' => $user->id,
                'label' => $user->name,
            ]);
    }

    public function key(): string
    {
        return 'users';
    }
}
