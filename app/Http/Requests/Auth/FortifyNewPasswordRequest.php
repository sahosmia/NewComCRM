<?php

namespace App\Http\Requests\Auth;

use App\Concerns\PasswordValidationRules;
use Illuminate\Foundation\Http\FormRequest;

class FortifyNewPasswordRequest extends FormRequest
{
    use PasswordValidationRules;

    public function authorize(): bool
    {
        return true;
    }

    /**
     * Rules for Fortify password reset (forgot password flow).
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'password' => $this->passwordRules(),
        ];
    }
}
