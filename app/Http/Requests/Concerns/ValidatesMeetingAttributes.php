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
            'start_time'   => 'required|date',
            'end_time'     => 'required|date|after:start_time',
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
            'start_time.required' => 'Start time is required',
            'end_time.required' => 'End time is required',
            'end_time.after' => 'End time must be after the start time',
            'meeting_type.required' => 'Please select a meeting type',
            'location.required_if' => 'Location is required for physical meetings',
        ];
    }
}
