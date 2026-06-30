<?php

namespace App\Http\Requests\Concerns;

trait ValidatesSupplierAttributes
{
    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    protected function supplierAttributeRules(): array
    {
        $supplierId = $this->route('supplier') ? $this->route('supplier')->id : null;

        return [
            'name'        => 'required|string|max:255',
            'email'       => 'nullable|email|max:255',
            'phone'       => [
                'nullable',
                'string',
                'regex:/^01[3-9]\d{8}$/',
                "unique:suppliers,phone,{$supplierId}"
            ],
            'address'     => 'nullable|string',
            'description' => 'nullable|string',
        ];
    }

    /**
     * @return array<string, string>
     */
    protected function supplierAttributeMessages(): array
    {
        return [
            'name.required' => 'Supplier name is required',
            'phone.regex'   => 'The phone number must be a valid 11-digit BD number (e.g., 01712345678).',
            'phone.unique'  => 'This phone number has already been taken.',
        ];
    }
}
