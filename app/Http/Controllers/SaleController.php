<?php

namespace App\Http\Controllers;

use App\Services\SaleService;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Exports\GeneralExport;
use Maatwebsite\Excel\Facades\Excel;

class SaleController extends Controller
{
    public function __construct(
        private SaleService $saleService
    ) {}

    public function index(Request $request)
    {
        return Inertia::render('Sales/Index', [
            'sales' => $this->saleService->paginateIndex($request->all())
        ]);
    }

    public function bulkDestroy(Request $request)
    {
        $this->saleService->bulkDelete($request->input('ids', []));

        return back()->with('success', 'Sales deleted successfully');
    }

    public function export(Request $request)
    {
        $sales = $this->saleService->getForExport($request->input('ids', []));

        return Excel::download(new GeneralExport(
            $sales,
            ['Customer', 'Amount', 'Sale Date'],
            function ($sale) {
                return [
                    $sale->customer ? $sale->customer->name : 'N/A',
                    $sale->amount,
                    $sale->sale_date->toDateTimeString(),
                ];
            }
        ), 'sales.xlsx');
    }

    public function print(Request $request)
    {
        $sales = $this->saleService->getForExport($request->input('ids', []));

        $data = $sales->map(function($sale) {
            return [
                $sale->customer ? $sale->customer->name : 'N/A',
                $sale->amount,
                $sale->sale_date->toDateTimeString(),
            ];
        });

        return view('print.general', [
            'title' => 'Sale List',
            'headings' => ['Customer', 'Amount', 'Sale Date'],
            'data' => $data
        ]);
    }
}
