<?php

namespace App\Services;

use App\Models\User;

class ProfileService
{
    public function update(User $user, array $validated): void
    {
        $user->fill($validated);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();
    }

    public function delete(User $user): void
    {
        $user->delete();
    }
}
