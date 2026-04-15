<?php

namespace App\Http\Requests\Concerns;

trait ValidatesProductAttributes
{
    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    protected function productAttributeRules(): array
    {
        return [
            'name'           => 'required|string|max:255',
            'brand'          => 'nullable|string|max:255',
            'unit_price'     => 'required|numeric|min:0',
            'description'    => 'nullable|string',
            'category'       => 'nullable|string|max:255',
            'stock_quantity' => 'required|integer|min:0',
        ];
    }

    /**
     * @return array<string, string>
     */
    protected function productAttributeMessages(): array
    {
        return [
            'name.required' => 'Product name is required',
            'unit_price.required' => 'Unit price is required',
            'stock_quantity.required' => 'Stock quantity is required',
        ];
    }
}
