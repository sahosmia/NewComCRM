<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\FollowUp;
use App\Models\Meeting;
use App\Models\Sale;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class ReportService
{
    public function getReportData(array $params)
    {
        $user = Auth::user();
        $dateRange = $this->resolveDateRange($params);
        $userId = $user->isSuperAdmin() ? ($params['user_id'] ?? null) : $user->id;
        $customerId = $params['customer_id'] ?? null;

        return [
            'stats' => $this->getStats($dateRange, $userId, $customerId),
            'followUps' => $this->getFollowUps($dateRange, $userId, $customerId),
            'meetings' => $this->getMeetings($dateRange, $userId, $customerId),
            'sales' => $this->getSales($dateRange, $userId, $customerId),
            'customers' => $this->getCustomers($dateRange, $userId),
            'filters' => [
                'users' => $user->isSuperAdmin() ? User::select('id', 'name')->get() : [],
                'customers' => Customer::select('id', 'name')->get(),
            ],
        ];
    }

    private function resolveDateRange(array $params): array
    {
        $start = null;
        $end = Carbon::now();

        if (isset($params['start_date']) && isset($params['end_date'])) {
            $start = Carbon::parse($params['start_date'])->startOfDay();
            $end = Carbon::parse($params['end_date'])->endOfDay();
        } elseif (isset($params['period'])) {
            switch ($params['period']) {
                case 'day':
                    $start = Carbon::now()->startOfDay();
                    break;
                case 'week':
                    $start = Carbon::now()->startOfWeek();
                    break;
                case 'month':
                    $start = Carbon::now()->startOfMonth();
                    break;
                case 'year':
                    $start = Carbon::now()->startOfYear();
                    break;
            }
        }

        return ['start' => $start, 'end' => $end];
    }

    private function applyFilters(Builder $query, array $dateRange, $userId, $customerId = null, string $dateColumn = 'created_at')
    {
        if ($dateRange['start']) {
            $query->whereBetween($dateColumn, [$dateRange['start'], $dateRange['end']]);
        }

        if ($userId) {
            $assignedColumn = $this->getAssignedColumn($query->getModel());
            if ($assignedColumn) {
                $query->where($assignedColumn, $userId);
            }
        }

        if ($customerId && !($query->getModel() instanceof Customer)) {
            $query->where('customer_id', $customerId);
        }

        return $query;
    }

    private function getAssignedColumn($model): ?string
    {
        return match (get_class($model)) {
            Customer::class => 'assigned_to',
            Meeting::class, FollowUp::class => 'user_id',
            Sale::class => null, // Sales are linked via customers
            default => null,
        };
    }

    private function getStats(array $dateRange, $userId, $customerId): array
    {
        $salesQuery = Sale::query();
        if ($customerId) {
            $salesQuery->where('customer_id', $customerId);
        }
        if ($userId) {
            $salesQuery->whereHas('customer', fn($q) => $q->where('assigned_to', $userId));
        }
        if ($dateRange['start']) {
            $salesQuery->whereBetween('sale_date', [$dateRange['start'], $dateRange['end']]);
        }

        return [
            'total_sales_amount' => $salesQuery->sum('amount'),
            'total_sales_count' => $salesQuery->count(),
            'total_meetings' => $this->applyFilters(Meeting::query(), $dateRange, $userId, $customerId, 'scheduled_at')->count(),
            'total_follow_ups' => $this->applyFilters(FollowUp::query(), $dateRange, $userId, $customerId, 'follow_up_date')->count(),
            'new_customers' => $this->applyFilters(Customer::query(), $dateRange, $userId, null, 'created_at')->count(),
        ];
    }

    private function getFollowUps(array $dateRange, $userId, $customerId)
    {
        return $this->applyFilters(FollowUp::with(['customer', 'user']), $dateRange, $userId, $customerId, 'follow_up_date')
            ->latest('follow_up_date')
            ->get();
    }

    private function getMeetings(array $dateRange, $userId, $customerId)
    {
        return $this->applyFilters(Meeting::with(['customer', 'user']), $dateRange, $userId, $customerId, 'scheduled_at')
            ->latest('scheduled_at')
            ->get();
    }

    private function getSales(array $dateRange, $userId, $customerId)
    {
        $query = Sale::with(['customer.assignedUser', 'requirement']);
        if ($customerId) {
            $query->where('customer_id', $customerId);
        }
        if ($userId) {
            $query->whereHas('customer', fn($q) => $q->where('assigned_to', $userId));
        }
        if ($dateRange['start']) {
            $query->whereBetween('sale_date', [$dateRange['start'], $dateRange['end']]);
        }
        return $query->latest('sale_date')->get();
    }

    private function getCustomers(array $dateRange, $userId)
    {
        return $this->applyFilters(Customer::with(['assignedUser', 'company']), $dateRange, $userId, null, 'created_at')
            ->latest()
            ->get();
    }
}
