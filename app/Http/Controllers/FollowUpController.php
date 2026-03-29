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

        $data = $this->followUpService->indexData($user, $request);

        return Inertia::render('FollowUps/Index', $data);
    }

    public function create()
    {
        return Inertia::render('FollowUps/Create', [
            'customers' => $this->followUpService->customersForForm(),
        ]);
    }

    public function store(StoreFollowUpRequest $request)
    {
        $followUp = $this->followUpService->create(
            $request->validated(),
            (int) Auth::id()
        );

        if ($request->wantsJson()) {
            return response()->json($followUp->load('customer'));
        }

        return redirect()->back()
            ->with('success', 'Follow up scheduled successfully.');
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
        $this->authorize('update', $followUp);

        $this->followUpService->update($followUp, $request->validated());

        return redirect()->back()
            ->with('success', 'Follow up updated successfully.');
    }

    public function destroy(FollowUp $followUp)
    {
        $this->authorize('delete', $followUp);

        $this->followUpService->delete($followUp);

        return redirect()->back()
            ->with('success', 'Follow up deleted successfully.');
    }

    public function complete(Request $request, FollowUp $followUp)
    {
        $this->authorize('update', $followUp);

        $this->followUpService->complete(
            $followUp,
            $request->input('status', $followUp->status)
        );

        return redirect()->back()
            ->with('success', 'Follow up marked as completed.');
    }
}
