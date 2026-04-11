<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRequirementRequest;
use App\Http\Requests\UpdateRequirementRequest;
use App\Models\Requirement;
use App\Services\RequirementService;
use Inertia\Inertia;

class RequirementController extends Controller
{
    public function __construct(
        private RequirementService $requirementService,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Requirements/Index', [
            'requirements' => $this->requirementService->paginateIndex(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Requirements/Create', $this->requirementService->formOptions());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequirementRequest $request)
    {
        $this->requirementService->create($request->validated());

        return redirect()->route('requirements.index')
            ->with('success', 'Requirement created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Requirement $requirement)
    {
        return Inertia::render('Requirements/Show', [
            'requirement' => $requirement->load(['customer', 'product']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Requirement $requirement)
    {
        return Inertia::render('Requirements/Edit', array_merge(
            ['requirement' => $requirement],
            $this->requirementService->formOptions()
        ));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequirementRequest $request, Requirement $requirement)
    {
        $this->requirementService->update($requirement, $request->validated());

        return redirect()->route('requirements.index')
            ->with('success', 'Requirement updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Requirement $requirement)
    {
        $this->requirementService->delete($requirement);

        return redirect()->route('requirements.index')
            ->with('success', 'Requirement deleted successfully');
    }
}
