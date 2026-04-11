<?php

namespace App\Http\Requests\Concerns;

trait ValidatesCustomerAttributes
{
    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    protected function customerAttributeRules(): array
    {
        $customerId = $this->route('customer') ? $this->route('customer')->id : null;
        return [
            'name' => 'required|string|max:255',
            'designation' => 'nullable|string|max:255',
            'company_name' => 'required|string|max:255',
            'email' => "nullable|email|max:255|unique:customers,email,{$customerId}",
            'type'        => 'required|in:corporate,reseller,personal',
            'phones'      => 'nullable|array',
            'phones.*'    => 'nullable|string|max:20',
            'addresses'   => 'nullable|array',
            'addresses.*' => 'nullable|string',
            'remarks'     => 'nullable|string',
            'designation' => 'nullable|string|max:255',
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
