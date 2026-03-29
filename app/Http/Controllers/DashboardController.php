<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\DashboardService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        private DashboardService $dashboardService,
    ) {}

    public function index()
    {
        $user = Auth::user();
        if (! $user instanceof User) {
            abort(401);
        }

        return Inertia::render('dashboard', $this->dashboardService->dashboardData($user));
    }
}
