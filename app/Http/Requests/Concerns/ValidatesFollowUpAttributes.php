<?php

namespace App\Http\Requests\Concerns;

trait ValidatesFollowUpAttributes
{
    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    protected function followUpAttributeRules(): array
    {
        return [
            'customer_id'    => 'required|exists:customers,id',
            'follow_up_date' => 'required|date',
            'notes'          => 'required|string',
            'status'         => 'required|in:pending,done',
            'priority'       => 'required|in:high,medium,low',
            'completed_at'   => 'nullable|date',
            'next_follow_up' => 'nullable|date|after:follow_up_date',
        ];
    }

    /**
     * @return array<string, string>
     */
    protected function followUpAttributeMessages(): array
    {
        return [
            'customer_id.required' => 'Please select a customer',
            'follow_up_date.required' => 'Follow up date is required',
            'notes.required' => 'Notes are required',
            'status.required' => 'Please select a status',
            'priority.required' => 'Please select a priority',
        ];
    }
}
