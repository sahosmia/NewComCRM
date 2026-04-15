<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesProductAttributes;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    use ValidatesProductAttributes;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return $this->productAttributeRules();
    }

    public function messages(): array
    {
        return $this->productAttributeMessages();
    }
}
