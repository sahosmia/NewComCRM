<?php

namespace App\Repositories;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class CustomerRepository
{
    public function selectOptions(): Collection
    {
        return Customer::query()
            ->select('id', 'name')
            ->get();
    }

    public function paginateForIndex(array $params): LengthAwarePaginator
    {
        $perPage = $params['per_page'] ?? 10;

        return Customer::query()
            ->with('assignedUser')
            ->when($params['search'] ?? null, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('company_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phones', 'like', "%{$search}%");
                });
            })
            ->when($params['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($params['assigned_to'] ?? null, function ($query, $assigned_to) {
                $query->where('assigned_to', $assigned_to);
            })
            ->when($params['type'] ?? null, function ($query, $type) {
                $query->where('type', $type);
            })
            ->when($params['date'] ?? null, function ($query, $date) {
                $query->whereDate('created_at', $date);
            })
            ->when($params['start_date'] ?? null, function ($query, $startDate) use ($params) {
                $query->whereBetween('created_at', [
                    $startDate,
                    ($params['end_date'] ?? $startDate)
                ]);
            })
            // ------------------------------------
            ->when(isset($params['sort']), function ($query) use ($params) {
                $query->orderBy($params['sort'], $params['direction'] ?? 'desc');
            }, function ($query) {
                $query->latest();
            })
            ->paginate($perPage)
            ->withQueryString($params);
    }

    public function create(array $data): Customer
    {

        return Customer::query()->create($data);
    }

    public function update(Customer $customer, array $data): void
    {
        $customer->update($data);
    }

    public function delete(Customer $customer): void
    {
        $customer->delete();
    }

    public function forRequirementForm(): Collection
    {
        return Customer::query()
            ->select('id', 'name', 'company_name')
            ->get();
    }

    public function activeForQuotation(User $user): Collection
    {
        return Customer::query()
            ->active()
            ->when(! $user->isSuperAdmin(), fn($query) => $query->where('assigned_to', $user->id))
            ->get();
    }

    public function findWithRequirementsForQuotation(?int $customerId): ?Customer
    {
        if (! $customerId) {
            return null;
        }

        return Customer::query()
            ->with('requirements.product')
            ->find($customerId);
    }
}
