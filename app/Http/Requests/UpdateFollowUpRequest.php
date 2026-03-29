<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFollowUpRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if ($this->input('next_follow_up') === '') {
            $this->merge(['next_follow_up' => null]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer_id' => 'required|exists:customers,id',
            'follow_up_date' => 'required|date',
            'notes' => 'required|string',
            'status' => 'required|in:price_shared,negotiation,purchase,lost,pending,follow_up',
            'priority' => 'required|in:high,medium,low',
            'next_follow_up' => 'nullable|date|after:follow_up_date',
        ];
    }
}
