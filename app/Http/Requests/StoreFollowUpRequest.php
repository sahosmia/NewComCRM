<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesFollowUpAttributes;
use Illuminate\Foundation\Http\FormRequest;

class StoreFollowUpRequest extends FormRequest
{
    use ValidatesFollowUpAttributes;

    public function authorize(): bool
    {
        return $this->user()->can('create', \App\Models\FollowUp::class);
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
