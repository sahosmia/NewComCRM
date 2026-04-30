<?php

namespace App\Http\Requests\Concerns;

use Illuminate\Validation\Rules\Password;

trait ValidatesUserAttributes
{
    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    protected function userAttributeRules(): array
    {
        $userId = $this->route('user') ? $this->route('user')->id : null;

        return [
            'name'     => 'required|string|max:255',
            'email'    => "required|email|max:255|unique:users,email,{$userId}",
            'role'      => 'required|in:super_admin,user',
            'password'  => $this->isMethod('post')
                ? ['required', Password::defaults()]
                : ['nullable', Password::defaults()],
            'signature' => 'nullable|image|max:2048',
        ];
    }

    /**
     * @return array<string, string>
     */
    protected function userAttributeMessages(): array
    {
        return [
            'name.required' => 'User name is required',
            'email.required' => 'Email address is required',
            'email.unique' => 'This email is already registered',
            'role.required' => 'Please select a role for the user',
        ];
    }
}
