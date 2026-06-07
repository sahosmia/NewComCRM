<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RequirementItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'requirement_id',
        'product_id',
        'quantity',
        'unit_price',
        'total_price',
        'costing_price',
        'description'
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($item) {
            $aitFactor = 1;
            $requirement = $item->requirement;
            if ($requirement && $requirement->ait_percentage > 0 && $requirement->ait_percentage < 100) {
                $aitFactor = 1 / (1 - ($requirement->ait_percentage / 100));
            }

            $item->total_price = $item->quantity * ($item->unit_price * $aitFactor);
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
