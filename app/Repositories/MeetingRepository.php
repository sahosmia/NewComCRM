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
            ->when($params['sort'] ?? null, function ($query, $sort) use ($params) {
                $allowedSorts = ['title', 'scheduled_at', 'meeting_type', 'status', 'created_at'];
                if (in_array($sort, $allowedSorts)) {
                    $query->orderBy($sort, $params['direction'] ?? 'desc');
                }
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

    public function bulkDelete(array $ids): void
    {
        $user = auth()->user();
        $query = Meeting::query()
            ->when(!$user->isSuperAdmin(), fn($q) => $q->where('user_id', $user->id));

        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }

        $query->delete();
    }

    public function getForExport(array $ids): \Illuminate\Database\Eloquent\Collection
    {
        $user = auth()->user();
        return Meeting::query()
            ->with(['customer', 'user'])
            ->when(!$user->isSuperAdmin(), fn($q) => $q->where('user_id', $user->id))
            ->when(!empty($ids), fn($q) => $q->whereIn('id', $ids))
            ->get();
    }
}
