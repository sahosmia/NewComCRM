<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRequirementRequest;
use App\Http\Requests\UpdateRequirementRequest;
use App\Models\Requirement;
use App\Services\RequirementService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Exports\GeneralExport;
use Maatwebsite\Excel\Facades\Excel;


class RequirementController extends Controller
{
    public function __construct(
        private RequirementService $requirementService,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Requirement::class);
        return Inertia::render('Requirements/Index', [
            'requirements' => $this->requirementService->paginateIndex($request->all()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {        $this->authorize('create', Requirement::class);


        return Inertia::render('Requirements/Create', $this->requirementService->formOptions());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequirementRequest $request)
    {
                $this->authorize('create', Requirement::class);

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
            'requirement' => $requirement->load(['customer', 'items.product']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Requirement $requirement)
    {
        return Inertia::render('Requirements/Edit', array_merge(
            ['requirement' => $requirement->load('items')],
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

    public function updateStatus(Request $request, Requirement $requirement)
    {
        $data = $request->validate([
            'status' => 'required|in:pending,processing,purchased,cancel'
        ]);

        $requirement->update(['status' => $data['status']]);

        return back()->with('success', 'Status updated successfully');
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

    public function export(Request $request)
    {
        $ids = $request->input('ids', []);

        $query = Requirement::query()->with(['customer', 'items.product']);

        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }

        $requirements = $query->get();

        return Excel::download(new GeneralExport(
            $requirements,
            ['Customer', 'Items', 'Total Price', 'Status', 'Date'],
            function ($requirement) {
                $items = $requirement->items->map(function($item) {
                    return ($item->product ? $item->product->name : 'Unknown') . " (x{$item->quantity})";
                })->implode(', ');

                return [
                    $requirement->customer ? $requirement->customer->name : 'N/A',
                    $items,
                    $requirement->grand_total,
                    $requirement->status,
                    $requirement->created_at->toDateTimeString(),
                ];
            }
        ), 'requirements.xlsx');
    }

    public function print(Request $request)
    {
        $ids = $request->input('ids', []);
        $query = Requirement::query()->with(['customer', 'items.product']);
        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }
        $requirements = $query->get();

        $data = $requirements->map(function($requirement) {
            $items = $requirement->items->map(function($item) {
                return ($item->product ? $item->product->name : 'Unknown') . " (x{$item->quantity})";
            })->implode(', ');

            return [
                $requirement->customer ? $requirement->customer->name : 'N/A',
                $items,
                $requirement->grand_total,
                $requirement->status,
                $requirement->created_at->toDateTimeString(),
            ];
        });

        return view('print.general', [
            'title' => 'Requirement List',
            'headings' => ['Customer', 'Items', 'Total Price', 'Status', 'Date'],
            'data' => $data
        ]);
    }
}
