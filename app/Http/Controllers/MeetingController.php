<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMeetingRequest;
use App\Http\Requests\UpdateMeetingRequest;
use App\Models\Meeting;
use App\Services\MeetingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Exports\GeneralExport;
use Maatwebsite\Excel\Facades\Excel;

class MeetingController extends Controller
{
    public function __construct(
        private MeetingService $meetingService,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Meetings/Index', [
            'meetings' => $this->meetingService->paginateIndex($request->all()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Meetings/Create', [
            'customers' => $this->meetingService->customersForForm(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMeetingRequest $request)
    {
        $this->meetingService->create(
            $request->validated(),
            (int) Auth::id()
        );

        return redirect()->route('meetings.index')
            ->with('success', 'Meeting scheduled successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Meeting $meeting)
    {
        return Inertia::render('Meetings/Show', [
            'meeting' => $meeting->load(['customer', 'user']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Meeting $meeting)
    {
        return Inertia::render('Meetings/Edit', [
            'meeting' => $meeting,
            'customers' => $this->meetingService->customersForForm(),
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

    public function export(Request $request)
    {
        $ids = $request->input('ids', []);

        $query = Meeting::query()->with(['customer', 'user']);

        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }

        $meetings = $query->get();

        return Excel::download(new GeneralExport(
            $meetings,
            ['Customer', 'Title', 'Date', 'Type', 'Status'],
            function ($meeting) {
                return [
                    $meeting->customer ? $meeting->customer->name : 'N/A',
                    $meeting->title,
                    $meeting->start_time,
                    $meeting->meeting_type,
                    $meeting->status,
                ];
            }
        ), 'meetings.xlsx');
    }

    public function print(Request $request)
    {
        $ids = $request->input('ids', []);
        $query = Meeting::query()->with(['customer', 'user']);
        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }
        $meetings = $query->get();

        $data = $meetings->map(function($meeting) {
            return [
                $meeting->customer ? $meeting->customer->name : 'N/A',
                $meeting->title,
                $meeting->start_time,
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
