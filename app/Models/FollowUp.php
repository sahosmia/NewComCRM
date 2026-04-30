<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Scopes\AssignedDataScope;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;


#[ScopedBy([AssignedDataScope::class])]
class FollowUp extends Model
{
    use HasFactory;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($followUp) {
            if (empty($followUp->user_id)) {
                $followUp->user_id = auth()->id();
            }
        });
    }

    protected $fillable = [
        'customer_id', 'user_id', 'follow_up_date', 'notes',
        'status', 'priority', 'completed_at', 'next_follow_up'
    ];

    protected $casts = [
        'follow_up_date' => 'datetime',
        'completed_at' => 'datetime',
        'next_follow_up' => 'datetime'
    ];

    const STATUSES = [
        'price_shared' => 'Price Shared',
        'negotiation' => 'Negotiation',
        'purchase' => 'Purchase',
        'lost' => 'Lost',
        'pending' => 'Pending',
        'follow_up' => 'Follow Up'
    ];

    const PRIORITIES = [
        'high' => 'High',
        'medium' => 'Medium',
        'low' => 'Low'
    ];

    // Relationships
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->whereNull('completed_at');
    }

    public function scopeCompleted($query)
    {
        return $query->whereNotNull('completed_at');
    }

    public function scopeToday($query)
    {
        return $query->whereDate('follow_up_date', today());
    }

    public function scopeUpcoming($query)
    {
        return $query->whereDate('follow_up_date', '>', today())
                     ->whereNull('completed_at');
    }

    public function scopeOverdue($query)
    {
        return $query->whereDate('follow_up_date', '<', today())
                     ->whereNull('completed_at');
    }

    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    // Accessors
    public function getIsOverdueAttribute()
    {
        return !$this->completed_at && $this->follow_up_date->isPast();
    }

    public function getStatusLabelAttribute()
    {
        return self::STATUSES[$this->status] ?? $this->status;
    }

    public function getPriorityLabelAttribute()
    {
        return self::PRIORITIES[$this->priority] ?? $this->priority;
    }
}
