<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Quotation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuotationFactory extends Factory
{
    protected $model = Quotation::class;

    public function definition(): array
    {
        return [
            'quotation_number' => 'QTN-' . $this->faker->unique()->numberBetween(1000, 9999),
            'customer_id'      => Customer::factory(),
            'user_id'          => User::factory(),
            'quotation_date'   => now()->format('Y-m-d'),
            'valid_until'      => now()->addMonth()->format('Y-m-d'),
            'subtotal'         => 0,
            'tax'              => 0,
            'discount'         => 0,
            'total'            => 0,
            'status'           => $this->faker->randomElement(['draft', 'sent', 'accepted', 'rejected', 'expired']),
            'terms_conditions' => $this->faker->paragraph(),
            'notes'            => $this->faker->sentence(),
        ];
    }
}
