<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\DashboardService;
use App\Services\CustomerService;
use App\Services\RequirementService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        private DashboardService $dashboardService,
        private CustomerService $customerService,
        private RequirementService $requirementService,

    ) {}

    public function index()
    {
        $user = Auth::user();
        if (! $user instanceof User) {
            abort(401);
        }

  $data = $this->dashboardService->dashboardData($user);
        $data['customers'] = array_merge($data['customers'], ['list' => $this->customerService->customersForForm()]);
        $data['requirements'] = array_merge($data['meetings'], ['list' => $this->requirementService->selectOptions()]);

        return Inertia::render('dashboard', $data);    }
}
