<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name'           => $this->faker->words(3, true),
            'brand'          => $this->faker->company(),
            'model'          => $this->faker->bothify('MODEL-####??'),
            'description'    => $this->faker->sentence(),
            'category'       => $this->faker->randomElement(['Electronics', 'Cable', 'Switch', 'Accessories']),
            'stock_quantity' => $this->faker->numberBetween(0, 100),
            'unit_price'     => $this->faker->randomFloat(2, 10, 50000),
            'supplier_name'  => $this->faker->name(),
            'source'         => $this->faker->paragraph(),
            'unit_id'        => \App\Models\Unit::factory(),
        ];
    }

    /**
     * State for out of stock products
     */
    public function outOfStock(): static
    {
        return $this->state(fn(array $attributes) => [
            'stock_quantity' => 0,
        ]);
    }

    /**
     * State for in stock products
     */
    public function inStock(): static
    {
        return $this->state(fn(array $attributes) => [
            'stock_quantity' => $this->faker->numberBetween(1, 100),
        ]);
    }
}
