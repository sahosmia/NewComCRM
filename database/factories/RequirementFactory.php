<?php
namespace Database\Factories;

use App\Models\Customer;
use App\Models\Requirement;
use App\Models\Unit;
use App\Models\User;
use Database\Factories\Concerns\HasTemporalData;
use Illuminate\Database\Eloquent\Factories\Factory;

class RequirementFactory extends Factory
{
    use HasTemporalData;

    protected $model = Requirement::class;

    public function definition(): array
    {
        $createdAt = $this->getRandomTemporalDate(['past_history', 'recent_history', 'current_timeline']);

        return [
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'customer_id' => Customer::factory(),
            'title' => $this->faker->sentence(4),
            'grand_total' => 0,
            'status' => $this->faker->randomElement(['pending', 'processing', 'purchased', 'cancel']),
            'notes' => $this->faker->paragraph(),
            'ait_percentage' => 5.00,
            'vat_percentage' => 7.50,
            'has_accessories' => false,
            'has_installation' => false,

            'price_validity_days' => 7,
            'delivery_time_days' => 3,
            'advance_payment' => 30,
            'before_payment' => 40,
            'after_payment' => 30,
            'delivery_location' => $this->faker->address(),
            'send_qutation_to' => Customer::inRandomOrder()->first()?->id ?? Customer::factory(),
            'qutation_send_by' => User::where('role', 'user')->inRandomOrder()->first()?->id ?? User::factory(),
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }
}
