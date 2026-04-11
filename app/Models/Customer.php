<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Customer extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'designation',
        'company_name',
        'type',
        'phones',
        'email',
        'addresses',
        'assigned_to',
        'status',
        'remarks'
    ];

    protected $casts = [
        'status' => 'string',
        'phones' => 'array',
        'addresses' => 'array',
        'type' => 'string',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['name', 'company_name', 'type', 'email', 'status'])
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
        $primaryPhone = $this->phones[0] ?? null;
        if (!$primaryPhone) return null;

        $phone = preg_replace('/[^0-9]/', '', $primaryPhone);
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
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }
}
