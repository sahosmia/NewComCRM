<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Quotation>
 */
class QuotationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_id' => \App\Models\Customer::factory(),
            'user_id' => \App\Models\User::factory(),
            'quotation_date' => now(),
            'valid_until' => now()->addMonth(),
            'subtotal' => 100,
            'tax' => 10,
            'discount' => 0,
            'total' => 110,
            'status' => 'draft',
        ];
    }
}
