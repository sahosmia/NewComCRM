<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Concerns\HasServiceItemCalculations;

class RequirementAccessory extends Model
{
    use HasFactory, HasServiceItemCalculations;

    protected $fillable = [
        'requirement_id',
        'title',
        'quantity',
        'unit_id',
        'price',
        'total_price',
    ];
}
