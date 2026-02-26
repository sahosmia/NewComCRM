<?php
namespace App\Policies;

use App\Models\User;
use App\Models\Customer;

class CustomerPolicy
{
    // public function viewAny(User $user)
    // {
    //     return true;
    // }

    // public function view(User $user, Customer $customer)
    // {
    //     return $user->isSuperAdmin() || $user->id === $customer->assigned_to;
    // }

    // public function create(User $user)
    // {
    //     return true;
    // }

    // public function update(User $user, Customer $customer)
    // {
    //     return $user->isSuperAdmin() || $user->id === $customer->assigned_to;
    // }

    // public function delete(User $user, Customer $customer)
    // {
    //     return $user->isSuperAdmin() || $user->id === $customer->assigned_to;
    // }
}
