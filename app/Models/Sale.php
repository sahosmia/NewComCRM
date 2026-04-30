<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Scopes\AssignedDataScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;

#[ScopedBy([AssignedDataScope::class])]
class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'requirement_id',
        'customer_id',
        'amount',
        'sale_date',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'sale_date' => 'datetime',
    ];

    public function requirement(): BelongsTo
    {
        return $this->belongsTo(Requirement::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
