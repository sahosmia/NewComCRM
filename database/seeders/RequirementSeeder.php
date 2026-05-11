<?php

namespace Database\Seeders;

use App\Models\Requirement;
use App\Models\Customer;
use Illuminate\Database\Seeder;

class RequirementSeeder extends Seeder
{
    public function run(): void
    {
        $customers = Customer::all();

        if ($customers->isEmpty()) {
            return;
        }

        foreach ($customers as $customer) {
            $requirementCount = rand(1, 2);
            for ($i = 0; $i < $requirementCount; $i++) {
                Requirement::create([
                    'customer_id' => $customer->id,
                    'title' => 'Project ' . fake()->word(),
                    'notes' => fake()->sentence(),
                    'status' => fake()->randomElement(['pending', 'processing', 'purchased']),
                    'ait_percentage' => 5,
                    'vat_percentage' => 10,
                ]);
            }
        }
    }
}
