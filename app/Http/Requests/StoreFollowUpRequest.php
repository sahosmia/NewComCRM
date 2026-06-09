<?php

namespace App\Http\Requests;

use App\Http\Requests\Concerns\ValidatesFollowUpAttributes;
use App\Http\Requests\Concerns\MapsRoleBasedUserAssignment;
use App\Models\FollowUp;
use Illuminate\Foundation\Http\FormRequest;

class StoreFollowUpRequest extends FormRequest
{
    use ValidatesFollowUpAttributes, MapsRoleBasedUserAssignment;

    public function authorize(): bool
    {
        return $this->user()->can('create', FollowUp::class);
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
