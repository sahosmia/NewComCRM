<?php

namespace App\Http\Controllers;

use App\Services\ReportService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function __construct(
        private ReportService $reportService
    ) {}

    public function index(Request $request)
    {
        return Inertia::render('Reports/Index', $this->reportService->getReportData($request->all()));
    }

    public function followUps(Request $request)
    {
        // Keep existing if any, otherwise logic is in index now
        return $this->index($request);
    }

    public function sales(Request $request)
    {
        return $this->index($request);
    }

    public function customers(Request $request)
    {
        return $this->index($request);
    }
}
