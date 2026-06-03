<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMeetingRequest;
use App\Http\Requests\UpdateMeetingRequest;
use App\Models\Meeting;
use App\Services\MeetingService;
use App\Services\LookupRegistry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Exports\GeneralExport;
use Maatwebsite\Excel\Facades\Excel;

class MeetingController extends Controller
{
    public function __construct(
        private MeetingService $meetingService,
        private LookupRegistry $lookups,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Meetings/Index', [
            'meetings' => $this->meetingService->paginateIndex($request->all()),
            ...$this->lookups->get(['customers', 'requirements']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Meetings/Create', $this->lookups->get([
            'customers',
            'requirements',
            'users',
            'companies'
        ]));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMeetingRequest $request)
    {
        $meeting = $this->meetingService->create(
            $request->validated(),
            (int) Auth::id()
        );

        if ($request->wantsJson()) {
            return response()->json([
                'success' => 'Meeting scheduled successfully',
                'meeting' => $meeting,
                'new_id' => $meeting->id,
            ], 201);
        }

        return back()
            ->with('success', 'Meeting scheduled successfully')
            ->with('new_id', $meeting->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Meeting $meeting)
    {
        return Inertia::render('Meetings/Show', [
            'meeting' => $meeting->load(['customer.company', 'user', 'requirement.items.product.unit']),
            ...$this->lookups->get(['customers', 'requirements']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Meeting $meeting)
    {
        return Inertia::render('Meetings/Edit', [
            'meeting' => $meeting,
            ...$this->lookups->get([
                'customers',
                'requirements',
                'users',
                'companies'
            ]),
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

        $updateData = ['status' => $data['status']];
        if ($data['status'] === 'completed') {
            $updateData['completed_at'] = now();
        }

        $meeting->update($updateData);

        return back()->with('success', 'Status updated successfully');
    }

    public function export(Request $request)
    {
        $meetings = $this->meetingService->getForExport($request->input('ids', []));

        return Excel::download(new GeneralExport(
            $meetings,
            ['Customer', 'Title', 'Date', 'Type', 'Status'],
            function ($meeting) {
                return [
                    $meeting->customer ? $meeting->customer->name : 'N/A',
                    $meeting->title,
                    $meeting->scheduled_at,
                    $meeting->meeting_type,
                    $meeting->status,
                ];
            }
        ), 'meetings.xlsx');
    }

    public function print(Request $request)
    {
        $meetings = $this->meetingService->getForExport($request->input('ids', []));

        $data = $meetings->map(function ($meeting) {
            return [
                $meeting->customer ? $meeting->customer->name : 'N/A',
                $meeting->title,
                $meeting->scheduled_at,
                $meeting->meeting_type,
                $meeting->status,
            ];
        });

        return view('print.general', [
            'title' => 'Meeting List',
            'headings' => ['Customer', 'Title', 'Date', 'Type', 'Status'],
            'data' => $data
        ]);
    }
}
