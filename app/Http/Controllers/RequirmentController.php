<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRequirementRequest;
use App\Http\Requests\UpdateRequirementRequest;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Requirement;
use Inertia\Inertia;

class RequirementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $requirements = Requirement::with(['customer', 'product'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Requirements/Index', [
            'requirements' => $requirements
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Requirements/Create', [
            'customers' => Customer::select('id', 'name', 'company_name')->get(),
            'products' => Product::select('id', 'name', 'unit_price')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequirementRequest $request)
    {
        Requirement::create($request->validated());

        return redirect()->route('requirements.index')
            ->with('success', 'Requirement created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Requirement $requirement)
    {
        return Inertia::render('Requirements/Show', [
            'requirement' => $requirement->load(['customer', 'product'])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Requirement $requirement)
    {
        return Inertia::render('Requirements/Edit', [
            'requirement' => $requirement,
            'customers' => Customer::select('id', 'name', 'company_name')->get(),
            'products' => Product::select('id', 'name', 'unit_price')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequirementRequest $request, Requirement $requirement)
    {
        $requirement->update($request->validated());

        return redirect()->route('requirements.index')
            ->with('success', 'Requirement updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Requirement $requirement)
    {
        $requirement->delete();

        return redirect()->route('requirements.index')
            ->with('success', 'Requirement deleted successfully');
    }
}
