<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Meeting;
use App\Models\User;
use Database\Factories\Concerns\HasTemporalData;
use Illuminate\Database\Eloquent\Factories\Factory;

class MeetingFactory extends Factory
{
    use HasTemporalData;

    protected $model = Meeting::class;

    public function definition(): array
    {
        $createdAt = $this->getRandomTemporalDate(['past_history', 'recent_history', 'current_timeline']);
        $scheduledAt = $this->getRandomTemporalDate();

        return [
            'customer_id'  => Customer::inRandomOrder()->first()?->id ?? Customer::factory(),
            'user_id'      => User::where('role', 'user')->inRandomOrder()->first()?->id ?? User::factory(),
            'title'        => $this->faker->sentence(3),
            'scheduled_at' => $scheduledAt,
            'meeting_type' => $this->faker->randomElement(['physical', 'virtual', 'phone']),
            'location'     => $this->faker->address(),
            'agenda'       => $this->faker->paragraph(),
            'notes'        => $this->faker->paragraph(),
            'status'       => $scheduledAt->isPast() ? 'completed' : 'scheduled',
            'created_at'   => $createdAt,
            'updated_at'   => $createdAt,
        ];
    }
}
