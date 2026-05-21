<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesRequirementAttributes;
use App\Models\Requirement;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequirementRequest extends FormRequest
{
    use ValidatesRequirementAttributes;

    public function authorize(): bool
    {
        return $this->user()->can('create', Requirement::class);
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
    }

    public function messages(): array
    {
        return $this->requirementAttributeMessages();
    }
}
