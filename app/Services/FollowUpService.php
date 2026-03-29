<?php

namespace App\Services;

use App\Models\FollowUp;
use App\Models\User;
use App\Repositories\CustomerRepository;
use App\Repositories\FollowUpRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class FollowUpService
{
    public function __construct(
        private FollowUpRepository $followUps,
        private CustomerRepository $customers,
    ) {}

    /**
     * @return array{followUps: \Illuminate\Contracts\Pagination\LengthAwarePaginator, filters: array, stats: array}
     */
    public function indexData(User $user, Request $request): array
    {
        return [
            'followUps' => $this->followUps->paginateForIndex(
                $user,
                $request->status,
                $request->type,
                $request->customer_id,
                $request->sort_field ?? 'follow_up_date',
                $request->sort_direction ?? 'asc',
                (int) ($request->per_page ?? 10)
            ),
            'filters' => $request->only(['status', 'type', 'customer_id']),
            'stats' => $this->followUps->indexStats(),
        ];
    }

    public function create(array $validated, int $userId): FollowUp
    {
        return $this->followUps->create(array_merge($validated, [
            'user_id' => $userId,
        ]));
    }

    public function update(FollowUp $followUp, array $validated): void
    {
        $this->followUps->update($followUp, $validated);
    }

    public function delete(FollowUp $followUp): void
    {
        $this->followUps->delete($followUp);
    }

    public function complete(FollowUp $followUp, string $status): void
    {
        $this->followUps->markComplete($followUp, $status);
    }

    public function customersForForm(): Collection
    {
        return $this->customers->selectOptions();
    }
}
