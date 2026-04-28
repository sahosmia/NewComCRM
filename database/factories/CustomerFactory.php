<?php
namespace Database\Factories;

use App\Models\Customer;
use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    protected $model = Customer::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'designation' => $this->faker->jobTitle,
            'company_id' => Company::inRandomOrder()->first()?->id ?? Company::factory(),
            'phones' => [$this->faker->phoneNumber, $this->faker->phoneNumber],
            'email' => $this->faker->unique()->safeEmail,
            'addresses' => [$this->faker->address],
            'type' => $this->faker->randomElement(['corporate', 'reseller', 'personal']),
            'assigned_to' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'status' => $this->faker->randomElement(['active', 'inactive']),
            'remarks' => $this->faker->sentence,
        ];
    }
}
    
