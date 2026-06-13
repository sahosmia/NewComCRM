<?php

namespace App\Services;

use App\Models\Customer;
use App\Repositories\CustomerRepository;
use App\Repositories\UserRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

use App\Imports\CustomerImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\DB;

class CustomerService
{
    public function __construct(
        private CustomerRepository $customers,
        private UserRepository $users,
    ) {}

    public function paginateIndex(array $filters): LengthAwarePaginator
    {

        return $this->customers->paginateForIndex($filters);
    }

    public function create(array $data): Customer
    {
        $data['phones'] = array_filter($data['phones'] ?? []);
        $data['addresses'] = array_filter($data['addresses'] ?? []);

        if (!isset($data['assigned_to']) && !auth()->user()->isSuperAdmin()) {
            $data['assigned_to'] = auth()->id();
        }

        return $this->customers->create($data);
    }

    public function update(Customer $customer, array $data): void
    {
        if (!auth()->user()->isSuperAdmin()) {
            unset($data['assigned_to']);
        }
        $this->customers->update($customer, $data);
    }

    public function bulkDelete(array $ids): void
    {
        $this->customers->bulkDelete($ids);
    }

    public function getForExport(array $ids): Collection
    {
        return $this->customers->getForExport($ids);
    }

     public function import($file)
    {
        $import = new CustomerImport();

        try {
            DB::beginTransaction();
            Excel::import($import, $file);

            if ($import->failures()->isNotEmpty()) {
                DB::rollBack();
                return ['errors' => $import->failures()];
            }

            DB::commit();
            return true;

        } catch (\Maatwebsite\Excel\Validators\ValidationException $e) {
            DB::rollBack();
            return ['errors' => $e->failures()];
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
