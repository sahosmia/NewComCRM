<?php

namespace Database\Seeders;

use App\Models\Requirement;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Seeder;

class RequirementSeeder extends Seeder
{
    public function run(): void
    {
        Requirement::flushEventListeners();

        $customers = Customer::all();
        $users = User::where('role', 'user')->get();

        if ($customers->isEmpty()) {
            return;
        }

        // Generate 1000 requirements
        // 600 will be 'purchased' to satisfy the Sale requirement
        for ($i = 0; $i < 600; $i++) {
            $customer = $customers->random();
            Requirement::factory()->create([
                'customer_id' => $customer->id,
                'send_qutation_to' => $customer->id,
                'qutation_send_by' => $customer->assigned_to ?? $users->random()->id,
                'status' => 'purchased',
                'created_at' => $customer->created_at->addHours(rand(1, 24)),
            ]);
        }

        for ($i = 0; $i < 400; $i++) {
            $customer = $customers->random();
            Requirement::factory()->create([
                'customer_id' => $customer->id,
                'send_qutation_to' => $customer->id,
                'qutation_send_by' => $customer->assigned_to ?? $users->random()->id,
                'created_at' => $customer->created_at->addHours(rand(1, 24)),
            ]);
        }
    }
}
