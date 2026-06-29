<?php

namespace App\Http\Requests\Concerns;

trait ValidatesSupplierAttributes
{
    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    protected function supplierAttributeRules(): array
    {
        return [
            'name'        => 'required|string|max:255',
            'email'       => 'nullable|email|max:255',
            'phone'       => 'nullable|string|max:255',
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
        ];
    }
}
