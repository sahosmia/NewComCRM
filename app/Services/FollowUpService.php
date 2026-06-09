<?php

namespace App\Services;

use App\Models\FollowUp;
use App\Models\User;
use App\Repositories\FollowUpRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class FollowUpService
{
    public function __construct(
        private FollowUpRepository $followUps,
    ) {
    }

    public function paginateIndex(array $filters, User $user): LengthAwarePaginator
    {
        return $this->followUps->paginateForIndex($filters, $user);
    }

    public function indexStats(): array
    {
        return $this->followUps->indexStats();
    }

    public function create(array $validated): FollowUp
    {
        return $this->followUps->create($validated);
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

    public function complete(FollowUp $followUp, string $status): void
    {
        $this->followUps->complete($followUp, $status);
    }

    public function getForExport(array $ids): Collection
    {
        return $this->followUps->getForExport($ids);
    }
}
