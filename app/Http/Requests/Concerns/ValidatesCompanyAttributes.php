<?php

namespace App\Http\Requests\Concerns;

trait ValidatesCompanyAttributes
{
    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    protected function companyAttributeRules(): array
    {
        $companyId = $this->route('company') ? $this->route('company')->id : null;


        return [
            'name' => 'required|string|max:255|unique:companies,name,' . $companyId,
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'address' => 'nullable|string',
        ];
    }

    /**
     * @return array<string, string>
     */
    protected function companyAttributeMessages(): array
    {
        return [
            'name.required' => 'Company name is required',
            'email.email' => 'Please provide a valid email address',
            'phone.string' => 'Phone number must be a string',
            'website.url' => 'Please provide a valid website URL',
            'address.string' => 'Address must be a string',
        ];
    }
}




