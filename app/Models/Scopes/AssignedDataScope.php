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
            $userId = Auth::id();
            $customerColumn = $model instanceof \App\Models\Customer ? 'id' : 'customer_id';

            // All related entities (Requirement, Meeting, FollowUp, Sale) have a customer_id.
            // We scope visibility based on the entire "Customer Chain".
            // A user sees everything in the chain if they are assigned to the Customer
            // OR any Requirement, Meeting, or FollowUp linked to that Customer.
            $builder->whereIn($customerColumn, function ($query) use ($userId) {
                $query->select('id')
                    ->from('customers')
                    ->where('assigned_to', $userId)
                    ->union(
                        \Illuminate\Support\Facades\DB::table('requirements')
                            ->select('customer_id')
                            ->where('user_id', $userId)
                    )
                    ->union(
                        \Illuminate\Support\Facades\DB::table('meetings')
                            ->select('customer_id')
                            ->where('user_id', $userId)
                    )
                    ->union(
                        \Illuminate\Support\Facades\DB::table('follow_ups')
                            ->select('customer_id')
                            ->where('user_id', $userId)
                    );
            });
        }
    }
}
