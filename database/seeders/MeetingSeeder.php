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
        $customers = Customer::all();

        if ($customers->isEmpty()) {
            return;
        }

        foreach ($customers->random(min(5, $customers->count())) as $customer) {
            $requirements = $customer->requirements;
            Meeting::factory()->count(2)->create([
                'customer_id' => $customer->id,
                'user_id' => $customer->assigned_to,
                'requirement_id' => $requirements->isEmpty() ? null : $requirements->random()->id,
            ]);
        }
    }
}
