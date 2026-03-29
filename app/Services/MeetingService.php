<?php

namespace App\Services;

use App\Models\Meeting;
use App\Repositories\CustomerRepository;
use App\Repositories\MeetingRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class MeetingService
{
    public function __construct(
        private MeetingRepository $meetings,
        private CustomerRepository $customers,
    ) {}

    public function paginateIndex(int $perPage = 10): LengthAwarePaginator
    {
        return $this->meetings->paginateIndex($perPage);
    }

    public function customersForForm(): Collection
    {
        return $this->customers->selectOptions();
    }

    public function create(array $validated, int $userId): Meeting
    {
        return $this->meetings->create(array_merge($validated, [
            'user_id' => $userId,
        ]));
    }

    public function update(Meeting $meeting, array $validated): void
    {
        $this->meetings->update($meeting, $validated);
    }

    public function delete(Meeting $meeting): void
    {
        $this->meetings->delete($meeting);
    }
}
