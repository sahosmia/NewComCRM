<?php

namespace App\Http\Requests\Concerns;

trait ValidatesRequirementAttributes
{
    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    protected function requirementAttributeRules(): array
    {
        return [
            'customer_id' => 'required|exists:customers,id',
            'product_id'  => 'required|exists:products,id',
            'quantity'    => 'required|integer|min:1',
            'unit_price'  => 'required|numeric|min:0',
            'total_price' => 'required|numeric|min:0',
            'notes'       => 'nullable|string',
        ];
    }

    /**
     * @return array<string, string>
     */
    protected function requirementAttributeMessages(): array
    {
        return [
            'customer_id.required' => 'Please select a customer',
            'product_id.required' => 'Please select a product',
            'quantity.required' => 'Quantity is required',
            'unit_price.required' => 'Unit price is required',
        ];
    }
}
