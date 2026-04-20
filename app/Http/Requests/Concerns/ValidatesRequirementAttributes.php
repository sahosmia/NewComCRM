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
            'notes'       => 'nullable|string',
            'status'       => 'nullable|string',

            'items'              => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity'   => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
        ];
    }

    /**
     * @return array<string, string>
     */
    protected function requirementAttributeMessages(): array
    {
        return [
            'customer_id.required'    => 'Please select a customer.',
            'items.required'          => 'At least one product item is required.',
            'items.array'             => 'Product items must be provided as a list.',
            'items.*.product_id.required' => 'Please select a product for all items.',
            'items.*.quantity.required'   => 'Quantity is required for all items.',
            'items.*.unit_price.required' => 'Unit price is required for all items.',
        ];
    }
}
