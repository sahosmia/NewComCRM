<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Requirement;
use App\Models\Sale;
use Illuminate\Database\Eloquent\Factories\Factory;

class SaleFactory extends Factory
{
    protected $model = Sale::class;

    public function definition(): array
    {
        return [
            'requirement_id' => Requirement::factory(),
            'customer_id' => Customer::factory(),
            'amount' => $this->faker->randomFloat(2, 100, 10000),
            'sale_date' => now(),
        ];
    }
}
