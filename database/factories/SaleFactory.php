<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Requirement;
use App\Models\Sale;
use Database\Factories\Concerns\HasTemporalData;
use Illuminate\Database\Eloquent\Factories\Factory;

class SaleFactory extends Factory
{
    use HasTemporalData;

    protected $model = Sale::class;

    public function definition(): array
    {
        $createdAt = $this->getRandomTemporalDate(['past_history', 'recent_history', 'current_timeline']);

        return [
            'requirement_id' => Requirement::factory(),
            'customer_id' => Customer::factory(),
            'amount' => $this->faker->randomFloat(2, 100, 10000),
            'sale_date' => $createdAt,
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }
}
