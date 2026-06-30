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

     protected function prepareForValidation()
    {
        $this->merge([
            'stock_quantity' => $this->stock_quantity ?? 0,
            'costing_price' => $this->costing_price ?? 0,
        ]);
    }
}
