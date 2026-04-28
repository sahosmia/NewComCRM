<?php

namespace App\Repositories;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Builder;

class CustomerRepository
{
    private function query(): Builder
    {
        return Customer::query()
            ->when(!auth()->user()?->isSuperAdmin(), function ($query) {
                $query->where('assigned_to', auth()->id());
            });
    }

    public function paginateForIndex(array $params): LengthAwarePaginator
    {
        return $this->query()
            ->with('assignedUser')
            ->when($params['search'] ?? null, fn($q, $s) => $this->applySearch($q, $s))
            ->when($params['status'] ?? null, fn($q, $v) => $q->where('status', $v))
            ->when($params['assigned_to'] ?? null, fn($q, $v) => $q->where('assigned_to', $v))
            ->when($params['type'] ?? null, fn($q, $v) => $q->where('type', $v))
            ->when($params['date'] ?? null, fn($q, $v) => $q->whereDate('created_at', $v))
            ->when($params['start_date'] ?? null, function ($q, $start) use ($params) {
                $q->whereBetween('created_at', [$start, $params['end_date'] ?? $start]);
            })
            ->latest($params['sort'] ?? 'created_at') // Simplified sorting
            ->paginate($params['per_page'] ?? 10)
            ->withQueryString();
    }

    private function applySearch(Builder $query, string $search): void
    {
        $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
                ->orWhere('company_name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('phones', 'like', "%{$search}%");
        });
    }

    public function selectOptions(): Collection
    {
        return $this->query()->select('id', 'name', 'company_id', 'company_name')->get();
    }

    public function create(array $data): Customer
    {
        return Customer::create($data);
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

    public function bulkDelete(array $ids): void
    {
        // Use the query() to ensure users can only bulk delete THEIR customers
        $this->query()->whereIn('id', $ids)->delete();
    }
}
