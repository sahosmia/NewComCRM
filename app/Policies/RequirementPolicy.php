<?php

namespace App\Policies;

use App\Models\Requirement;
use App\Models\User;

class RequirementPolicy
{

    public function before(User $user, string $ability): ?bool
    {
        if ($user->isSuperAdmin()) {
            return true;
        }

        return null;
    }

    public function viewAny(User $user): bool
    {
        return true;
    }

      public function view(User $user, Requirement $requirement): bool
    {
        return (int) $user->id === (int) $requirement->user_id
            || (int) $user->id === (int) $requirement->customer?->assigned_to
            || $requirement->customer->meetings()->where('user_id', $user->id)->exists()
            || $requirement->customer->followUps()->where('user_id', $user->id)->exists()
            || $requirement->customer->requirements()->where('user_id', $user->id)->exists();
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Requirement $requirement): bool
    {
        return (int) $user->id === (int) $requirement->user_id;
    }

    public function delete(User $user, Requirement $requirement): bool
    {
        return (int) $user->id === (int) $requirement->user_id;
    }
}
