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
            ['title' => 'Meter', 'short_form' => 'Mtr'],
            ['title' => 'Gram', 'short_form' => 'G'],
            ['title' => 'Box', 'short_form' => 'Box'],
            ['title' => 'Pack', 'short_form' => 'Pack'],
            ['title' => 'Set', 'short_form' => 'Set'],
            ['title' => 'Roll', 'short_form' => 'Roll'],
            ['title' => 'Litre', 'short_form' => 'Ltr'],
            ['title' => 'Inch', 'short_form' => 'Inch'],
            ['title' => 'Feet', 'short_form' => 'Ft'],
        ];

        foreach ($units as $unit) {
            Unit::updateOrCreate(['short_form' => $unit['short_form']], $unit);
        }
    }
}
