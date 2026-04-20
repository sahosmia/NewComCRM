<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RequirementItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'requirement_id', 'product_id', 'quantity', 'unit_price', 'total_price'
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($item) {
            $item->total_price = $item->quantity * $item->unit_price;
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
