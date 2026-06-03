<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use App\Models\Scopes\AssignedDataScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;

#[ScopedBy([AssignedDataScope::class])]
class Requirement extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'title',
        'grand_total',
        'notes',
        'status',
        'ait_percentage',
        'vat_percentage',
        'has_accessories',
        'has_installation',
        'price_validity_days',
        'delivery_time_days',
        'advance_payment',
        'before_payment',
        'after_payment',
        'delivery_location',
        'send_qutation_to',
        'qutation_send_by',
    ];

    protected $casts = [
        'grand_total' => 'decimal:2',
        'has_accessories' => 'boolean',
        'has_installation' => 'boolean',
        'ait_percentage' => 'decimal:2',
        'vat_percentage' => 'decimal:2',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(RequirementItem::class);
    }


    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function quotationRecipient(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'send_qutation_to');
    }

    public function quotationSender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'qutation_send_by');
    }

    public function accessories(): HasMany
    {
        return $this->hasMany(RequirementAccessory::class);
    }

    public function installations(): HasMany
    {
        return $this->hasMany(RequirementInstallation::class);
    }


    public function meetings(): HasMany
    {
        return $this->hasMany(Meeting::class);
    }

    public function followUps(): HasMany
    {
        return $this->hasMany(FollowUp::class);
    }
    protected $appends = ['ait_price'];

    // append
    public function getAitPriceAttribute(): float
    {
        if ($this->ait_percentage > 0 && $this->ait_percentage < 100) {
            return round($this->grand_total * ($this->ait_percentage / 100), 2);
        }
        return 0.00;
    }

    public function calculateGrandTotal(): void
    {
        $aitFactor = 1;
        if ($this->ait_percentage > 0 && $this->ait_percentage < 100) {
            $aitFactor = 1 / (1 - ($this->ait_percentage / 100));
        }

        $itemsTotal = $this->items->sum('total_price');
        $itemsCostingTotal = $this->items->sum('costing_price');

        // $accessoriesTotal = $this->has_accessories ? ($this->accessories_quantity * $this->accessories_price * $aitFactor) : 0;
        // $installationTotal = $this->has_installation ? ($this->installation_quantity * $this->installation_price * $aitFactor) : 0;

         $accessoriesTotal = $this->has_accessories ? $this->accessories->sum('total_price') : 0;
        $installationTotal = $this->has_installation ? $this->installations->sum('total_price') : 0;
        
        $subTotal = $itemsTotal + $accessoriesTotal + $installationTotal;

        $taxableAmount = ($itemsTotal - $itemsCostingTotal) + $accessoriesTotal + $installationTotal;

        // VAT/Tax (Add-on Logic): Total = Subtotal + (TaxableAmount * VAT_Percentage / 100)
        $vatAmount = $this->vat_percentage > 0 ? ($taxableAmount * ($this->vat_percentage / 100)) : 0;


        // VAT/Tax (Add-on Logic): Total = Subtotal + (Subtotal * VAT_Percentage / 100)
        // $vatAmount = $this->vat_percentage > 0 ? ($subTotal * ($this->vat_percentage / 100)) : 0;

        $this->grand_total = round($subTotal + $vatAmount, 2);
        $this->save();
    }
}
