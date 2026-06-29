<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\DashboardService;
use App\Services\LookupService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        private DashboardService $dashboardService,
        private LookupService $lookupService,

    ) {
    }

    public function index()
    {
        $user = Auth::user();
        if (!$user instanceof User) {
            abort(401);
        }

        $data = $this->dashboardService->dashboardData($user);
        $data['customers'] = array_merge($data['customers'], ['list' => $this->lookupService->getCustomersForSelect()]);
        $data['requirements'] = array_merge($data['requirements'], ['list' => $this->lookupService->getRequirementsForSelect()]);
        $data['users'] = $this->lookupService->getUsersForSelect();

        return Inertia::render('Dashboard', $data);
    }
}
