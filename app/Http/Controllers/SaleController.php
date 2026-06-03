<?php

namespace App\Http\Controllers;

use App\Services\SaleService;
use App\Services\LookupService;
use App\Services\ExportService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function __construct(
        private SaleService $saleService,
        private LookupService $lookupService,
        private ExportService $exportService,
    ) {}

    public function index(Request $request)
    {
        return Inertia::render('Sales/Index', [
            'sales' => $this->saleService->paginateIndex($request->all()),
            'filters' => [
                'users' => $this->lookupService->getUsersForSelect(),
                'customers' => $this->lookupService->getCustomersForSelect(),
            ]
        ]);
    }

    public function show(\App\Models\Sale $sale)
    {
        return Inertia::render('Sales/Show', [
            'sale' => $sale->load(['customer.company', 'requirement'])
        ]);
    }

    // public function bulkDestroy(Request $request)
    // {
    //     $this->saleService->bulkDelete($request->input('ids', []));

    //     return back()->with('success', 'Sales deleted successfully');
    // }

    public function export(Request $request)
    {
        $sales = $this->saleService->getForExport($request->input('ids', []));

        return $this->exportService->excel(
            $sales,
            ['Customer', 'Amount', 'Sale Date'],
            fn($sale) => [
                $sale->customer ? $sale->customer->name : 'N/A',
                $sale->amount,
                $sale->sale_date->toDateTimeString(),
            ],
            'sales.xlsx'
        );
    }

    public function print(Request $request)
    {
        $sales = $this->saleService->getForExport($request->input('ids', []));

        return $this->exportService->printView(
            $sales,
            ['Customer', 'Amount', 'Sale Date'],
            fn($sale) => [
                $sale->customer ? $sale->customer->name : 'N/A',
                $sale->amount,
                $sale->sale_date->toDateTimeString(),
            ],
            'Sale List'
        );
    }
}
