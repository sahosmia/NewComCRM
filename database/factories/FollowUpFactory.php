<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\FollowUp;
use App\Models\User;
use Database\Factories\Concerns\HasTemporalData;
use Illuminate\Database\Eloquent\Factories\Factory;

class FollowUpFactory extends Factory
{
    use HasTemporalData;

    protected $model = FollowUp::class;

    public function definition(): array
    {
        $createdAt = $this->getRandomTemporalDate(['past_history', 'recent_history', 'current_timeline']);
        $followUpDate = $this->getRandomTemporalDate();

        return [
            'customer_id'    => Customer::factory(),
            'user_id'        => User::factory(),
            'follow_up_date' => $followUpDate,
            'notes'          => $this->faker->paragraph(),
            'status'         => $followUpDate->isPast() ? 'done' : 'pending',
            'priority'       => $this->faker->randomElement(['high', 'medium', 'low']),
            'completed_at'   => $followUpDate->isPast() ? $followUpDate : null,
            'created_at'     => $createdAt,
            'updated_at'     => $createdAt,
        ];
    }

    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'done',
            'completed_at' => now(),
        ]);
    }
}
