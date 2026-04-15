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
        $startTime = $this->faker->dateTimeBetween('now', '+1 month');
        $endTime = (clone $startTime)->modify('+1 hour');

        return [
            'customer_id'  => Customer::factory(),
            'user_id'      => User::factory(),
            'title'        => $this->faker->sentence(3),
            'start_time'   => $startTime,
            'end_time'     => $endTime,
            'meeting_type' => $this->faker->randomElement(['physical', 'virtual', 'phone']),
            'location'     => $this->faker->address(),
            'agenda'       => $this->faker->paragraph(),
            'notes'        => $this->faker->paragraph(),
            'status'       => $this->faker->randomElement(['scheduled', 'completed', 'cancelled']),
        ];
    }
}
