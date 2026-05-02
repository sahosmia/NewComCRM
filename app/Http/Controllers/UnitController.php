<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUnitRequest;
use App\Http\Requests\UpdateUnitRequest;
use App\Models\Unit;
use App\Services\UnitService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnitController extends Controller
{
    public function __construct(
        private UnitService $unitService
    ) {}

    public function index(Request $request)
    {
        return Inertia::render('Units/Index', [
            'units' => $this->unitService->paginateIndex($request->all()),
        ]);
    }

    public function create()
    {
        return Inertia::render('Units/Create');
    }

    public function store(StoreUnitRequest $request)
    {
        $this->unitService->create($request->validated());

        return redirect()->route('units.index')
            ->with('success', 'Unit created successfully');
    }

    public function edit(Unit $unit)
    {
        return Inertia::render('Units/Edit', [
            'unit' => $unit,
        ]);
    }

    public function update(UpdateUnitRequest $request, Unit $unit)
    {
        $this->unitService->update($unit, $request->validated());

        return redirect()->route('units.index')
            ->with('success', 'Unit updated successfully');
    }

    public function destroy(Unit $unit)
    {
        $this->unitService->delete($unit);

        return redirect()->route('units.index')
            ->with('success', 'Unit deleted successfully');
    }
}
