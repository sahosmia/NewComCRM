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
        FollowUp::flushEventListeners();

        $customers = Customer::all();
        $users = User::where('role', 'user')->get();

        if ($customers->isEmpty() || $users->isEmpty()) {
            return;
        }

        for ($i = 0; $i < 50; $i++) {
            $customer = $customers->random();
            $requirements = $customer->requirements;
            $requirementId = $requirements->isEmpty() ? null : $requirements->random()->id;

            FollowUp::factory()->create([
                'customer_id' => $customer->id,
                'user_id' => $customer->assigned_to ?? $users->random()->id,
                'requirement_id' => $requirementId,
                'created_at' => $customer->created_at->addHours(rand(1, 10)),
            ]);
        }
    }
}
