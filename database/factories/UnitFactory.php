<?php

namespace Database\Factories;

use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

class UnitFactory extends Factory
{
    protected $model = Unit::class;

    public function definition(): array
    {
        $units = [
            ['title' => 'Kilogram', 'short_form' => 'KG'],
            ['title' => 'Litre', 'short_form' => 'Ltr'],
            ['title' => 'Piece', 'short_form' => 'Pcs'],
            ['title' => 'Meter', 'short_form' => 'm'],
            ['title' => 'Packet', 'short_form' => 'Pkt'],
        ];

        static $index = 0;

        if ($index < count($units)) {
            $unit = $units[$index++];
        } else {
            $unit = [
                'title' => $this->faker->unique()->word() . ' ' . $this->faker->numberBetween(1, 100),
                'short_form' => $this->faker->lexify('???'),
            ];
        }

        return [
            'title' => $unit['title'],
            'short_form' => $unit['short_form'],
        ];
    }
}
