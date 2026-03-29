<?php

namespace App\Repositories;

use App\Models\FollowUp;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class FollowUpRepository
{
    public function paginateForIndex(
        User $user,
        ?string $status,
        ?string $type,
        ?string $customerId,
        string $sortField,
        string $sortDirection,
        int $perPage
    ): LengthAwarePaginator {
        return FollowUp::query()
            ->with(['customer', 'user'])
            ->when(! $user->isSuperAdmin(), fn ($query) => $query->where('user_id', $user->id))
            ->when($status, fn ($query, $s) => $query->where('status', $s))
            ->when($type, function ($query) use ($type) {
                return match ($type) {
                    'today' => $query->today(),
                    'upcoming' => $query->upcoming(),
                    'overdue' => $query->overdue(),
                    default => $query,
                };
            })
            ->when($customerId, fn ($query, $id) => $query->where('customer_id', $id))
            ->orderBy($sortField, $sortDirection)
            ->paginate($perPage)
            ->withQueryString();
    }

    /**
     * @return array{today: int, upcoming: int, overdue: int, completed: int}
     */
    public function indexStats(): array
    {
        return [
            'today' => FollowUp::query()->today()->count(),
            'upcoming' => FollowUp::query()->upcoming()->count(),
            'overdue' => FollowUp::query()->overdue()->count(),
            'completed' => FollowUp::query()->completed()->count(),
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

    public function markComplete(FollowUp $followUp, string $status): void
    {
        $followUp->update([
            'completed_at' => now(),
            'status' => $status,
        ]);
    }
}
