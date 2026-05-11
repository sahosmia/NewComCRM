<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Meeting;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MeetingFactory extends Factory
{
    protected $model = Meeting::class;

    public function definition(): array
    {
        $scheduledAt = $this->faker->dateTimeBetween('-1 month', '+1 month');

        return [
            'customer_id'  => Customer::inRandomOrder()->first()?->id ?? Customer::factory(),
            'user_id'      => User::where('role', 'user')->inRandomOrder()->first()?->id ?? User::factory(),
            'title'        => $this->faker->sentence(3),
            'scheduled_at' => $scheduledAt,
            'meeting_type' => $this->faker->randomElement(['physical', 'virtual', 'phone']),
            'location'     => $this->faker->address(),
            'agenda'       => $this->faker->paragraph(),
            'notes'        => $this->faker->paragraph(),
            'status'       => $this->faker->randomElement(['scheduled', 'completed', 'cancelled']),
        ];
    }
}
