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
            'title'       => 'required|string|max:255',
            'notes'       => 'nullable|string',
            'status'      => 'nullable|string',

            'ait_percentage' => 'required|numeric|min:0',
            'vat_percentage' => 'required|numeric|min:0',

            'has_accessories' => 'nullable|boolean',
            'accessories' => 'required_if:has_accessories,true|array|min:1',
            'accessories.*.title' => 'required_if:has_accessories,true|string|max:255',
            'accessories.*.quantity' => 'required_if:has_accessories,true|integer|min:1',
            'accessories.*.unit_id' => 'required_if:has_accessories,true|exists:units,id',
            'accessories.*.price' => 'required_if:has_accessories,true|numeric|min:0',

            'has_installation' => 'nullable|boolean',
            'installations' => 'required_if:has_installation,true|array|min:1',
            'installations.*.title' => 'required_if:has_installation,true|string|max:255',
            'installations.*.quantity' => 'required_if:has_installation,true|integer|min:1',
            'installations.*.unit_id' => 'required_if:has_installation,true|exists:units,id',
            'installations.*.price' => 'required_if:has_installation,true|numeric|min:0',

            'price_validity_days' => 'required|integer|min:0',
            'delivery_time_days'  => 'required|integer|min:0',
            'advance_payment'     => 'required|integer|min:0|max:100',
            'before_payment'      => 'nullable|integer|min:0|max:100',
            'after_payment'       => 'nullable|integer|min:0|max:100',
            'delivery_location'   => 'nullable|string|max:255',
            'send_qutation_to'    => 'nullable|exists:customers,id',
            'qutation_send_by'    => 'nullable|exists:users,id',
            'items'                 => 'required|array|min:1',
            'items.*.product_id'    => 'required|exists:products,id',
            'items.*.quantity'      => 'required|integer|min:1',
            'items.*.unit_price'    => 'required|numeric|min:0',

            'items.*.costing_price' => 'nullable|numeric|min:0',
            'items.*.description'   => 'nullable|string',
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
