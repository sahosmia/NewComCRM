<?php
namespace Database\Factories;

use App\Models\Customer;
use App\Models\Company;
use App\Models\User;
use Database\Factories\Concerns\HasTemporalData;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    use HasTemporalData;

    protected $model = Customer::class;

    public function definition()
    {
        $createdAt = $this->getRandomTemporalDate(['past_history', 'recent_history', 'current_timeline']);

        return [
            'name' => $this->faker->name,
            'designation' => $this->faker->jobTitle,
            'company_id' => Company::inRandomOrder()->first()?->id,
            'phones' => [$this->faker->phoneNumber, $this->faker->phoneNumber],
            'email' => $this->faker->unique()->safeEmail,
            'addresses' => [$this->faker->address, $this->faker->address],
            'type' => $this->faker->randomElement(['corporate', 'reseller', 'personal']),
            'assigned_to' => User::where('role', 'user')->inRandomOrder()->first()?->id ?? User::factory(),
            'status' => $this->faker->randomElement(['active', 'inactive']),
            'remarks' => $this->faker->sentence,
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }
}
