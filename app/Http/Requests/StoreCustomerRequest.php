<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesCustomerAttributes;
use App\Models\Customer;
use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
{
    use ValidatesCustomerAttributes;

    public function authorize(): bool
    {
        return $this->user()->can('create', Customer::class);
    }

    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return $this->customerAttributeRules();
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return $this->customerAttributeMessages();
    }
}
