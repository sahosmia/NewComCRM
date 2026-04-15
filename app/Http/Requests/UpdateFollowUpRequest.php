<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesFollowUpAttributes;
use Illuminate\Foundation\Http\FormRequest;

class UpdateFollowUpRequest extends FormRequest
{
    use ValidatesFollowUpAttributes;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return $this->followUpAttributeRules();
    }

    public function messages(): array
    {
        return $this->followUpAttributeMessages();
    }
}
