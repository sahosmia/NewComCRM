<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UserRepository
{
    public function selectOptions(): Collection
    {
        return User::query()
            ->select('id', 'name')
            ->get();
    }
}
