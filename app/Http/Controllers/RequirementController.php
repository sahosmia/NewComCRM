<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRequirementRequest;
use App\Http\Requests\UpdateRequirementRequest;
use App\Models\Requirement;
use App\Services\RequirementService;
use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Services\LookupService;
use App\Services\ExportService;
use App\Traits\HandlesModalResponses;

class RequirementController extends Controller
{
    use HandlesModalResponses;
    public function __construct(
        private RequirementService $requirementService,
         private LookupService $lookupService,
        private ExportService $exportService,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // return $this->lookupService->getAllUsersForSelect();
        // return $request->all();
        $this->authorize('viewAny', Requirement::class);
        return Inertia::render('Requirements/Index', [
            'requirements' => $this->requirementService->paginateIndex($request->all()),
            'customers' => $this->lookupService->getCustomersForSelect(),
            'users'     => $this->lookupService->getUsersForSelect(),
                        'all_users' => $this->lookupService->getAllUsersForSelect(),

            'companies' => $this->lookupService->getCompanies(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Requirement::class);

   return Inertia::render('Requirements/Create', [
            'customers' => $this->lookupService->getCustomersForRequirementForm(),
            'all_customers' => $this->lookupService->getAllCustomersForSelect(),
            'products'  => $this->lookupService->getProductsForSelect(),
            'units'     => $this->lookupService->getUnits(),
            'users'     => $this->lookupService->getUsersForSelect(),

                        'all_users' => $this->lookupService->getAllUsersForSelect(),
            'companies' => $this->lookupService->getCompanies(),
        ]);    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequirementRequest $request)
    {
        $this->authorize('create', Requirement::class);

        $requirement = $this->requirementService->create($request->validated());

        return $this->handleResponse(
            $request,
            $requirement,
            'Requirement created successfully',
            'requirements.index'
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Requirement $requirement)
    {
        return Inertia::render('Requirements/Show', [
            'requirement' => $requirement->load([
                'customer.company',
                'items.product.unit',
                'accessories.unit',
                'installations.unit',
                'meetings',
                'followUps',
                'quotationRecipient.company',
                'quotationSender'
            ]),
            'customers' => $this->lookupService->getCustomersForRequirementForm(),
            'requirements' => $this->lookupService->getRequirementsForSelect(),
            'users'     => $this->lookupService->getUsersForSelect(),

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Requirement $requirement)
    {
           return Inertia::render('Requirements/Edit', [
            'requirement' => $requirement->load(['items.product.unit', 'accessories.unit', 'installations.unit']),
            'customers' => $this->lookupService->getCustomersForRequirementForm(),
            'all_customers' => $this->lookupService->getAllCustomersForSelect(),
            'products'  => $this->lookupService->getProductsForSelect(),
            'units'     => $this->lookupService->getUnits(),
            'users'     => $this->lookupService->getUsersForSelect(),
                                    'all_users' => $this->lookupService->getAllUsersForSelect(),

            'companies' => $this->lookupService->getCompanies(),
        ]);
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

    public function bulkDestroy(Request $request)
    {
        $ids = $request->input('ids', []);
        $this->requirementService->bulkDelete($ids);

        return back()->with('success', 'Requirements deleted successfully');
    }


    public function downloadPdf(Requirement $requirement)
    {
        // return setting('secondary_logo');
        return $this->requirementService->generatePdf($requirement)
            ->stream('Quotation_' . $requirement->id . '.pdf');
    }

    public function export(Request $request)
    {
        $requirements = $this->requirementService->getForExport($request->input('ids', []));

        return $this->exportService->excel(
            $requirements,
            ['Customer', 'Items', 'Total Price', 'Status', 'Date'],
            fn($requirement) => [
                $requirement->customer ? $requirement->customer->name : 'N/A',
                $requirement->items->map(fn($item) => ($item->product ? $item->product->name : 'Unknown') . " (x{$item->quantity})")->implode(', '),
                $requirement->grand_total,
                $requirement->status,
                $requirement->created_at->toDateTimeString(),
            ],
            'requirements.xlsx'
        );
    }

    public function print(Request $request)
    {
        $requirements = $this->requirementService->getForExport($request->input('ids', []));

        return $this->exportService->printView(
            $requirements,
            ['Customer', 'Items', 'Total Price', 'Status', 'Date'],
            fn($requirement) => [
                $requirement->customer ? $requirement->customer->name : 'N/A',
                $requirement->items->map(fn($item) => ($item->product ? $item->product->name : 'Unknown') . " (x{$item->quantity})")->implode(', '),
                $requirement->grand_total,
                $requirement->status,
                $requirement->created_at->toDateTimeString(),
            ],
            'Requirement List'
        );
    }
}
