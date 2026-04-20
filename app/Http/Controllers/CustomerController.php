<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use App\Models\User;
use App\Services\CustomerService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function __construct(
        private CustomerService $customerService,
    ) {}



    public function index(Request $request)
    {
        $this->authorize('viewAny', Customer::class);
        return Inertia::render('Customers/Index', [
            'customers' => $this->customerService->paginateIndex($request->all()),
            'users' => $this->customerService->usersForForm(),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Customer::class);
        return Inertia::render('Customers/Create', [
            'users' => $this->customerService->usersForForm(),
        ]);
    }

    public function store(StoreCustomerRequest $request)
    {
        $this->customerService->create($request->validated());

        return redirect()->route('customers.index')
            ->with('success', 'Customer created successfully');
    }

    public function show(Customer $customer)
    {
        $this->authorize('view', $customer);
        return Inertia::render('Customers/Show', [
            'customer' => $customer->load(['assignedUser', 'requirements', 'followUps', 'meetings']),
        ]);
    }

    public function edit(Customer $customer)
    {
        $this->authorize('update', $customer);
        return Inertia::render('Customers/Edit', [
            'customer' => $customer,
            'users' => $this->customerService->usersForForm(),
        ]);
    }

    public function update(UpdateCustomerRequest $request, Customer $customer)
    {

        $this->customerService->update($customer, $request->validated());

        return redirect()->route('customers.index')
            ->with('success', 'Customer updated successfully');
    }

    public function destroy(Customer $customer)
    {
        $this->authorize('delete', $customer);
        $customer->delete();
        return back()->with('success', 'Customer deleted successfully!');
    }

    public function bulkDestroy(Request $request)
    {
        $ids = $request->input('ids', []);
        $this->customerService->bulkDelete($ids);

        return back()->with('success', 'Customers deleted successfully');
    }
}
