<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesSupplierAttributes;
use Illuminate\Foundation\Http\FormRequest;

class StoreSupplierRequest extends FormRequest
{
    use ValidatesSupplierAttributes;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return $this->supplierAttributeRules();
    }

    public function messages(): array
    {
        return $this->supplierAttributeMessages();
    }
}
