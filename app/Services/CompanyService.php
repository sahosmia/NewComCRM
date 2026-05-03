<?php

namespace App\Services;

use App\Repositories\CompanyRepository;

class CompanyService
{
    public function __construct(protected CompanyRepository $repository)
    {
    }

    public function getAllCompanies(array $params = [])
    {
        return $this->repository->getAll($params);
    }

    public function listAll()
    {
        return $this->repository->all();
    }

    public function createCompany(array $data)
    {
        return $this->repository->create($data);
    }

    public function getCompany($id)
    {
        return $this->repository->find($id);
    }

    public function updateCompany($id, array $data)
    {
        return $this->repository->update($id, $data);
    }

    public function deleteCompany($id)
    {
        return $this->repository->delete($id);
    }

    public function bulkDelete(array $ids): void
    {
        $this->repository->bulkDelete($ids);
    }
}
