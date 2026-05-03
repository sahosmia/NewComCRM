<?php

namespace App\Repositories;

use App\Models\Company;

class CompanyRepository
{
    public function getAll(array $params = [])
    {
        return Company::query()
            ->when($params['search'] ?? null, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhere('website', 'like', "%{$search}%");
                });
            })
            ->when($params['sort'] ?? null, function ($query, $sort) use ($params) {
                $query->orderBy($sort, $params['direction'] ?? 'asc');
            }, function ($query) {
                $query->latest();
            })
            ->paginate($params['per_page'] ?? 10)
            ->withQueryString();
    }

    public function all()
    {
        return Company::orderBy('name')->get();
    }

    public function create(array $data)
    {
        return Company::create($data);
    }

    public function find($id)
    {
        return Company::findOrFail($id);
    }

    public function update($id, array $data)
    {
        $company = $this->find($id);
        $company->update($data);
        return $company;
    }

    public function delete($id)
    {
        $company = $this->find($id);
        return $company->delete();
    }

    public function bulkDelete(array $ids): void
    {
        $query = Company::query();

        if (!empty($ids)) {
            $query->whereIn('id', $ids);
        }

        $query->delete();
    }
}
