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
        'has_ait',
        'ait_percentage',
        'has_vat',
        'vat_percentage',
        'has_accessories',
        'accessories_title',
        'accessories_quantity',
        'accessories_unit_id',
        'accessories_price',
        'has_installation',
        'installation_title',
        'installation_quantity',
        'installation_unit_id',
        'installation_price',
        'price_validity_days',
        'delivery_time_days',
        'advance_payment',
        'before_payment',
        'delivery_location',
    ];

    protected $casts = [
        'grand_total' => 'decimal:2',
        'has_ait' => 'boolean',
        'has_vat' => 'boolean',
        'has_accessories' => 'boolean',
        'has_installation' => 'boolean',
        'ait_percentage' => 'decimal:2',
        'vat_percentage' => 'decimal:2',
        'accessories_quantity' => 'decimal:2',
        'accessories_price' => 'decimal:2',
        'installation_quantity' => 'decimal:2',
        'installation_price' => 'decimal:2',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(RequirementItem::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function accessoriesUnit(): BelongsTo
    {
        return $this->belongsTo(Unit::class, 'accessories_unit_id');
    }

    public function installationUnit(): BelongsTo
    {
        return $this->belongsTo(Unit::class, 'installation_unit_id');
    }

    public function calculateGrandTotal(): void
    {
        $itemsTotal = $this->items()->sum('total_price');
        $accessoriesTotal = $this->has_accessories ? ($this->accessories_quantity * $this->accessories_price) : 0;
        $installationTotal = $this->has_installation ? ($this->installation_quantity * $this->installation_price) : 0;

        $subTotal = $itemsTotal + $accessoriesTotal + $installationTotal;

        $vatAmount = $this->has_vat ? ($subTotal * ($this->vat_percentage / 100)) : 0;
        $aitAmount = $this->has_ait ? ($subTotal * ($this->ait_percentage / 100)) : 0;

        $grandTotal = $subTotal + $vatAmount + $aitAmount;

        $this->updateQuietly(['grand_total' => $grandTotal]);
    }

    public function generatePDF(): string
    {
        $pdf = Pdf::loadView('pdf.requirement', [
            'requirement' => $this->load([
                'customer',
                'items.product.unit',
                'accessoriesUnit',
                'installationUnit'
            ])
        ]);
        $path = 'requirements/requirement-' . $this->id . '.pdf';
        Storage::put('public/' . $path, $pdf->output());

        return $path;
    }
}
