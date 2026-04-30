<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use App\Models\User;
use App\Services\CustomerService;
use App\Services\CompanyService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Exports\GeneralExport;
use Maatwebsite\Excel\Facades\Excel;

class CustomerController extends Controller
{
    public function __construct(
        private CustomerService $customerService,
        private CompanyService $companyService,
    ) {}



    public function index(Request $request)
    {
        $this->authorize('viewAny', Customer::class);
        return Inertia::render('Customers/Index', [
            'customers' => $this->customerService->paginateIndex($request->all()),
            'users' => $this->customerService->usersForForm(),
            'companies' => $this->companyService->listAll(),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Customer::class);
        return Inertia::render('Customers/Create', [
            'users' => $this->customerService->usersForForm(),
            'companies' => $this->companyService->listAll(),
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
            'companies' => $this->companyService->listAll(),
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

      public function updateStatus(Request $request, Customer $customer)
    {
        $this->authorize('update', $customer);

        $validated = $request->validate([
            'status' => 'required|string|in:active,inactive',
        ]);

        $customer->update(['status' => $validated['status']]);

        return back()->with('success', 'Customer status updated successfully');
    }

    public function bulkDestroy(Request $request)
    {
        $ids = $request->input('ids', []);
        $this->customerService->bulkDelete($ids);

        return back()->with('success', 'Customers deleted successfully');
    }

    public function export(Request $request)
    {
        $ids = $request->input('ids', []);

        $query = Customer::query()->with('company', 'assignedUser');

        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }

        $customers = $query->get();

        return Excel::download(new GeneralExport(
            $customers,
            ['Name', 'Email', 'Company', 'Designation', 'Type', 'Status', 'Assigned To'],
            function ($customer) {
                return [
                    $customer->name,
                    $customer->email,
                    $customer->company?->name,
                    $customer->designation,
                    $customer->type,
                    $customer->status,
                    $customer->assignedUser ? $customer->assignedUser->name : '',
                ];
            }
        ), 'customers.xlsx');
    }

    public function print(Request $request)
    {
        $ids = $request->input('ids', []);
        $query = Customer::query()->with('company', 'assignedUser');
        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }
        $customers = $query->get();

        $data = $customers->map(function($customer) {
            return [
                $customer->name,
                $customer->email,
                $customer->company?->name,
                $customer->designation,
                $customer->type,
                $customer->status,
                $customer->assignedUser ? $customer->assignedUser->name : '',
            ];
        });

        return view('print.general', [
            'title' => 'Customer List',
            'headings' => ['Name', 'Email', 'Company', 'Designation', 'Type', 'Status', 'Assigned To'],
            'data' => $data
        ]);
    }
}
