<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'brand',
        'model',
        'description',
        'category',
        'stock_quantity',
        'unit_price',
        'supplier_name',
        'source',
        'unit_id'
    ];

    protected $casts = [
        'unit_price' => 'decimal:2',
        'stock_quantity' => 'integer'
    ];

    // Relationships
    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function requirements()
    {
        return $this->hasMany(Requirement::class);
    }

    public function quotationItems()
    {
        return $this->hasMany(QuotationItem::class);
    }

    // Scopes
    public function scopeByBrand($query, $brand)
    {
        return $query->where('brand', $brand);
    }

    public function scopeInStock($query)
    {
        return $query->where('stock_quantity', '>', 0);
    }
}
