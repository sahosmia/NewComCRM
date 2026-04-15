<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesMeetingAttributes;
use Illuminate\Foundation\Http\FormRequest;

class StoreMeetingRequest extends FormRequest
{
    use ValidatesMeetingAttributes;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return $this->meetingAttributeRules();
    }

    public function messages(): array
    {
        return $this->meetingAttributeMessages();
    }
}
