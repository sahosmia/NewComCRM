<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Customer;
use App\Models\FollowUp;
use App\Models\Meeting;
use App\Models\Quotation;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->isSuperAdmin()) {
            $stats = $this->getSuperAdminStats();
        } else {
            $stats = $this->getUserStats($user->id);
        }

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'todayFollowups' => $this->getTodayFollowups($user),
            'upcomingMeetings' => $this->getUpcomingMeetings($user),
            // 'recentActivities' => $this->getRecentActivities($user),
            'chartData' => $this->getChartData($user)
        ]);
    }

    private function getSuperAdminStats()
    {
        return [
            'totalCustomers' => Customer::count(),
            'totalUsers' => User::where('role', 'user')->count(),
            'todayFollowups' => FollowUp::today()->count(),
            'overdueFollowups' => FollowUp::overdue()->count(),
            'upcomingMeetings' => Meeting::upcoming()->count(),
            'monthlyQuotations' => Quotation::whereMonth('created_at', now()->month)->count(),
            'totalRevenue' => Quotation::accepted()->sum('total'),
            'pendingFollowups' => FollowUp::pending()->count()
        ];
    }

    private function getUserStats($userId)
    {
        return [
            'totalCustomers' => Customer::assignedTo($userId)->count(),
            'todayFollowups' => FollowUp::byUser($userId)->today()->count(),
            'overdueFollowups' => FollowUp::byUser($userId)->overdue()->count(),
            'upcomingMeetings' => Meeting::byUser($userId)->upcoming()->count(),
            'pendingFollowups' => FollowUp::byUser($userId)->pending()->count(),
            'monthlyQuotations' => Quotation::where('user_id', $userId)
                                          ->whereMonth('created_at', now()->month)
                                          ->count()
        ];
    }

    private function getTodayFollowups($user)
    {
        $query = FollowUp::with('customer')
                        ->today()
                        ->pending()
                        ->orderBy('follow_up_date');

        if (!$user->isSuperAdmin()) {
            $query->where('user_id', $user->id);
        }

        return $query->get();
    }

    private function getUpcomingMeetings($user)
    {
        $query = Meeting::with('customer')
                       ->upcoming()
                       ->orderBy('start_time')
                       ->limit(5);

        if (!$user->isSuperAdmin()) {
            $query->where('user_id', $user->id);
        }

        return $query->get();
    }

    private function getRecentActivities($user)
    {
        // Using spatie activity log
        $query = \Spatie\Activitylog\Models\Activity::with('causer')
                    ->latest()
                    ->limit(10);

        if (!$user->isSuperAdmin()) {
            $query->where('causer_id', $user->id);
        }

        return $query->get();
    }

    private function getChartData($user)
    {
        $months = collect(range(5, 0))->map(function ($i) {
            return now()->subMonths($i)->format('M');
        });

        $followups = collect(range(5, 0))->map(function ($i) use ($user) {
            $date = now()->subMonths($i);
            $query = FollowUp::whereMonth('created_at', $date->month)
                            ->whereYear('created_at', $date->year);

            if (!$user->isSuperAdmin()) {
                $query->where('user_id', $user->id);
            }

            return $query->count();
        });

        $quotations = collect(range(5, 0))->map(function ($i) use ($user) {
            $date = now()->subMonths($i);
            $query = Quotation::whereMonth('created_at', $date->month)
                             ->whereYear('created_at', $date->year);

            if (!$user->isSuperAdmin()) {
                $query->where('user_id', $user->id);
            }

            return $query->count();
        });

        return [
            'months' => $months,
            'followups' => $followups,
            'quotations' => $quotations
        ];
    }
}
