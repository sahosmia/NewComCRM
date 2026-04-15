<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesQuotationAttributes;
use Illuminate\Foundation\Http\FormRequest;

class UpdateQuotationRequest extends FormRequest
{
    use ValidatesQuotationAttributes;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return $this->quotationAttributeRules();
    }

    public function messages(): array
    {
        return $this->quotationAttributeMessages();
    }
}
