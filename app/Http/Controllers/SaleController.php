<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Exports\GeneralExport;
use Maatwebsite\Excel\Facades\Excel;

class SaleController extends Controller
{
    public function index()
    {
        $sales = Sale::with(['customer', 'requirement.items.product'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Sales/Index', [
            'sales' => $sales
        ]);
    }

    public function export(Request $request)
    {
        $ids = $request->input('ids', []);

        $query = Sale::query()->with(['customer', 'requirement.items.product']);

        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }

        $sales = $query->get();

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
        $ids = $request->input('ids', []);
        $query = Sale::query()->with(['customer']);
        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }
        $sales = $query->get();

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
