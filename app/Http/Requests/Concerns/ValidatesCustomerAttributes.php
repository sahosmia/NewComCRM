<?php

namespace App\Http\Requests\Concerns;

trait ValidatesCustomerAttributes
{
    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    protected function customerAttributeRules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'designation' => 'nullable|string|max:255',
            'company_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'assigned_to' => 'required|exists:users,id',
            'status' => 'required|in:active,inactive',
        ];
    }

    /**
     * @return array<string, string>
     */
    protected function customerAttributeMessages(): array
    {
        return [
            'name.required' => 'Customer name is required',
            'company_name.required' => 'Company name is required',
            'phone.required' => 'Phone number is required',
            'assigned_to.required' => 'Please assign this customer to a user',
        ];
    }
}
