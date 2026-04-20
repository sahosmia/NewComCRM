<?php

namespace App\Policies;

use App\Models\Meeting;
use App\Models\User;

class MeetingPolicy
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


    public function view(User $user, Meeting $meeting): bool
    {
        return $user->id === $meeting->user_id;
    }


    public function create(User $user): bool
    {
        return true;
    }


    public function update(User $user, Meeting $meeting): bool
    {
        return $user->id === $meeting->user_id;
    }


    public function delete(User $user, Meeting $meeting): bool
    {
        return $user->id === $meeting->user_id;
    }


}
