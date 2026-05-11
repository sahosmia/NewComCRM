<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Storage;

class ProfileService
{
    public function update(User $user, array $validated): void
    {
        if (isset($validated['signature']) && $validated['signature'] instanceof \Illuminate\Http\UploadedFile) {
            if ($user->signature) {
                Storage::disk('public')->delete($user->signature);
            }
            $validated['signature'] = $validated['signature']->store('signatures', 'public');
        }

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
