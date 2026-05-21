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
                if (isset($item['costing_price']) && $item['costing_price'] === '') {
                    $items[$key]['costing_price'] = null;
                }
            }
            $this->merge(['items' => $items]);
        }

        if ($this->has('costing_price') && $this->costing_price === '') {
            $this->merge(['costing_price' => null]);
        }
    }

    public function messages(): array
    {
        return $this->requirementAttributeMessages();
    }
}
