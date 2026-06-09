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
            'user_id'        => 'nullable|exists:users,id',
            'customer_id'    => 'required|exists:customers,id',
            'requirement_id' => 'nullable|exists:requirements,id',
            'follow_up_date' => 'required|date',
            'notes'          => 'nullable|string',
            'status'         => 'required|in:pending,done',
            'priority'       => 'required|in:high,medium,low',
            'completed_at'   => 'nullable|date',
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
            'status.required' => 'Please select a status',
            'priority.required' => 'Please select a priority',
        ];
    }
}
