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

    protected $fillable = ['customer_id', 'grand_total', 'notes', 'status'];

    protected $casts = [
        'grand_total' => 'decimal:2'
    ];

    public function items(): HasMany
    {
        return $this->hasMany(RequirementItem::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function calculateGrandTotal(): void
    {
        $total = $this->items()->sum('total_price');

        $this->updateQuietly(['grand_total' => $total]);
    }

    public function generatePDF(): string
    {
        $pdf = Pdf::loadView('pdf.requirement', ['requirement' => $this->load(['customer', 'items.product'])]);
        $path = 'requirements/requirement-' . $this->id . '.pdf';
        Storage::put('public/' . $path, $pdf->output());

        return $path;
    }
}
