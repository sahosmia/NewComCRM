<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    protected $model = Customer::class;

    public function definition(): array
    {
        return [
            'name'         => $this->faker->name(),
            'designation'  => $this->faker->randomElement(['Owner', 'Manager', 'Procurement Officer', 'CEO', 'CTO']),
            'company_name' => $this->faker->company() . ' ' . $this->faker->randomElement(['Enterprise', 'Ltd', 'Group', 'Solutions']),

            // New Array Fields: Generating multiple items
            'phones'       => [
                $this->faker->numerify('01#########'),
                $this->faker->numerify('01#########'),
            ],
            'addresses'    => [
                $this->faker->address(),
                $this->faker->secondaryAddress(),
            ],

            'email'        => $this->faker->unique()->safeEmail(),
            'type'         => $this->faker->randomElement(['corporate', 'reseller', 'personal']),

            // Pro Tip: Better way to handle relationship
            'assigned_to'  => User::exists() ? User::inRandomOrder()->first()->id : 1,

            'status'       => $this->faker->randomElement(['active', 'inactive']),
            'remarks'      => $this->faker->sentence(),

            // Legacy field (if still in DB migration for fallback)
            // 'phone'     => $this->faker->numerify('01#########'),
        ];
    }

    /**
     * States for specific customer types
     */
    public function corporate(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'corporate',
        ]);
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }
}
