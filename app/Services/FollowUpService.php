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

    public function paginateIndex(array $filters, User $user)
    {
        return $this->followUps->paginateForIndex($filters, $user);
    }

    public function stats(): array
    {
        return $this->followUps->indexStats();
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

    public function bulkDelete(array $ids): void
    {
        $this->followUps->bulkDelete($ids);
    }

    public function getForExport(array $ids): \Illuminate\Support\Collection
    {
        return $this->followUps->getForExport($ids);
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
