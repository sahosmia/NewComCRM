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
use App\Exports\GeneralExport;
use Maatwebsite\Excel\Facades\Excel;

class FollowUpController extends Controller
{
    public function __construct(
        private FollowUpService $followUpService,
    ) {}

    public function index(Request $request)
    {
        $user = Auth::user();
        if (! $user instanceof User) {
            abort(401);
        }

        return Inertia::render('FollowUps/Index', [
            'followUps' => $this->followUpService->paginateIndex($request->all(), $user),
            'stats' => $this->followUpService->stats(),
        ]);
    }

    public function create()
    {
        return Inertia::render('FollowUps/Create', [
            'customers' => $this->followUpService->customersForForm(),
        ]);
    }

    public function store(StoreFollowUpRequest $request)
    {
        $this->followUpService->create(
            $request->validated(),
            (int) Auth::id()
        );

        return redirect()->route('follow-ups.index')
            ->with('success', 'Follow up scheduled successfully.');
    }

    public function show(FollowUp $followUp)
    {
        return Inertia::render('FollowUps/Show', [
            'followUp' => $followUp->load(['customer', 'user']),
        ]);
    }

    public function edit(FollowUp $followUp)
    {
        return Inertia::render('FollowUps/Edit', [
            'followUp' => $followUp,
            'customers' => $this->followUpService->customersForForm(),
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
        $ids = $request->input('ids', []);

        $query = FollowUp::query()->with(['customer', 'user']);

        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }

        $followUps = $query->get();

        return Excel::download(new GeneralExport(
            $followUps,
            ['Customer', 'Date', 'Status', 'Priority', 'Notes'],
            function ($followUp) {
                return [
                    $followUp->customer ? $followUp->customer->name : 'N/A',
                    $followUp->follow_up_date,
                    $followUp->status,
                    $followUp->priority,
                    $followUp->notes,
                ];
            }
        ), 'follow_ups.xlsx');
    }

    public function print(Request $request)
    {
        $ids = $request->input('ids', []);
        $query = FollowUp::query()->with(['customer', 'user']);
        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }
        $followUps = $query->get();

        $data = $followUps->map(function($followUp) {
            return [
                $followUp->customer ? $followUp->customer->name : 'N/A',
                $followUp->follow_up_date,
                $followUp->status,
                $followUp->priority,
                $followUp->notes,
            ];
        });

        return view('print.general', [
            'title' => 'Follow Up List',
            'headings' => ['Customer', 'Date', 'Status', 'Priority', 'Notes'],
            'data' => $data
        ]);
    }
}
