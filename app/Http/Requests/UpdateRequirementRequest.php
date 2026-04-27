<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesRequirementAttributes;
use App\Models\Requirement;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRequirementRequest extends FormRequest
{
    use ValidatesRequirementAttributes;

    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('requirement'));
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
