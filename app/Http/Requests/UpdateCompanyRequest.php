<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesCompanyAttributes;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCompanyRequest extends FormRequest
{
    use ValidatesCompanyAttributes;

    public function authorize(): bool
    {
        return true; // Allow all users to update a company. Adjust as needed.
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
