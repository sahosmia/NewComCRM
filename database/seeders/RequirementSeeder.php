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
            Requirement::factory()->count(rand(1, 2))->create([
                'customer_id' => $customer->id,
                'send_qutation_to' => $customer->id,
                'qutation_send_by' => $customer->assigned_to,
            ]);
        }
    }
}
