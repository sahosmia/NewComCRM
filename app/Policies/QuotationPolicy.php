<?php

namespace App\Policies;

use App\Models\Quotation;
use App\Models\User;

class QuotationPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Quotation $quotation): bool
    {
        return $user->isSuperAdmin() || $quotation->user_id === $user->id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Quotation $quotation): bool
    {
        return $user->isSuperAdmin() || $quotation->user_id === $user->id;
    }

    public function delete(User $user, Quotation $quotation): bool
    {
        return $user->isSuperAdmin() || $quotation->user_id === $user->id;
    }
}
