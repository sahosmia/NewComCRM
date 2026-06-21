<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesRequirementAttributes;
use App\Http\Requests\Concerns\MapsRoleBasedUserAssignment;
use App\Models\Requirement;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRequirementRequest extends FormRequest
{
    use ValidatesRequirementAttributes, MapsRoleBasedUserAssignment;

    public function authorize(): bool
    {
        // return $this->user()->can('update', $this->route('requirement'));
        return true;
    }

    public function rules(): array
    {
        return $this->requirementAttributeRules();
    }

    protected function prepareForValidation()
    {
        if ($this->has('items')) {
            $items = $this->items;
            foreach ($items as $key => $item) {
                if (!isset($item['costing_price']) || $item['costing_price'] === '' || $item['costing_price'] === null) {
                    $items[$key]['costing_price'] = 0;
                }
            }
            $this->merge(['items' => $items]);
        }


        if ($this->has('accessories')) {
            $accessories = $this->accessories;
            foreach ($accessories as $key => $accessory) {
                if (!isset($accessory['price']) || $accessory['price'] === '' || $accessory['price'] === null) {
                    $accessories[$key]['price'] = 0;
                }
            }
            $this->merge(['accessories' => $accessories]);
        }

        if ($this->has('installations')) {
            $installations = $this->installations;
            foreach ($installations as $key => $installation) {
                if (!isset($installation['price']) || $installation['price'] === '' || $installation['price'] === null) {
                    $installations[$key]['price'] = 0;
                }
            }
            $this->merge(['installations' => $installations]);
        }

        $this->merge([
            'costing_price' => ($this->costing_price === '' || is_null($this->costing_price)) ? 0 : $this->costing_price,
            'ait_percentage' => ($this->ait_percentage === '' || is_null($this->ait_percentage)) ? 0 : $this->ait_percentage,
            'vat_percentage' => ($this->vat_percentage === '' || is_null($this->vat_percentage)) ? 0 : $this->vat_percentage,
            'delivery_time_days' => ($this->delivery_time_days === '' || is_null($this->delivery_time_days)) ? 0 : $this->delivery_time_days,
            'price_validity_days' => ($this->price_validity_days === '' || is_null($this->price_validity_days)) ? 0 : $this->price_validity_days,
        ]);
    }

    public function messages(): array
    {
        return $this->requirementAttributeMessages();
    }
}
