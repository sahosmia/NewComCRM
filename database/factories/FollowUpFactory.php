<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\FollowUp;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class FollowUpFactory extends Factory
{
    protected $model = FollowUp::class;

    public function definition(): array
    {
        return [
            'customer_id'    => Customer::factory(),
            'user_id'        => User::factory(),
            'follow_up_date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'notes'          => $this->faker->paragraph(),
            'status'         => $this->faker->randomElement(['price_shared', 'negotiation', 'purchase', 'lost', 'pending', 'follow_up']),
            'priority'       => $this->faker->randomElement(['high', 'medium', 'low']),
            'completed_at'   => null,
            'next_follow_up' => null,
        ];
    }

    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'completed_at' => now(),
        ]);
    }
}
