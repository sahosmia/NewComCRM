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
            $column = $this->getAssignedColumn($model);
            if ($column) {
                if ($model instanceof \App\Models\Sale) {
                    $builder->whereHas('customer');
                } else {
                    $builder->where($column, Auth::id());
                }
            }
        }
    }

    protected function getAssignedColumn(Model $model): ?string
    {
        return match (get_class($model)) {
            \App\Models\Customer::class => 'assigned_to',
            \App\Models\Meeting::class, \App\Models\FollowUp::class, \App\Models\Quotation::class, \App\Models\Requirement::class => 'user_id',
            \App\Models\Sale::class => 'customer_id',
            default => null,
        };
    }
}
