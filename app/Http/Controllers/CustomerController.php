<?php
namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\User;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $customers = Customer::with('assignedUser')
            ->when(!$user->isSuperAdmin(), function ($query) use ($user) {
                return $query->where('assigned_to', $user->id);
            })
            ->when($request->search, function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('company_name', 'like', "%{$search}%")
                      ->orWhere('phone', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($request->status, function ($query, $status) {
                return $query->where('status', $status);
            })
            ->when($request->assigned_to, function ($query, $assignedTo) {
                return $query->where('assigned_to', $assignedTo);
            })
            ->orderBy($request->sort_field ?? 'created_at', $request->sort_direction ?? 'desc')
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        $users = User::where('role', 'user')->get();

        return Inertia::render('Customers/Index', [
            'customers' => $customers,
            'users' => $users,
            'filters' => $request->only(['search', 'status', 'assigned_to', 'sort_field', 'sort_direction']),
        ]);
    }

    public function create()
    {
        $users = User::where('role', 'user')->get();

        return Inertia::render('Customers/Create', [
            'users' => $users
        ]);
    }

    public function store(StoreCustomerRequest $request)
    {
        $customer = Customer::create($request->validated());

        return redirect()->route('customers.index')
            ->with('success', 'Customer created successfully.');
    }

    public function show(Customer $customer)
    {
        $this->authorize('view', $customer);

        $customer->load(['assignedUser', 'requirements.product', 'followUps.user', 'meetings']);

        return Inertia::render('Customers/Show', [
            'customer' => $customer
        ]);
    }

    public function edit(Customer $customer)
    {
        $this->authorize('update', $customer);

        $users = User::where('role', 'user')->get();

        return Inertia::render('Customers/Edit', [
            'customer' => $customer,
            'users' => $users
        ]);
    }

    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $this->authorize('update', $customer);

        $customer->update($request->validated());

        return redirect()->route('customers.index')
            ->with('success', 'Customer updated successfully.');
    }

    public function destroy(Customer $customer)
    {
        $this->authorize('delete', $customer);

        $customer->delete();

        return redirect()->route('customers.index')
            ->with('success', 'Customer deleted successfully.');
    }

    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:customers,id'
        ]);

        Customer::whereIn('id', $request->ids)->delete();

        return redirect()->route('customers.index')
            ->with('success', 'Customers deleted successfully.');
    }

    public function export(Request $request)
    {
        // Implement Excel export
    }

    public function import(Request $request)
    {
        // Implement Excel import
    }
}
