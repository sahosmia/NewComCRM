<?php

namespace App\Http\Requests\Concerns;

trait ValidatesMeetingAttributes
{
    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    protected function meetingAttributeRules(): array
    {
        return [
            'customer_id'  => 'required|exists:customers,id',
            'title'        => 'required|string|max:255',
            'scheduled_at' => 'required|date',
            'meeting_type' => 'required|in:physical,virtual,phone',
            'location'     => 'required_if:meeting_type,physical|nullable|string|max:255',
            'agenda'       => 'nullable|string',
            'notes'        => 'nullable|string',
            'status'       => 'required|in:scheduled,completed,cancelled',
        ];
    }

    /**
     * @return array<string, string>
     */
    protected function meetingAttributeMessages(): array
    {
        return [
            'customer_id.required' => 'Please select a customer for the meeting',
            'title.required' => 'Meeting title is required',
            'scheduled_at.required' => 'Schedule date time is required',
            'meeting_type.required' => 'Please select a meeting type',
            'location.required_if' => 'Location is required for physical meetings',
        ];
    }
}
