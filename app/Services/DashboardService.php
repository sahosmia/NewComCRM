<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\FollowUp;
use App\Models\Meeting;
use App\Models\Sale;
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
            'pendingFollowups' => FollowUp::query()->pending()->count(),
            'todayFollowupsDone' => FollowUp::query()->whereDate('completed_at', today())->count(),
            'todayMeetingsDone' => Meeting::query()->where('status', 'completed')->whereDate('updated_at', today())->count(),
            'todaySalesCount' => Sale::query()->whereDate('sale_date', today())->count(),
            'totalSalesAmount' => Sale::query()->sum('amount'),

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

            'todayFollowupsDone' => FollowUp::query()->byUser($userId)->whereDate('completed_at', today())->count(),
            'todayMeetingsDone' => Meeting::query()->byUser($userId)->where('status', 'completed')->whereDate('updated_at', today())->count(),
            'todaySalesCount' => Sale::query()->whereHas('customer', function ($q) use ($userId) {
                $q->where('assigned_to', $userId);
            })->whereDate('sale_date', today())->count(),
        ];
    }

    private function todayFollowups(User $user)
    {
        $query = FollowUp::query()
            ->with(['customer', 'requirement'])
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
            ->with(['customer', 'requirement'])
            ->upcoming()
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
