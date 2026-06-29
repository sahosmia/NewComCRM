<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFollowUpRequest;
use App\Http\Requests\UpdateFollowUpRequest;
use App\Models\FollowUp;
use App\Models\User;
use App\Services\FollowUpService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Services\LookupService;
use App\Services\ExportService;
use App\Traits\HandlesModalResponses;

class FollowUpController extends Controller
{
    use HandlesModalResponses;
    public function __construct(
        private FollowUpService $followUpService,
        private LookupService $lookupService,
        private ExportService $exportService,
    ) {}

    public function index(Request $request)
    {
        $user = Auth::user();
        if (!$user instanceof User) {
            abort(401);
        }


        // return $this->followUpService->paginateIndex($request->all(), $user);
        return Inertia::render('FollowUps/Index', [
            'followUps' => $this->followUpService->paginateIndex($request->all(), $user),
            'customers' => $this->lookupService->getCustomersForSelect(),
            'requirements' => $this->lookupService->getRequirementsForSelect(),
            'users' => $this->lookupService->getUsersForSelect(),
        ]);
    }

    public function create()
    {
        return Inertia::render('FollowUps/Create', [
            'customers' => $this->lookupService->getCustomersForSelect(),
            'requirements' => $this->lookupService->getRequirementsForSelect(),
            'users' => $this->lookupService->getUsersForSelect(),
            'companies' => $this->lookupService->getCompanies(),
        ]);
    }

    public function store(StoreFollowUpRequest $request)
    {
        // return $request;
        $followUp = $this->followUpService->create(
            $request->validated()
        );

        return $this->handleResponse(
            $request,
            $followUp,
            'Follow up scheduled successfully.',
            'follow-ups.index'
        );
    }

    public function show(FollowUp $followUp)
    {
        return Inertia::render('FollowUps/Show', [
            'followUp' => $followUp->load(['customer.company', 'user', 'requirement.items.product.unit']),
        ]);
    }

    public function edit(FollowUp $followUp)
    {
        return Inertia::render('FollowUps/Edit', [
            'followUp' => $followUp,
            'customers' => $this->lookupService->getCustomersForSelect(),
            'requirements' => $this->lookupService->getRequirementsForSelect(),
            'users' => $this->lookupService->getUsersForSelect(),
            'companies' => $this->lookupService->getCompanies(),
        ]);
    }

    public function update(UpdateFollowUpRequest $request, FollowUp $followUp)
    {
        $this->followUpService->update($followUp, $request->validated());

        return redirect()->route('follow-ups.index')
            ->with('success', 'Follow up updated successfully.');
    }

    public function updateStatus(Request $request, FollowUp $followUp)
    {
        $data = $request->validate([
            'status' => 'required|in:pending,done'
        ]);

        $followUp->update(['status' => $data['status']]);

        return back()->with('success', 'Status updated successfully');
    }

    public function destroy(FollowUp $followUp)
    {
        $this->followUpService->delete($followUp);

        return redirect()->route('follow-ups.index')
            ->with('success', 'Follow up deleted successfully.');
    }

    public function bulkDestroy(Request $request)
    {
        $ids = $request->input('ids', []);
        $this->followUpService->bulkDelete($ids);

        return back()->with('success', 'Follow ups deleted successfully');
    }

    public function complete(Request $request, FollowUp $followUp)
    {
        $this->followUpService->complete(
            $followUp,
            $request->input('status', $followUp->status)
        );

        return redirect()->back()
            ->with('success', 'Follow up marked as completed.');
    }

    public function export(Request $request)
    {
        $followUps = $this->followUpService->getForExport($request->input('ids', []));

        return $this->exportService->excel(
            $followUps,
            ['Customer', 'Date', 'Status', 'Priority', 'Notes'],
            fn($followUp) => [
                $followUp->customer ? $followUp->customer->name : 'N/A',
                $followUp->follow_up_date,
                $followUp->status,
                $followUp->priority,
                $followUp->notes,
            ],
            'follow_ups.xlsx'
        );
    }

    public function print(Request $request)
    {
        $followUps = $this->followUpService->getForExport($request->input('ids', []));

        return $this->exportService->printView(
            $followUps,
            ['Customer', 'Date', 'Status', 'Priority', 'Notes'],
            fn($followUp) => [
                $followUp->customer ? $followUp->customer->name : 'N/A',
                $followUp->follow_up_date,
                $followUp->status,
                $followUp->priority,
                $followUp->notes,
            ],
            'Follow Up List'
        );
    }
}
