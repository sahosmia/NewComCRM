<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesUserAttributes;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    use ValidatesUserAttributes;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return $this->userAttributeRules();
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return $this->userAttributeMessages();
    }
}
