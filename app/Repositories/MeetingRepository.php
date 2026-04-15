<?php

namespace App\Repositories;

use App\Models\Meeting;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class MeetingRepository
{
    public function paginateForIndex(array $params): LengthAwarePaginator
    {
        $perPage = $params['per_page'] ?? 10;

        return Meeting::query()
            ->with(['customer', 'user'])
            ->when($params['search'] ?? null, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhereHas('customer', function ($q) use ($search) {
                            $q->where('name', 'like', "%{$search}%");
                        })
                        ->orWhereHas('user', function ($q) use ($search) {
                            $q->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->when($params['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($params['meeting_type'] ?? null, function ($query, $type) {
                $query->where('meeting_type', $type);
            })
            ->when(isset($params['sort']), function ($query) use ($params) {
                $query->orderBy($params['sort'], $params['direction'] ?? 'desc');
            }, function ($query) {
                $query->latest();
            })
            ->paginate($perPage)
            ->withQueryString($params);
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
