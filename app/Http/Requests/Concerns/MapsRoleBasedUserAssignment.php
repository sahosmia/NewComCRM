<?php

namespace App\Http\Requests\Concerns;

trait MapsRoleBasedUserAssignment
{
    protected function passedValidation(): void
    {
        if (!auth()->user()?->isSuperAdmin()) {
            $this->merge([
                'user_id' => auth()->id(),
            ]);
        }
    }

    public function validated($key = null, $default = null)
    {
        if ($key) {
            if ($key === 'user_id' && !auth()->user()?->isSuperAdmin()) {
                return auth()->id();
            }
            return parent::validated($key, $default);
        }

        $validated = parent::validated();

        if (!auth()->user()?->isSuperAdmin()) {
            $validated['user_id'] = auth()->id();
        } elseif ($this->filled('user_id')) {
            $validated['user_id'] = (int) $this->input('user_id');
        }

        return $validated;
    }
}
