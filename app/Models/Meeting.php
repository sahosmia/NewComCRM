<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;


class Meeting extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id', 'user_id', 'title', 'start_time', 'end_time',
        'meeting_type', 'location', 'agenda', 'notes', 'status'
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime'
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
        return $query->whereDate('start_time', today());
    }

    public function scopeUpcoming($query)
    {
        return $query->where('start_time', '>', now())
                     ->where('status', 'scheduled');
    }

    // Accessors
    public function getDurationAttribute()
    {
        return $this->start_time->diffInMinutes($this->end_time);
    }

    public function getTypeLabelAttribute()
    {
        return self::TYPES[$this->meeting_type] ?? $this->meeting_type;
    }

    public function getStatusLabelAttribute()
    {
        return self::STATUSES[$this->status] ?? $this->status;
    }
}
