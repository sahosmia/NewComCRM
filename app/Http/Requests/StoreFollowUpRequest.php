<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFollowUpRequest extends FormRequest
{
     public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'customer_id' => 'required|exists:customers,id',
            'follow_up_date' => 'required|date',
            'notes' => 'required|string',
            'status' => 'required|in:price_shared,negotiation,purchase,lost,pending,follow_up',
            'priority' => 'required|in:high,medium,low',
            'next_follow_up' => 'nullable|date|after:follow_up_date'
        ];
    }
}
