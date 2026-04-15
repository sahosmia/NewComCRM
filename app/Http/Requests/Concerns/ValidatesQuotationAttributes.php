<?php

namespace App\Http\Requests\Concerns;

trait ValidatesQuotationAttributes
{
    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    protected function quotationAttributeRules(): array
    {
        return [
            'customer_id'      => 'required|exists:customers,id',
            'quotation_date'   => 'required|date',
            'valid_until'      => 'required|date|after_or_equal:quotation_date',
            'subtotal'         => 'required|numeric|min:0',
            'tax'              => 'required|numeric|min:0',
            'discount'         => 'required|numeric|min:0',
            'total'            => 'required|numeric|min:0',
            'status'           => 'required|in:draft,sent,accepted,rejected,expired',
            'terms_conditions' => 'nullable|string',
            'notes'            => 'nullable|string',
            'items'            => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity'   => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.total'      => 'required|numeric|min:0',
            'items.*.description' => 'required|string|max:255',
        ];
    }

    /**
     * @return array<string, string>
     */
    protected function quotationAttributeMessages(): array
    {
        return [
            'customer_id.required' => 'Please select a customer',
            'quotation_date.required' => 'Quotation date is required',
            'valid_until.required' => 'Validity date is required',
            'items.required' => 'At least one item is required',
        ];
    }
}
