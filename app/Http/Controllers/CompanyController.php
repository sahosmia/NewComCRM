<?php

namespace App\Http\Controllers;

use App\Services\CompanyService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function __construct(protected CompanyService $service)
    {
    }

    public function index()
    {
        return Inertia::render('Companies/Index', [
            'companies' => $this->service->getAllCompanies()
        ]);
    }

    public function create()
    {
        return Inertia::render('Companies/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:companies,name',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'address' => 'nullable|string',
        ]);

        $this->service->createCompany($data);

        return redirect()->route('companies.index')
            ->with('success', 'Company created successfully.');
    }

    public function edit($id)
    {
        return Inertia::render('Companies/Edit', [
            'company' => $this->service->getCompany($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => "required|string|max:255|unique:companies,name,{$id}",
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'address' => 'nullable|string',
        ]);

        $this->service->updateCompany($id, $data);

        return redirect()->route('companies.index')
            ->with('success', 'Company updated successfully.');
    }

    public function destroy($id)
    {
        $this->service->deleteCompany($id);

        return redirect()->route('companies.index')
            ->with('success', 'Company deleted successfully.');
    }
}
