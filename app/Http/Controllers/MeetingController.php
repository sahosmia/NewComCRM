<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMeetingRequest;
use App\Http\Requests\UpdateMeetingRequest;
use App\Models\Meeting;
use App\Services\MeetingService;
use App\Services\LookupService;
use App\Services\ExportService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Traits\HandlesModalResponses;

class MeetingController extends Controller
{
    use HandlesModalResponses;
    public function __construct(
        private MeetingService $meetingService,
        private LookupService $lookupService,
        private ExportService $exportService,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Meetings/Index', [
            'meetings' => $this->meetingService->paginateIndex($request->all()),
            'customers' => $this->lookupService->getCustomersForSelect(),
            'requirements' => $this->lookupService->getRequirementsForSelect(),
            'users' => $this->lookupService->getUsersForSelect(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Meetings/Create', [
            'customers' => $this->lookupService->getCustomersForSelect(),
            'requirements' => $this->lookupService->getRequirementsForSelect(),
            'users' => $this->lookupService->getUsersForSelect(),
            'companies' => $this->lookupService->getCompanies(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMeetingRequest $request)
    {
        $meeting = $this->meetingService->create(
            $request->validated()
        );

        return $this->handleResponse(
            $request,
            $meeting,
            'Meeting scheduled successfully',
            'meetings.index'
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Meeting $meeting)
    {
        return Inertia::render('Meetings/Show', [
            'meeting' => $meeting->load(['customer.company', 'user', 'requirement.items.product.unit']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Meeting $meeting)
    {
        return Inertia::render('Meetings/Edit', [
            'meeting' => $meeting,
            'customers' => $this->lookupService->getCustomersForSelect(),
            'requirements' => $this->lookupService->getRequirementsForSelect(),
            'users' => $this->lookupService->getUsersForSelect(),
            'companies' => $this->lookupService->getCompanies(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMeetingRequest $request, Meeting $meeting)
    {
        $this->meetingService->update($meeting, $request->validated());

        return redirect()->route('meetings.index')
            ->with('success', 'Meeting updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Meeting $meeting)
    {
        $this->meetingService->delete($meeting);

        return redirect()->route('meetings.index')
            ->with('success', 'Meeting deleted successfully');
    }

    public function bulkDestroy(Request $request)
    {
        $ids = $request->input('ids', []);
        $this->meetingService->bulkDelete($ids);

        return back()->with('success', 'Meetings deleted successfully');
    }

      public function updateStatus(Request $request, Meeting $meeting)
    {
        $data = $request->validate([
            'status' => 'required|in:scheduled,completed,cancelled'
        ]);

        $meeting->update(['status' => $data['status']]);

        return back()->with('success', 'Status updated successfully');
    }

    public function export(Request $request)
    {
        $meetings = $this->meetingService->getForExport($request->input('ids', []));

        return $this->exportService->excel(
            $meetings,
            ['Customer', 'Title', 'Date', 'Type', 'Status'],
            fn($meeting) => [
                $meeting->customer ? $meeting->customer->name : 'N/A',
                $meeting->title,
                $meeting->scheduled_at,
                $meeting->meeting_type,
                $meeting->status,
            ],
            'meetings.xlsx'
        );
    }

    public function print(Request $request)
    {
        $meetings = $this->meetingService->getForExport($request->input('ids', []));

        return $this->exportService->printView(
            $meetings,
            ['Customer', 'Title', 'Date', 'Type', 'Status'],
            fn($meeting) => [
                $meeting->customer ? $meeting->customer->name : 'N/A',
                $meeting->title,
                $meeting->scheduled_at,
                $meeting->meeting_type,
                $meeting->status,
            ],
            'Meeting List'
        );
    }
}
