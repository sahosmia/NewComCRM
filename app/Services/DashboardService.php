<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\FollowUp;
use App\Models\Meeting;
use App\Models\Quotation;
use App\Models\User;

class DashboardService
{
    /**
     * @return array{stats: array, todayFollowups: \Illuminate\Database\Eloquent\Collection, upcomingMeetings: \Illuminate\Database\Eloquent\Collection, chartData: array}
     */
    public function dashboardData(User $user): array
    {
        return [
            'stats' => $user->isSuperAdmin()
                ? $this->superAdminStats()
                : $this->userStats($user->id),
            'todayFollowups' => $this->todayFollowups($user),
            'upcomingMeetings' => $this->upcomingMeetings($user),
            'chartData' => $this->chartData($user),
        ];
    }

    private function superAdminStats(): array
    {
        return [
            'totalCustomers' => Customer::query()->count(),
            'totalUsers' => User::query()->where('role', 'user')->count(),
            'todayFollowups' => FollowUp::query()->today()->count(),
            'overdueFollowups' => FollowUp::query()->overdue()->count(),
            'upcomingMeetings' => Meeting::query()->upcoming()->count(),
            'monthlyQuotations' => Quotation::query()->whereMonth('created_at', now()->month)->count(),
            'totalRevenue' => Quotation::query()->accepted()->sum('total'),
            'pendingFollowups' => FollowUp::query()->pending()->count(),
        ];
    }

    private function userStats(int $userId): array
    {
        return [
            'totalCustomers' => Customer::query()->assignedTo($userId)->count(),
            'todayFollowups' => FollowUp::query()->byUser($userId)->today()->count(),
            'overdueFollowups' => FollowUp::query()->byUser($userId)->overdue()->count(),
            'upcomingMeetings' => Meeting::query()->byUser($userId)->upcoming()->count(),
            'pendingFollowups' => FollowUp::query()->byUser($userId)->pending()->count(),
            'monthlyQuotations' => Quotation::query()
                ->where('user_id', $userId)
                ->whereMonth('created_at', now()->month)
                ->count(),
        ];
    }

    private function todayFollowups(User $user)
    {
        $query = FollowUp::query()
            ->with('customer')
            ->today()
            ->pending()
            ->orderBy('follow_up_date');

        if (! $user->isSuperAdmin()) {
            $query->where('user_id', $user->id);
        }

        return $query->get();
    }

    private function upcomingMeetings(User $user)
    {
        $query = Meeting::query()
            ->with('customer')
            ->upcoming()
            ->orderBy('start_time')
            ->limit(5);

        if (! $user->isSuperAdmin()) {
            $query->where('user_id', $user->id);
        }

        return $query->get();
    }

    private function chartData(User $user): array
    {
        $months = collect(range(5, 0))->map(fn ($i) => now()->subMonths($i)->format('M'));

        $followups = collect(range(5, 0))->map(function ($i) use ($user) {
            $date = now()->subMonths($i);
            $query = FollowUp::query()
                ->whereMonth('created_at', $date->month)
                ->whereYear('created_at', $date->year);

            if (! $user->isSuperAdmin()) {
                $query->where('user_id', $user->id);
            }

            return $query->count();
        });

        $quotations = collect(range(5, 0))->map(function ($i) use ($user) {
            $date = now()->subMonths($i);
            $query = Quotation::query()
                ->whereMonth('created_at', $date->month)
                ->whereYear('created_at', $date->year);

            if (! $user->isSuperAdmin()) {
                $query->where('user_id', $user->id);
            }

            return $query->count();
        });

        return [
            'months' => $months,
            'followups' => $followups,
            'quotations' => $quotations,
        ];
    }
}
