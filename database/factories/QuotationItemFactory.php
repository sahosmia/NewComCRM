<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\QuotationItem>
 */
class QuotationItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'quotation_id' => \App\Models\Quotation::factory(),
            'product_id' => \App\Models\Product::factory(),
            'description' => $this->faker->sentence(),
            'quantity' => 1,
            'unit_price' => 100,
            'total' => 100,
        ];
    }
}
