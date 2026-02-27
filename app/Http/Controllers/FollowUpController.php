<?php
namespace App\Http\Controllers;

use App\Models\FollowUp;
use App\Models\Customer;
use App\Http\Requests\StoreFollowUpRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class FollowUpController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $followUps = FollowUp::with(['customer', 'user'])
            ->when(!$user->isSuperAdmin(), function ($query) use ($user) {
                return $query->where('user_id', $user->id);
            })
            ->when($request->status, function ($query, $status) {
                return $query->where('status', $status);
            })
            ->when($request->type, function ($query, $type) {
                if ($type === 'today') {
                    return $query->today();
                } elseif ($type === 'upcoming') {
                    return $query->upcoming();
                } elseif ($type === 'overdue') {
                    return $query->overdue();
                }
            })
            ->when($request->customer_id, function ($query, $customerId) {
                return $query->where('customer_id', $customerId);
            })
            ->orderBy($request->sort_field ?? 'follow_up_date', $request->sort_direction ?? 'asc')
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('FollowUps/Index', [
            'followUps' => $followUps,
            'filters' => $request->only(['status', 'type', 'customer_id']),
            'stats' => [
                'today' => FollowUp::today()->count(),
                'upcoming' => FollowUp::upcoming()->count(),
                'overdue' => FollowUp::overdue()->count(),
                'completed' => FollowUp::completed()->count()
            ]
        ]);
    }

    public function store(StoreFollowUpRequest $request)
    {
        $followUp = FollowUp::create(array_merge(
            $request->validated(),
            ['user_id' => Auth::id()]
        ));

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
            'customers' => Customer::select('id', 'name')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('FollowUps/Create', [
            'customers' => Customer::select('id', 'name')->get()
        ]);
    }

    public function update(Request $request, FollowUp $followUp)
    {
        $this->authorize('update', $followUp);

        $validated = $request->validate([
            'status' => 'required|in:price_shared,negotiation,purchase,lost,pending,follow_up',
            'notes' => 'nullable|string',
            'next_follow_up' => 'nullable|date',
            'completed_at' => 'nullable|date'
        ]);

        if (isset($validated['completed_at'])) {
            $validated['completed_at'] = now();
        }

        $followUp->update($validated);

        return redirect()->back()
            ->with('success', 'Follow up updated successfully.');
    }

    public function complete(FollowUp $followUp)
    {
        $this->authorize('update', $followUp);

        $followUp->update([
            'completed_at' => now(),
            'status' => request('status', $followUp->status)
        ]);

        return redirect()->back()
            ->with('success', 'Follow up marked as completed.');
    }

    public function destroy(FollowUp $followUp)
    {
        $this->authorize('delete', $followUp);

        $followUp->delete();

        return redirect()->back()
            ->with('success', 'Follow up deleted successfully.');
    }
}
