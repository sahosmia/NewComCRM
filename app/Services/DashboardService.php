<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\FollowUp;
use App\Models\Meeting;
use App\Models\Sale;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    /**
     * @return array{stats: array, todayFollowups: \Illuminate\Database\Eloquent\Collection, upcomingFollowups: \Illuminate\Database\Eloquent\Collection, todayMeetings: \Illuminate\Database\Eloquent\Collection, upcomingMeetings: \Illuminate\Database\Eloquent\Collection, chartData: array}
     */
    public function dashboardData(User $user): array
    {
        return [
            'stats' => $user->isSuperAdmin()
                ? $this->superAdminStats()
                : $this->userStats($user->id),
            'todayFollowups' => $this->todayFollowups($user),
            'upcomingFollowups' => $this->upcomingFollowups($user),
            'todayMeetings' => $this->todayMeetings($user),
            'upcomingMeetings' => $this->upcomingMeetings($user),
            'chartData' => $this->chartData($user),
        ];
    }

    private function superAdminStats(): array
    {
        return [
            'todayCustomers' => Customer::query()->whereDate('created_at', today())->count(),
            'totalCustomers' => Customer::query()->count(),
            'todaySalesCount' => Sale::query()->whereHas('requirement', function($q) {
                $q->where('status', 'purchased');
            })->whereDate('sale_date', today())->count(),
            'todaySalesAmount' => Sale::query()->whereHas('requirement', function($q) {
                $q->where('status', 'purchased');
            })->whereDate('sale_date', today())->sum('amount'),
            'totalSalesCount' => Sale::query()->whereHas('requirement', function($q) {
                $q->where('status', 'purchased');
            })->count(),
            'totalSalesAmount' => Sale::query()->whereHas('requirement', function($q) {
                $q->where('status', 'purchased');
            })->sum('amount'),

            'todayFollowupsCount' => FollowUp::query()->today()->pending()->count(),
            'upcomingFollowupsCount' => FollowUp::query()->upcoming()->count(),
            'todayMeetingsCount' => Meeting::query()->today()->scheduled()->count(),
            'upcomingMeetingsCount' => Meeting::query()->whereDate('scheduled_at', '>', today())->scheduled()->count(),

            'todayFollowupsDone' => FollowUp::query()->whereDate('completed_at', today())->count(),
            'todayMeetingsDone' => Meeting::query()->where('status', 'completed')->whereDate('updated_at', today())->count(),
        ];
    }

    private function userStats(int $userId): array
    {
        $saleQuery = Sale::query()->whereHas('customer', function ($q) use ($userId) {
            $q->where('assigned_to', $userId);
        })->whereHas('requirement', function($q) {
            $q->where('status', 'purchased');
        });

        return [
            'todayCustomers' => Customer::query()->assignedTo($userId)->whereDate('created_at', today())->count(),
            'totalCustomers' => Customer::query()->assignedTo($userId)->count(),
            'todaySalesCount' => (clone $saleQuery)->whereDate('sale_date', today())->count(),
            'todaySalesAmount' => (clone $saleQuery)->whereDate('sale_date', today())->sum('amount'),
            'totalSalesCount' => (clone $saleQuery)->count(),
            'totalSalesAmount' => (clone $saleQuery)->sum('amount'),

            'todayFollowupsCount' => FollowUp::query()->byUser($userId)->today()->pending()->count(),
            'upcomingFollowupsCount' => FollowUp::query()->byUser($userId)->upcoming()->count(),
            'todayMeetingsCount' => Meeting::query()->byUser($userId)->today()->scheduled()->count(),
            'upcomingMeetingsCount' => Meeting::query()->byUser($userId)->whereDate('scheduled_at', '>', today())->scheduled()->count(),

            'todayFollowupsDone' => FollowUp::query()->byUser($userId)->whereDate('completed_at', today())->count(),
            'todayMeetingsDone' => Meeting::query()->byUser($userId)->where('status', 'completed')->whereDate('updated_at', today())->count(),
        ];
    }

    private function todayFollowups(User $user)
    {
        $query = FollowUp::query()
            ->with(['customer.company'])
            ->today()
            ->pending()
            ->orderBy('follow_up_date')
            ->limit(5);

        if (! $user->isSuperAdmin()) {
            $query->where('user_id', $user->id);
        }

        return $query->get();
    }

    private function upcomingFollowups(User $user)
    {
        $query = FollowUp::query()
            ->with(['customer.company'])
            ->whereDate('follow_up_date', '>', today())
            ->pending()
            ->orderBy('follow_up_date')
            ->limit(5);

        if (! $user->isSuperAdmin()) {
            $query->where('user_id', $user->id);
        }

        return $query->get();
    }

    private function todayMeetings(User $user)
    {
        $query = Meeting::query()
            ->with(['customer.company'])
            ->today()
            ->scheduled()
            ->orderBy('scheduled_at')
            ->limit(5);

        if (! $user->isSuperAdmin()) {
            $query->where('user_id', $user->id);
        }

        return $query->get();
    }

    private function upcomingMeetings(User $user)
    {
        $query = Meeting::query()
            ->with(['customer.company'])
            ->whereDate('scheduled_at', '>', today())
            ->scheduled()
            ->orderBy('scheduled_at')
            ->limit(5);

        if (! $user->isSuperAdmin()) {
            $query->where('user_id', $user->id);
        }

        return $query->get();
    }

    private function chartData(User $user): array
    {
        return collect(range(5, 0))->map(function ($i) use ($user) {
            $date = now()->subMonths($i);

            // Followups Count
            $followupQuery = FollowUp::query()
                ->whereMonth('created_at', $date->month)
                ->whereYear('created_at', $date->year);

            if (!$user->isSuperAdmin()) {
                $followupQuery->where('user_id', $user->id);
            }

            return [
                'name' => $date->format('M'),
                'followups' => $followupQuery->count(),
            ];
        })->toArray();
    }
}
