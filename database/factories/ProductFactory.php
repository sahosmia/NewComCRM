<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name'           => $this->faker->words(3, true),
            'description'    => $this->faker->sentence(),
            'category'       => $this->faker->randomElement(['Electronics', 'Cable', 'Switch', 'Accessories']),
            'stock_quantity' => $this->faker->numberBetween(10, 100),
            'unit_price'     => $this->faker->randomFloat(2, 100, 10000),
            'supplier_name'  => $this->faker->company(),
            'source'         => $this->faker->paragraph(),
            'unit_id'        => Unit::inRandomOrder()->first()?->id ?? Unit::factory(),
           
        ];
    }
}
