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
        if (Auth::check() && !Auth::user()->isSuperAdmin()) {
            if ($model instanceof \App\Models\Customer) {
                $builder->where(function ($query) {
                    $query->where('assigned_to', Auth::id())
                        ->orWhereHas('followUps', fn($q) => $q->where('user_id', Auth::id()))
                        ->orWhereHas('meetings', fn($q) => $q->where('user_id', Auth::id()))
                        ->orWhereHas('requirements', fn($q) => $q->where('user_id', Auth::id()));
                });
            } elseif ($model instanceof \App\Models\Requirement) {
                $builder->where(function ($query) {
                    $query->where('user_id', Auth::id())
                        ->orWhereHas('customer', fn($q) => $q->where('assigned_to', Auth::id()))
                        ->orWhereHas('meetings', fn($q) => $q->where('user_id', Auth::id()))
                        ->orWhereHas('followUps', fn($q) => $q->where('user_id', Auth::id()));
                });
            } elseif ($model instanceof \App\Models\Meeting || $model instanceof \App\Models\FollowUp) {
                $builder->where(function ($query) {
                    $query->where('user_id', Auth::id())
                        ->orWhereHas('customer', fn($q) => $q->where('assigned_to', Auth::id()))
                        ->orWhereHas('requirement', fn($q) => $q->where('user_id', Auth::id()));
                });
            } elseif ($model instanceof \App\Models\Sale) {
                $builder->where(function ($query) {
                    $query->whereHas('customer', fn($q) => $q->where('assigned_to', Auth::id()))
                        ->orWhereHas('requirement', fn($q) => $q->where('user_id', Auth::id()));
                });
            } else {
                $column = $this->getAssignedColumn($model);
                if ($column) {
                    $builder->where($column, Auth::id());
                }
            }
        }
    }

    protected function getAssignedColumn(Model $model): ?string
    {
        return match (get_class($model)) {
            \App\Models\Meeting::class,
            \App\Models\FollowUp::class,
            \App\Models\Requirement::class => 'user_id',

            default => null,
        };
    }
}
