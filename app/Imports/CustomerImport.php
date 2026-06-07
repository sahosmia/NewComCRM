<?php

namespace App\Imports;

use App\Models\Customer;
use App\Models\Company;
use App\Models\User;
use App\Http\Requests\Concerns\ValidatesCustomerAttributes;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsFailures;
use Maatwebsite\Excel\Concerns\WithUpserts;

class CustomerImport implements ToModel, WithHeadingRow, WithValidation, SkipsOnFailure, WithUpserts
{
    use Importable, SkipsFailures, ValidatesCustomerAttributes;

    private $companies;
    private $users;

    public function __construct()
    {
        $this->companies = Company::pluck('id', 'name');
        $this->users = User::pluck('id', 'name');
    }

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
            'phones'        => $row['phones'],
            'addresses'     => $row['addresses'],
            'remarks'       => $row['remarks'],
            'status'        => $row['status'] ?? 'active',
        ]);
    }

    public function uniqueBy()
    {
        return 'email';
    }

    public function prepareForValidation($data, $index)
    {
        // Handle aliases from export headings
        if (!isset($data['phones']) && isset($data['phone'])) {
            $data['phones'] = $data['phone'];
        }
        if (!isset($data['addresses']) && isset($data['address'])) {
            $data['addresses'] = $data['address'];
        }
        if (!isset($data['assigned_to']) && isset($data['assigned_to_name'])) {
             $data['assigned_to'] = $data['assigned_to_name'];
        }

        // Resolve Company Name to ID
        if (isset($data['company']) && !empty($data['company']) && (!isset($data['company_id']) || empty($data['company_id']))) {
            $companyName = trim($data['company']);
            $data['company_id'] = $this->companies[$companyName] ?? null;

            if (!$data['company_id']) {
                // Try case-insensitive if exact match fails
                $match = $this->companies->filter(fn($id, $name) => strtolower($name) === strtolower($companyName))->first();
                $data['company_id'] = $match;
            }
        }

        // Resolve Assigned User Name to ID
        if (isset($data['assigned_to']) && !is_numeric($data['assigned_to']) && !empty($data['assigned_to'])) {
            $userName = trim($data['assigned_to']);
            $data['assigned_to'] = $this->users[$userName] ?? null;

            if (!$data['assigned_to']) {
                $match = $this->users->filter(fn($id, $name) => strtolower($name) === strtolower($userName))->first();
                $data['assigned_to'] = $match;
            }
        }

        // Process arrays
        $data['phones'] = is_string($data['phones'] ?? '') ? explode(',', $data['phones']) : (array) ($data['phones'] ?? []);
        $data['phones'] = array_filter(array_map('trim', $data['phones']));

        $data['addresses'] = is_string($data['addresses'] ?? '') ? explode(',', $data['addresses']) : (array) ($data['addresses'] ?? []);
        $data['addresses'] = array_filter(array_map('trim', $data['addresses']));

        return $data;
    }

    public function rules(): array
    {
        $rules = $this->customerAttributeRules();
        // Since we are doing upserts, we need to adjust the unique email rule
        // However, WithUpserts handles it at the DB level usually.
        // For Laravel validation during import:
        $rules['email'] = 'required|email|max:255';
        return $rules;
    }

    // Trait requirement stubs
    protected function route($name) { return null; }
    protected function input($key) { return null; }
}
