<?php

namespace App\Repositories;

use App\Models\Quotation;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class QuotationRepository
{
    public function paginateForIndex(
        User $user,
        ?string $status,
        ?string $customerId,
        ?string $dateFrom,
        ?string $dateTo,
        string $sortField,
        string $sortDirection,
        int $perPage
    ): LengthAwarePaginator {
        return Quotation::query()
            ->with(['customer', 'user'])
            ->when(! $user->isSuperAdmin(), fn ($query) => $query->where('user_id', $user->id))
            ->when($status, fn ($query, $s) => $query->where('status', $s))
            ->when($customerId, fn ($query, $id) => $query->where('customer_id', $id))
            ->when($dateFrom, fn ($query, $d) => $query->whereDate('quotation_date', '>=', $d))
            ->when($dateTo, fn ($query, $d) => $query->whereDate('quotation_date', '<=', $d))
            ->orderBy($sortField, $sortDirection)
            ->paginate($perPage)
            ->withQueryString();
    }

    /**
     * @return array{draft: int, sent: int, accepted: int, total: float|int}
     */
    public function indexStats(): array
    {
        return [
            'draft' => Quotation::query()->draft()->count(),
            'sent' => Quotation::query()->sent()->count(),
            'accepted' => Quotation::query()->accepted()->count(),
            'total' => Quotation::query()->accepted()->sum('total'),
        ];
    }
}
