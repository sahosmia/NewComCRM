<?php

namespace Database\Seeders;

use App\Models\Meeting;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Seeder;

class MeetingSeeder extends Seeder
{
    public function run(): void
    {
        Meeting::flushEventListeners();

        $customers = Customer::all();
        $users = User::where('role', 'user')->get();

        if ($customers->isEmpty()) {
            return;
        }

        for ($i = 0; $i < 50; $i++) {
            $customer = $customers->random();
            $requirements = $customer->requirements;

            Meeting::factory()->create([
                'customer_id' => $customer->id,
                'user_id' => $customer->assigned_to ?? $users->random()->id,
                'requirement_id' => $requirements->isEmpty() ? null : $requirements->random()->id,
                'created_at' => $customer->created_at->addHours(rand(1, 10)),
            ]);
        }
    }
}
