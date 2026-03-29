<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use App\Services\CustomerService;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function __construct(
        private CustomerService $customerService,
    ) {}

    public function index()
    {
        return Inertia::render('customers/index', [
            'customers' => $this->customerService->paginateIndex(),
        ]);
    }

    public function create()
    {
        return Inertia::render('customers/create', [
            'users' => $this->customerService->usersForForm(),
        ]);
    }

    public function store(StoreCustomerRequest $request)
    {
        $this->customerService->create($request->validated());

        return redirect()->route('customers.index')
            ->with('success', 'Customer created successfully');
    }

    public function edit(Customer $customer)
    {
        return Inertia::render('customers/edit', [
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
        $this->customerService->delete($customer);

        return back();
    }
}
