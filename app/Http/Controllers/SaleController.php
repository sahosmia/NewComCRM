<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Inertia\Inertia;
use Illuminate\Http\Request;

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
}
