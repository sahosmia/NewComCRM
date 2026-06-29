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
            'unit_price'     => 'nullable|numeric|min:0',
            'costing_price'  => 'nullable|numeric|min:0',
            'description'    => 'nullable|string',
            'category'       => 'nullable|string|max:255',
            'stock_quantity' => 'nullable|integer|min:0',
            'supplier_id'    => 'nullable|exists:suppliers,id',
            'source'         => 'nullable|string',
            'unit_id'        => 'required|exists:units,id',
        ];
    }

    /**
     * @return array<string, string>
     */
    protected function productAttributeMessages(): array
    {
        return [
            'name.required' => 'Product name is required',
        ];
    }
}
