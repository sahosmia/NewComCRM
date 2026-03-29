<?php

namespace App\Actions\Fortify;

use App\Http\Requests\Auth\FortifyNewPasswordRequest;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\ResetsUserPasswords;

class ResetUserPassword implements ResetsUserPasswords
{
    /**
     * Validate and reset the user's forgotten password.
     *
     * @param  array<string, string>  $input
     */
    public function reset(User $user, array $input): void
    {
        Validator::make($input, (new FortifyNewPasswordRequest)->rules())->validate();

        $user->forceFill([
            'password' => $input['password'],
        ])->save();
    }
}
