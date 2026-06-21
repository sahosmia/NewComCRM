<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesFollowUpAttributes;
use App\Http\Requests\Concerns\MapsRoleBasedUserAssignment;
use App\Models\FollowUp;
use Illuminate\Foundation\Http\FormRequest;

class UpdateFollowUpRequest extends FormRequest
{
    use ValidatesFollowUpAttributes, MapsRoleBasedUserAssignment;

    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('follow_up'));
        // return true;
    }

    public function rules(): array
    {
        return $this->followUpAttributeRules();
    }

    public function messages(): array
    {
        return $this->followUpAttributeMessages();
    }
}
