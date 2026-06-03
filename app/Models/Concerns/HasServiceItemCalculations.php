<?php

namespace App\Models\Concerns;

use App\Models\Requirement;
use App\Models\Unit;

trait HasServiceItemCalculations
{
    protected static function bootHasServiceItemCalculations()
    {
        static::saving(function ($item) {
            $aitFactor = 1;
            $requirement = $item->requirement;
            if ($requirement && $requirement->ait_percentage > 0 && $requirement->ait_percentage < 100) {
                $aitFactor = 1 / (1 - ($requirement->ait_percentage / 100));
            }
            $item->total_price = $item->quantity * ($item->price * $aitFactor);
        });

        static::saved(function ($item) {
            $item->requirement->calculateGrandTotal();
        });

        static::deleted(function ($item) {
            $item->requirement->calculateGrandTotal();
        });
    }

    public function requirement()
    {
        return $this->belongsTo(Requirement::class);
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }
}
