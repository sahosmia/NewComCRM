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

    public function messages(): array
    {
        return $this->requirementAttributeMessages();
    }
}
