<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Customer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'designation', 'company_name', 'phone',
        'email', 'address', 'assigned_to', 'status'
    ];

    protected $casts = [
        'status' => 'string'
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['name', 'company_name', 'phone', 'email', 'status'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    // Relationships
    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function requirements()
    {
        return $this->hasMany(Requirement::class);
    }

    public function followUps()
    {
        return $this->hasMany(FollowUp::class);
    }

    public function meetings()
    {
        return $this->hasMany(Meeting::class);
    }

    public function quotations()
    {
        return $this->hasMany(Quotation::class);
    }

    // Accessors
    public function getWhatsAppLinkAttribute()
    {
        $phone = preg_replace('/[^0-9]/', '', $this->phone);
        return "https://wa.me/{$phone}";
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeAssignedTo($query, $userId)
    {
        return $query->where('assigned_to', $userId);
    }
}
