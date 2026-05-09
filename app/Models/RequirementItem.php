<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RequirementItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'requirement_id', 'product_id', 'quantity', 'unit_price', 'calculated_price', 'total_price'
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($item) {
            $aitFactor = 1;
            $requirement = $item->requirement;
            if ($requirement && $requirement->has_ait && $requirement->ait_percentage < 100) {
                $aitFactor = 1 / (1 - ($requirement->ait_percentage / 100));
            }
            $item->calculated_price = $item->unit_price * $aitFactor;
            $item->total_price = $item->quantity * $item->calculated_price;
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

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
