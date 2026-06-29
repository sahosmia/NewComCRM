<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesMeetingAttributes;
use App\Http\Requests\Concerns\MapsRoleBasedUserAssignment;
use App\Models\Meeting;
use Illuminate\Foundation\Http\FormRequest;

class UpdateMeetingRequest extends FormRequest
{
    use ValidatesMeetingAttributes, MapsRoleBasedUserAssignment;

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
