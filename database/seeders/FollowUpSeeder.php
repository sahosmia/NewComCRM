<?php

namespace Database\Seeders;

use App\Models\FollowUp;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Seeder;

class FollowUpSeeder extends Seeder
{
    public function run(): void
    {
        $customers = Customer::all();
        $users = User::where('role', 'user')->get();

        if ($customers->isEmpty() || $users->isEmpty()) {
            return;
        }

        foreach ($customers as $customer) {
            FollowUp::create([
                'customer_id' => $customer->id,
                'user_id' => $customer->assigned_to,
                'follow_up_date' => now()->addDays(rand(1, 10)),
                'notes' => 'Follow up with ' . $customer->name,
                'status' => 'pending',
                'priority' => fake()->randomElement(['high', 'medium', 'low']),
            ]);

            // Add one completed follow up
            FollowUp::create([
                'customer_id' => $customer->id,
                'user_id' => $customer->assigned_to,
                'follow_up_date' => now()->subDays(rand(1, 10)),
                'notes' => 'Discussed previous requirements',
                'status' => 'done',
                'completed_at' => now()->subDays(rand(0, 1)),
                'priority' => fake()->randomElement(['high', 'medium', 'low']),
            ]);
        }
    }
}
