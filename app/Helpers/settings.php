<?php

use App\Models\Setting;
use Illuminate\Support\Facades\Cache;

if (!function_exists('setting')) {
    /**
     * Get setting value by key with optimized global caching and auto-casting.
     *
     * @param string|null $key
     * @param mixed $default
     * @return mixed
     */
    function setting(?string $key = null, $default = null)
    {
        $settings = Cache::rememberForever('settings.all', function () {
            return Setting::pluck('value', 'key');
        });

        if (is_null($key)) {
            return app(Setting::class);
        }

        $value = $settings->get($key);

        if (is_null($value)) {
            return $default;
        }

        // Auto-cast numeric strings to integers if applicable
        if (is_string($value) && is_numeric($value) && (string)(int)$value === $value) {
            return (int)$value;
        }

        return $value;
    }
}
