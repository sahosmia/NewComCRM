<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Customer;
use Illuminate\Auth\Access\HandlesAuthorization;

class CustomerPolicy
{
    use HandlesAuthorization;


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

    public function view(User $user, Customer $customer): bool
    {
        // return $user->id === $customer->assigned_to;
        return $user->id === $customer->assigned_to
            || $customer->followUps()->where('user_id', $user->id)->exists()
            || $customer->meetings()->where('user_id', $user->id)->exists()
            || $customer->requirements()->where('user_id', $user->id)->exists();
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Customer $customer): bool
    {
        return $this->view($user, $customer);
    }

    public function delete(User $user, Customer $customer): bool
    {
        return $user->id === $customer->assigned_to;
    }
}
