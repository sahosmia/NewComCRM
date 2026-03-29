<?php

namespace App\Repositories;

use App\Models\Meeting;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class MeetingRepository
{
    public function paginateIndex(int $perPage = 10): LengthAwarePaginator
    {
        return Meeting::query()
            ->with(['customer', 'user'])
            ->latest()
            ->paginate($perPage);
    }

    public function create(array $data): Meeting
    {
        return Meeting::query()->create($data);
    }

    public function update(Meeting $meeting, array $data): void
    {
        $meeting->update($data);
    }

    public function delete(Meeting $meeting): void
    {
        $meeting->delete();
    }
}
