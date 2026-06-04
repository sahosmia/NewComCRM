<?php

namespace App\Imports;

use App\Models\Customer;
use App\Http\Requests\Concerns\ValidatesCustomerAttributes;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsFailures;

class CustomerImport implements ToModel, WithHeadingRow, WithValidation, SkipsOnFailure
{
    use Importable, SkipsFailures, ValidatesCustomerAttributes;

    public function model(array $row)
    {
        return new Customer([
            'name'          => $row['name'],
            'designation'   => $row['designation'],
            'company_id'    => $row['company_id'],
            'email'         => $row['email'],
            'date_of_birth' => $row['date_of_birth'],
            'assigned_to'   => $row['assigned_to'],
            'type'          => $row['type'] ?? 'corporate',
            'phones'        => is_string($row['phones']) ? explode(',', $row['phones']) : (array) $row['phones'],
            'addresses'     => is_string($row['addresses']) ? explode(',', $row['addresses']) : (array) $row['addresses'],
            'remarks'       => $row['remarks'],
            'status'        => $row['status'] ?? 'active',
        ]);
    }

    public function prepareForValidation($data, $index)
    {
        $data['phones'] = is_string($data['phones'] ?? '') ? explode(',', $data['phones']) : (array) ($data['phones'] ?? []);
        $data['phones'] = array_filter(array_map('trim', $data['phones']));

        $data['addresses'] = is_string($data['addresses'] ?? '') ? explode(',', $data['addresses']) : (array) ($data['addresses'] ?? []);
        $data['addresses'] = array_filter(array_map('trim', $data['addresses']));

        return $data;
    }

    public function rules(): array
    {
        $rules = $this->customerAttributeRules();
        $rules['email'] = 'required|email|max:255|unique:customers,email';
        return $rules;
    }

    // Trait requirement stubs
    protected function route($name) { return null; }
    protected function input($key) { return null; }
}
