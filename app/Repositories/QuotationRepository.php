<?php

namespace App\Repositories;

use App\Models\Quotation;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class QuotationRepository
{
    public function paginateForIndex(array $params, User $user): LengthAwarePaginator
    {
        $perPage = $params['per_page'] ?? 10;

        return Quotation::query()
            ->with(['customer', 'user'])
            ->when(! $user->isSuperAdmin(), fn ($query) => $query->where('user_id', $user->id))
            ->when($params['search'] ?? null, function ($query, $search) {
                $query->where('quotation_number', 'like', "%{$search}%")
                    ->orWhereHas('customer', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            })
            ->when($params['status'] ?? null, fn ($query, $status) => $query->where('status', $status))
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
     * @return array{draft: int, sent: int, accepted: int, total: float|int}
     */
    public function indexStats(): array
    {
        return [
            'draft' => Quotation::query()->where('status', 'draft')->count(),
            'sent' => Quotation::query()->where('status', 'sent')->count(),
            'accepted' => Quotation::query()->where('status', 'accepted')->count(),
            'total' => Quotation::query()->where('status', 'accepted')->sum('total'),
        ];
    }

    public function create(array $data): Quotation
    {
        return Quotation::query()->create($data);
    }

    public function update(Quotation $quotation, array $data): void
    {
        $quotation->update($data);
    }

    public function delete(Quotation $quotation): void
    {
        $quotation->delete();
    }
}
