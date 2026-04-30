<?php

namespace App\Models;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Scopes\AssignedDataScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;


#[ScopedBy([AssignedDataScope::class])]
class Quotation extends Model
{
    use HasFactory;

    protected $fillable = [
        'quotation_number', 'customer_id', 'user_id', 'quotation_date',
        'valid_until', 'subtotal', 'tax', 'discount', 'total',
        'status', 'terms_conditions', 'notes', 'pdf_path'
    ];

    protected $casts = [
        'quotation_date' => 'date',
        'valid_until' => 'date',
        'subtotal' => 'decimal:2',
        'tax' => 'decimal:2',
        'discount' => 'decimal:2',
        'total' => 'decimal:2'
    ];

    const STATUSES = [
        'draft' => 'Draft',
        'sent' => 'Sent',
        'accepted' => 'Accepted',
        'rejected' => 'Rejected',
        'expired' => 'Expired'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($quotation) {
            $quotation->quotation_number = self::generateQuotationNumber();
        });
    }

    public static function generateQuotationNumber()
    {
        $prefix = 'Q';
        $year = date('Y');
        $month = date('m');
        $lastQuotation = self::whereYear('created_at', $year)
                            ->whereMonth('created_at', $month)
                            ->orderBy('id', 'desc')
                            ->first();

        if ($lastQuotation) {
            $lastNumber = intval(substr($lastQuotation->quotation_number, -4));
            $newNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);
        } else {
            $newNumber = '0001';
        }

        return "{$prefix}{$year}{$month}{$newNumber}";
    }

    // Relationships
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(QuotationItem::class);
    }

    // Scopes
    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    public function scopeSent($query)
    {
        return $query->where('status', 'sent');
    }

    public function scopeAccepted($query)
    {
        return $query->where('status', 'accepted');
    }

    public function scopeValid($query)
    {
        return $query->where('valid_until', '>=', today())
                     ->where('status', '!=', 'expired');
    }

    // Methods
    public function generatePDF()
    {
        $pdf = Pdf::loadView('pdf.quotation', ['quotation' => $this]);
        $path = 'quotations/quotation-' . $this->quotation_number . '.pdf';
        \Storage::put('public/' . $path, $pdf->output());

        $this->update(['pdf_path' => $path]);

        return $path;
    }

    public function markAsSent()
    {
        $this->update(['status' => 'sent']);
    }

    public function isExpired()
    {
        return $this->valid_until < today();
    }
}
