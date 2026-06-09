<?php

namespace App\Services;

use App\Repositories\UserRepository;
use App\Repositories\CustomerRepository;
use App\Repositories\ProductRepository;
use App\Repositories\UnitRepository;
use App\Repositories\RequirementRepository;
use Illuminate\Support\Collection;

class LookupService
{
    public function __construct(
        private UserRepository $users,
        private CustomerRepository $customers,
        private ProductRepository $products,
        private UnitRepository $units,
        private RequirementRepository $requirements,
        private CompanyService $companies,
    ) {}

    public function getUsersForSelect(): Collection
    {
        return $this->users->selectOptions();
    }

    public function getCustomersForSelect(): Collection
    {
        return $this->customers->selectOptions();
    }

    public function getCustomersForRequirementForm(): Collection
    {
        return $this->customers->forRequirementForm();
    }

    public function getProductsForSelect(): Collection
    {
        return $this->products->forRequirementForm();
    }

    public function getUnits(): Collection
    {
        return $this->units->all();
    }

    public function getCompanies(): Collection
    {
        return $this->companies->listAll();
    }

    public function getRequirementsForSelect(): Collection
    {
        return $this->requirements->selectOptions();
    }


}
