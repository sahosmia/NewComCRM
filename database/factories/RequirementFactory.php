<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Product;
use App\Models\Requirement;
use Illuminate\Database\Eloquent\Factories\Factory;

class RequirementFactory extends Factory
{
    protected $model = Requirement::class;

    public function definition(): array
    {
        $unitPrice = $this->faker->randomFloat(2, 10, 1000);
        $quantity = $this->faker->numberBetween(1, 100);

        return [
            'customer_id' => Customer::factory(),
            'product_id'  => Product::factory(),
            'quantity'    => $quantity,
            'unit_price'  => $unitPrice,
            'total_price' => $quantity * $unitPrice,
            'notes'       => $this->faker->sentence(),
        ];
    }
}
