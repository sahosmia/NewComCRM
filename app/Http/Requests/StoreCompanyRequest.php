<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesCompanyAttributes;
use App\Models\Company;
use Illuminate\Foundation\Http\FormRequest;

class StoreCompanyRequest extends FormRequest
{
    use ValidatesCompanyAttributes;

    public function authorize(): bool
    {
        return true; // Allow all users to create a company. Adjust as needed.
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return $this->companyAttributeRules();
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return $this->companyAttributeMessages();
    }
}
