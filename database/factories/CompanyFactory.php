<?php

namespace Database\Factories;

use App\Models\Company;
use Database\Factories\Concerns\HasTemporalData;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    use HasTemporalData;

    protected $model = Company::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $createdAt = $this->getRandomTemporalDate(['past_history', 'recent_history', 'current_timeline']);

        return [
            'name' => $this->faker->unique()->company,
            'email' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->phoneNumber,
            'website' => $this->faker->url,
            'address' => $this->faker->address,
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }
}
