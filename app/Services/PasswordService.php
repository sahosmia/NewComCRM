<?php

namespace App\Services;

use App\Models\User;

class PasswordService
{
    public function updatePassword(User $user, string $password): void
    {
        $user->update([
            'password' => $password,
        ]);
    }
}
