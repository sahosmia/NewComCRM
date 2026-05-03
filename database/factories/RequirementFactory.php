<?php
namespace Database\Factories;

use App\Models\Customer;
use App\Models\Requirement;
use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

class RequirementFactory extends Factory
{
    protected $model = Requirement::class;

    public function definition(): array
    {
        $hasAccessories = $this->faker->boolean();
        $hasInstallation = $this->faker->boolean();

        return [
            'customer_id' => Customer::factory(),
            'title' => $this->faker->sentence(4),
            'grand_total' => 0,
            'status' => $this->faker->randomElement(['pending', 'processing', 'purchased', 'cancel']),
            'notes' => $this->faker->paragraph(),
            'has_ait' => $this->faker->boolean(20),
            'ait_percentage' => 5.00,
            'has_vat' => $this->faker->boolean(20),
            'vat_percentage' => 7.50,
            'has_accessories' => $hasAccessories,
            'accessories_title' => $hasAccessories ? 'Accessories (Channel, Flaxiable pipe, Cable tie & Others)' : null,
            'accessories_quantity' => $hasAccessories ? $this->faker->numberBetween(1, 5) : 0,
            'accessories_unit_id' => $hasAccessories ? Unit::inRandomOrder()->first()?->id ?? Unit::factory() : null,
            'accessories_price' => $hasAccessories ? $this->faker->randomFloat(2, 500, 2000) : 0,
            'has_installation' => $hasInstallation,
            'installation_title' => $hasInstallation ? 'Installation Charge (Inside Dhaka) CCTV Camera' : null,
            'installation_quantity' => $hasInstallation ? $this->faker->numberBetween(1, 20) : 0,
            'installation_unit_id' => $hasInstallation ? Unit::inRandomOrder()->first()?->id ?? Unit::factory() : null,
            'installation_price' => $hasInstallation ? $this->faker->randomFloat(2, 200, 1000) : 0,
            'price_validity_days' => 7,
            'delivery_time_days' => 3,
            'advance_payment' => 50,
            'before_payment' => 50,
            'delivery_location' => $this->faker->address(),
        ];
    }
}
