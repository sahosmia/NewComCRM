<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Meeting extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id', 'user_id', 'title', 'scheduled_at',
        'meeting_type', 'location', 'agenda', 'notes', 'status'
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
    ];

    const TYPES = [
        'physical' => 'Physical',
        'virtual' => 'Virtual',
        'phone' => 'Phone Call'
    ];

    const STATUSES = [
        'scheduled' => 'Scheduled',
        'completed' => 'Completed',
        'cancelled' => 'Cancelled'
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
    public function scopeScheduled($query)
    {
        return $query->where('status', 'scheduled');
    }

    public function scopeToday($query)
    {
        return $query->whereDate('scheduled_at', today());
    }

    public function scopeUpcoming($query)
    {
        return $query->where('scheduled_at', '>', now())
                     ->where('status', 'scheduled');
    }

    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    // Accessors
    public function getTypeLabelAttribute()
    {
        return self::TYPES[$this->meeting_type] ?? $this->meeting_type;
    }

    public function getStatusLabelAttribute()
    {
        return self::STATUSES[$this->status] ?? $this->status;
    }
}
