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
        return $user->id === $requirement->customer->assigned_to;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Requirement $requirement): bool
    {
        return $user->id === $requirement->customer->assigned_to;
    }

    public function delete(User $user, Requirement $requirement): bool
    {
        return $user->id === $requirement->customer->assigned_to;
    }
}
