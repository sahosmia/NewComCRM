<?php

namespace App\Repositories;

use App\Models\FollowUp;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class FollowUpRepository
{
    public function paginateForIndex(array $params, User $user): LengthAwarePaginator
    {
        $perPage = $params['per_page'] ?? 10;

        return FollowUp::query()
            ->with(['customer', 'user'])
            ->when(! $user->isSuperAdmin(), fn ($query) => $query->where('user_id', $user->id))
            ->when($params['search'] ?? null, function ($query, $search) {
                $query->whereHas('customer', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
            })
            ->when($params['status'] ?? null, fn ($query, $status) => $query->where('status', $status))
            ->when($params['priority'] ?? null, fn ($query, $priority) => $query->where('priority', $priority))
            ->when($params['customer_id'] ?? null, fn ($query, $id) => $query->where('customer_id', $id))
            ->when(isset($params['sort']), function ($query) use ($params) {
                $query->orderBy($params['sort'], $params['direction'] ?? 'desc');
            }, function ($query) {
                $query->latest();
            })
            ->paginate($perPage)
            ->withQueryString($params);
    }

    /**
     * @return array{today: int, upcoming: int, overdue: int, completed: int}
     */
    public function indexStats(): array
    {
        return [
            'today' => FollowUp::query()->whereDate('follow_up_date', now())->count(),
            'upcoming' => FollowUp::query()->whereDate('follow_up_date', '>', now())->count(),
            'overdue' => FollowUp::query()->whereDate('follow_up_date', '<', now())->whereNull('completed_at')->count(),
            'completed' => FollowUp::query()->whereNotNull('completed_at')->count(),
        ];
    }

    public function create(array $data): FollowUp
    {
        return FollowUp::query()->create($data);
    }

    public function update(FollowUp $followUp, array $data): void
    {
        $followUp->update($data);
    }

    public function delete(FollowUp $followUp): void
    {
        $followUp->delete();
    }

    public function bulkDelete(array $ids): void
    {
        $user = auth()->user();
        $query = FollowUp::query()
            ->when(!$user->isSuperAdmin(), fn($q) => $q->where('user_id', $user->id));

        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }

        $query->delete();
    }

    public function getForExport(array $ids): \Illuminate\Database\Eloquent\Collection
    {
        $user = auth()->user();
        return FollowUp::query()
            ->with(['customer', 'user'])
            ->when(!$user->isSuperAdmin(), fn($q) => $q->where('user_id', $user->id))
            ->when(!empty($ids), fn($q) => $q->whereIn('id', $ids))
            ->get();
    }

    public function markComplete(FollowUp $followUp, string $status): void
    {
        $followUp->update([
            'completed_at' => now(),
            'status' => $status,
        ]);
    }
}
