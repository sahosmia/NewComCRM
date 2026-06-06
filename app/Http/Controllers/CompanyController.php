<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Traits\HandlesModalResponses;
use App\Services\CompanyService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    use HandlesModalResponses;
    public function __construct(protected CompanyService $service) {}

    public function index(Request $request)
    {
        return Inertia::render('Companies/Index', [
            'companies' => $this->service->getAllCompanies($request->all())
        ]);
    }

    public function create()
    {
        return Inertia::render('Companies/Create');
    }

    public function store(StoreCompanyRequest $request)
    {


        $company = $this->service->createCompany($request->validated());

        return $this->handleResponse(
            $request,
            $company,
            'Company created successfully.',
            'companies.index'
        );

    }

    public function edit($id)
    {
        return Inertia::render('Companies/Edit', [
            'company' => $this->service->getCompany($id)
        ]);
    }

    public function update(UpdateCompanyRequest $request, $id)
    {
        $this->service->updateCompany($id, $request->validated());

        return redirect()->route('companies.index')
            ->with('success', 'Company updated successfully.');
    }

    public function destroy($id)
    {
        $this->service->deleteCompany($id);

        return redirect()->route('companies.index')
            ->with('success', 'Company deleted successfully.');
    }

    public function bulkDestroy(Request $request)
    {
        $ids = $request->input('ids', []);
        $this->service->bulkDelete($ids);

        return redirect()->route('companies.index')->with('success', 'Companies deleted successfully');
    }
}
