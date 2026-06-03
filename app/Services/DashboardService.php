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
            'meetings' => $this->getMeetingMetrics($user),
            'followUps' => $this->getFollowUpMetrics($user),
            'sales' => $this->getSalesMetrics($user),
            'customers' => $this->getCustomerMetrics($user),
            'birthdays' => $this->getBirthdayMetrics($user),
            'chartData' => $this->chartData($user),
        ];
    }

    private function getMeetingMetrics(User $user): array
    {
        $baseQuery = Meeting::query()
            ->with(['customer.company', 'requirement'])
            ->when(!$user->isSuperAdmin(), fn($q) => $q->where('user_id', $user->id));

        return [
            'today' => (clone $baseQuery)->whereDate('scheduled_at', today())->orderBy('scheduled_at')->get(),
            'upcoming' => (clone $baseQuery)->whereDate('scheduled_at', '>', today())->orderBy('scheduled_at')->limit(5)->get(),
            'today_count' => (clone $baseQuery)->whereDate('scheduled_at', today())->count(),
            'upcoming_count' => (clone $baseQuery)->whereDate('scheduled_at', '>', today())->count(),
        ];
    }

    private function getFollowUpMetrics(User $user): array
    {
        $baseQuery = FollowUp::query()
            ->with(['customer.company', 'requirement'])
            ->when(!$user->isSuperAdmin(), fn($q) => $q->where('user_id', $user->id));

        return [
            'today' => (clone $baseQuery)->whereDate('follow_up_date', today())->pending()->orderBy('follow_up_date')->get(),
            'upcoming' => (clone $baseQuery)->whereDate('follow_up_date', '>', today())->pending()->orderBy('follow_up_date')->limit(5)->get(),
            'today_count' => (clone $baseQuery)->whereDate('follow_up_date', today())->pending()->count(),
            'upcoming_count' => (clone $baseQuery)->whereDate('follow_up_date', '>', today())->pending()->count(),
        ];
    }

    private function getSalesMetrics(User $user): array
    {
        $baseQuery = Sale::query()
            ->when(!$user->isSuperAdmin(), function ($query) use ($user) {
                $query->whereHas('customer', fn($q) => $q->where('assigned_to', $user->id));
            });

        return [
            'today_count' => (clone $baseQuery)->whereDate('sale_date', today())->count(),
            'today_amount' => (clone $baseQuery)->whereDate('sale_date', today())->sum('amount'),
            'total_count' => (clone $baseQuery)->count(),
            'total_amount' => (clone $baseQuery)->sum('amount'),
        ];
    }

    private function getCustomerMetrics(User $user): array
    {
        $baseQuery = Customer::query()
            ->when(!$user->isSuperAdmin(), fn($q) => $q->where('assigned_to', $user->id));

        return [
            'today_count' => (clone $baseQuery)->whereDate('created_at', today())->count(),
            'total_count' => (clone $baseQuery)->count(),
        ];
    }

    private function getBirthdayMetrics(User $user): array
    {
        $baseQuery = Customer::query()
            ->when(!$user->isSuperAdmin(), fn($q) => $q->where('assigned_to', $user->id));

        return [
            'today' => (clone $baseQuery)->whereMonth('date_of_birth', now()->month)
                ->whereDay('date_of_birth', now()->day)
                ->get(),
            'this_month' => (clone $baseQuery)->whereMonth('date_of_birth', now()->month)
                ->whereDay('date_of_birth', '>', now()->day)
                ->when(config('database.default') === 'sqlite', function($q) {
                    $q->orderByRaw("strftime('%d', date_of_birth) ASC");
                }, function($q) {
                    $q->orderByRaw('DAY(date_of_birth) ASC');
                })
                ->limit(5)
                ->get(),
            'today_count' => (clone $baseQuery)->whereMonth('date_of_birth', now()->month)
                ->whereDay('date_of_birth', now()->day)
                ->count(),
            'month_count' => (clone $baseQuery)->whereMonth('date_of_birth', now()->month)
                ->whereDay('date_of_birth', '>=', now()->day)
                ->count(),
        ];
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
