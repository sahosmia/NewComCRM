<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;

class AssignedDataScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        // 1. Super admin hole kono restriction thakbe na
        if (!Auth::check() || Auth::user()->isSuperAdmin()) {
            return;
        }

        $userId = Auth::id();
        $currentScope = static::class;

        // 2. Model onusare complete bidirectional condition apply
        if ($model instanceof \App\Models\Customer) {
            $builder->where(function ($query) use ($userId, $currentScope) {
                $query->where('assigned_to', $userId)
                    ->orWhereHas('requirements', fn($q) => $q->withoutGlobalScope($currentScope)->where('user_id', $userId))
                    ->orWhereHas('quotationRequirements', fn($q) => $q->withoutGlobalScope($currentScope)->where('user_id', $userId))
                    ->orWhereHas('meetings', fn($q) => $q->withoutGlobalScope($currentScope)->where('user_id', $userId))
                    ->orWhereHas('followUps', fn($q) => $q->withoutGlobalScope($currentScope)->where('user_id', $userId));
            });
        }

        elseif ($model instanceof \App\Models\Requirement) {
            $builder->where(function ($query) use ($userId, $currentScope) {
                $query->where('user_id', $userId)
                    ->orWhereHas('customer', fn($q) => $q->withoutGlobalScope($currentScope)->where('assigned_to', $userId))
                    ->orWhereHas('quotationRecipient', fn($q) => $q->withoutGlobalScope($currentScope)->where('assigned_to', $userId))
                    ->orWhereHas('meetings', fn($q) => $q->withoutGlobalScope($currentScope)->where('user_id', $userId))
                    ->orWhereHas('followUps', fn($q) => $q->withoutGlobalScope($currentScope)->where('user_id', $userId));
            });
        }

        elseif ($model instanceof \App\Models\Meeting) {
            $builder->where(function ($query) use ($userId, $currentScope) {
                $query->where('user_id', $userId)
                    ->orWhereHas('customer', fn($q) => $q->withoutGlobalScope($currentScope)->where('assigned_to', $userId))
                    ->orWhereHas('requirement', fn($q) => $q->withoutGlobalScope($currentScope)->where('user_id', $userId))
                    // jodi eirokom hoy j eita jekono vabe ei user er sathe linked followUp er shathei connected
                    ->orWhereHas('requirement.followUps', fn($q) => $q->withoutGlobalScope($currentScope)->where('user_id', $userId));
            });
        }

        elseif ($model instanceof \App\Models\FollowUp) {
            $builder->where(function ($query) use ($userId, $currentScope) {
                $query->where('user_id', $userId)
                    ->orWhereHas('customer', fn($q) => $q->withoutGlobalScope($currentScope)->where('assigned_to', $userId))
                    ->orWhereHas('requirement', fn($q) => $q->withoutGlobalScope($currentScope)->where('user_id', $userId))
                    ->orWhereHas('requirement.meetings', fn($q) => $q->withoutGlobalScope($currentScope)->where('user_id', $userId));
            });
        }

        elseif ($model instanceof \App\Models\Sale) {
            $builder->where(function ($query) use ($userId, $currentScope) {
                // sales table e user_id direct na thakle tar parent relation check korbe
                $query->whereHas('requirement', fn($q) => $q->withoutGlobalScope($currentScope)->where('user_id', $userId))
                    ->orWhereHas('customer', fn($q) => $q->withoutGlobalScope($currentScope)->where('assigned_to', $userId))
                    ->orWhereHas('requirement.meetings', fn($q) => $q->withoutGlobalScope($currentScope)->where('user_id', $userId))
                    ->orWhereHas('requirement.followUps', fn($q) => $q->withoutGlobalScope($currentScope)->where('user_id', $userId));
            });
        }
    }
}
