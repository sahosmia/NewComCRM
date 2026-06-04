<?php

namespace App\Repositories;

use App\Models\Setting;
use Illuminate\Support\Collection;

class SettingRepository
{
    /**
     * Get all settings as a key-value collection.
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return Setting::pluck('value', 'key');
    }

    /**
     * Update or create a setting by key.
     *
     * @param string $key
     * @param mixed $value
     * @return Setting
     */
    public function updateOrCreate(string $key, $value): Setting
    {
        return Setting::updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
    }
}
