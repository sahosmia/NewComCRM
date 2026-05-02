<?php

namespace Database\Seeders;

use App\Models\Unit;
use Illuminate\Database\Seeder;

class UnitSeeder extends Seeder
{
    public function run(): void
    {
        $units = [
            ['title' => 'Piece', 'short_form' => 'Pcs'],
            ['title' => 'Kilogram', 'short_form' => 'KG'],
            ['title' => 'Gram', 'short_form' => 'G'],
            ['title' => 'Meter', 'short_form' => 'M'],
            ['title' => 'Box', 'short_form' => 'Box'],
            ['title' => 'Pack', 'short_form' => 'Pack'],
            ['title' => 'Set', 'short_form' => 'Set'],
            ['title' => 'Roll', 'short_form' => 'Roll'],
        ];

        foreach ($units as $unit) {
            Unit::updateOrCreate(['title' => $unit['title']], $unit);
        }
    }
}
