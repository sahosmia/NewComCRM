<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Models\Supplier;
use App\Services\SupplierService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\HandlesModalResponses;

class SupplierController extends Controller
{
    use HandlesModalResponses;

    public function __construct(
        private SupplierService $supplierService,
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Suppliers/Index', [
            'suppliers' => $this->supplierService->paginateIndex($request->all()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Suppliers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSupplierRequest $request)
    {
        $supplier = $this->supplierService->create($request->validated());

        return $this->handleResponse(
            $request,
            $supplier,
            'Supplier created successfully',
            'suppliers.index'
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Supplier $supplier)
    {
        return Inertia::render('Suppliers/Show', [
            'supplier' => $supplier,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supplier $supplier)
    {
        return Inertia::render('Suppliers/Edit', [
            'supplier' => $supplier,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupplierRequest $request, Supplier $supplier)
    {
        $this->supplierService->update($supplier, $request->validated());

        return redirect()->route('suppliers.index')
            ->with('success', 'Supplier updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supplier $supplier)
    {
        $this->supplierService->delete($supplier);

        return redirect()->route('suppliers.index')
            ->with('success', 'Supplier deleted successfully');
    }

    public function bulkDestroy(Request $request)
    {
        $ids = $request->input('ids', []);
        $this->supplierService->bulkDelete($ids);

        return back()->with('success', 'Suppliers deleted successfully');
    }
}
