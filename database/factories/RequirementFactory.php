<?php
namespace Database\Factories;

use App\Models\Customer;
use App\Models\Requirement;
use Illuminate\Database\Eloquent\Factories\Factory;

class RequirementFactory extends Factory
{
    protected $model = Requirement::class;

    public function definition(): array
    {
        return [
            'customer_id' => Customer::factory(),
            'grand_total' => 0,
            'status'      => $this->faker->randomElement(['pending', 'completed', 'cancelled']),
            'notes'       => $this->faker->paragraph(),
        ];
    }
}
