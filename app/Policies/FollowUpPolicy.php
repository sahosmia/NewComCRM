<?php

namespace App\Policies;

use App\Models\FollowUp;
use App\Models\User;

class FollowUpPolicy
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


  public function view(User $user, FollowUp $followUp): bool
    {
        return $user->id === $followUp->user_id
            || $user->id === $followUp->customer?->assigned_to
            || $followUp->customer->meetings()->where('user_id', $user->id)->exists()
            || $followUp->customer->followUps()->where('user_id', $user->id)->exists()
            || $followUp->customer->requirements()->where('user_id', $user->id)->exists();
    }


    public function create(User $user): bool
    {
        return true;
    }


    public function update(User $user, FollowUp $followUp): bool
    {
        return $user->id === $followUp->user_id;
    }


    public function delete(User $user, FollowUp $followUp): bool
    {
        return $user->id === $followUp->user_id;
    }
}
