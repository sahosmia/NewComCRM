<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Customer;
use App\Services\CustomerService;
use App\Services\ExportService;
use App\Services\LookupService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\HandlesModalResponses;

class CustomerController extends Controller
{
    use HandlesModalResponses;

    public function __construct(
        private CustomerService $customerService,
        private LookupService $lookupService,
        private ExportService $exportService,
    ) {
    }



    public function index(Request $request)
    {
        $this->authorize('viewAny', Customer::class);
        return Inertia::render('Customers/Index', [
            'customers' => $this->customerService->paginateIndex($request->all()),
            'users' => $this->lookupService->getUsersForSelect(),
            'companies' => $this->lookupService->getCompanies(),
        ]);
    }

    public function create()
    {
        $this->authorize('create', Customer::class);
        return Inertia::render('Customers/Create', [
            'users' => $this->lookupService->getUsersForSelect(),
            'companies' => $this->lookupService->getCompanies(),
        ]);
    }

    public function store(StoreCustomerRequest $request)
    {
        $customer = $this->customerService->create($request->validated());
        $customer->load('assignedUser', 'company');
        return $this->handleResponse(
            $request,
            $customer,
            'Customer created successfully',
            'customers.index'
        );
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
            'users' => $this->lookupService->getUsersForSelect(),
            'companies' => $this->lookupService->getCompanies(),
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
        $customers = $this->customerService->getForExport($request->input('ids', []));

        return $this->exportService->excel(
            $customers,
            ['Name', 'Email', 'Phones', 'Addresses', 'Company', 'Designation', 'Type', 'Status', 'Assigned To', 'Date of Birth', 'Remarks'],
            fn($customer) => [
                $customer->name,
                $customer->email,
                $customer->phones ? implode(', ', $customer->phones) : '',
                $customer->addresses ? implode(', ', $customer->addresses) : '',
                $customer->company?->name,
                $customer->designation,
                $customer->type,
                $customer->status,
                $customer->assignedUser ? $customer->assignedUser->name : '',
                $customer->date_of_birth?->format('Y-m-d'),
                $customer->remarks,
            ],
            'customers.xlsx'
        );
    }

    public function print(Request $request)
    {
        $customers = $this->customerService->getForExport($request->input('ids', []));

        return $this->exportService->printView(
            $customers,
            ['Name', 'Email', 'Phones', 'Addresses', 'Company', 'Designation', 'Type', 'Status', 'Assigned To', 'Date of Birth', 'Remarks'],
            fn($customer) => [
                $customer->name,
                $customer->email,
                $customer->phones ? implode(', ', $customer->phones) : '',
                $customer->addresses ? implode(', ', $customer->addresses) : '',
                $customer->company?->name,
                $customer->designation,
                $customer->type,
                $customer->status,
                $customer->assignedUser ? $customer->assignedUser->name : '',
                $customer->date_of_birth?->format('Y-m-d'),
                $customer->remarks,
            ],
            'Customer List'
        );
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv',
        ]);

        try {
            $result = $this->customerService->import($request->file('file'));

            if (is_array($result) && isset($result['errors'])) {
                $errors = [];
                foreach ($result['errors'] as $failure) {
                    $errors[] = "Row {$failure->row()}: " . implode(', ', $failure->errors());
                }
                return back()->withErrors(['import_errors' => $errors]);
            }

            return back()->with('success', 'Customers imported successfully');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'An error occurred during import: ' . $e->getMessage()]);
        }
    }
}
