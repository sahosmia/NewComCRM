<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesCustomerAttributes;
use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
{
    use ValidatesCustomerAttributes;

    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
            return [
            'name' => 'required|string|max:255',
            'designation' => 'nullable|string|max:255',
            'company_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string',
            'assigned_to' => 'required|exists:users,id',
            'status' => 'required|in:active,inactive',
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return $this->customerAttributeMessages();
    }
}
