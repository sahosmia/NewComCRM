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
            'status'         => $this->faker->randomElement(['pending', 'done']),
            'priority'       => $this->faker->randomElement(['high', 'medium', 'low']),
            'completed_at'   => null,
        ];
    }

    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'completed_at' => now(),
        ]);
    }
}
