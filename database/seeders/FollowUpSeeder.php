<?php
namespace Database\Seeders;

use App\Models\FollowUp;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class FollowUpSeeder extends Seeder
{
    public function run()
    {
        $customers = Customer::all();
        $users = User::all(); // Get all users since role seeder might not have run or filtered users

        $statuses = ['pending', 'done'];
        $priorities = ['high', 'medium', 'low'];

        // Create today's follow-ups
        foreach (range(1, 5) as $i) {
            FollowUp::create([
                'customer_id' => $customers->random()->id,
                'user_id' => $users->random()->id,
                'follow_up_date' => Carbon::today()->setTime(rand(9, 17), rand(0, 59)),
                'notes' => 'Need to discuss pricing and availability',
                'status' => $statuses[array_rand($statuses)],
                'priority' => $priorities[array_rand($priorities)],
            ]);
        }

        // Create upcoming follow-ups
        foreach (range(1, 10) as $i) {
            FollowUp::create([
                'customer_id' => $customers->random()->id,
                'user_id' => $users->random()->id,
                'follow_up_date' => Carbon::today()->addDays(rand(1, 7))->setTime(rand(9, 17), rand(0, 59)),
                'notes' => 'Follow up on quotation and requirements',
                'status' => $statuses[array_rand($statuses)],
                'priority' => $priorities[array_rand($priorities)],
            ]);
        }

        // Create overdue follow-ups
        foreach (range(1, 3) as $i) {
            FollowUp::create([
                'customer_id' => $customers->random()->id,
                'user_id' => $users->random()->id,
                'follow_up_date' => Carbon::today()->subDays(rand(1, 5))->setTime(rand(9, 17), rand(0, 59)),
                'notes' => 'Customer requested call back',
                'status' => 'pending',
                'priority' => 'high',
            ]);
        }

        // Create completed follow-ups
        foreach (range(1, 15) as $i) {
            $completedAt = Carbon::today()->subDays(rand(1, 30));
            FollowUp::create([
                'customer_id' => $customers->random()->id,
                'user_id' => $users->random()->id,
                'follow_up_date' => $completedAt->copy()->subDays(rand(1, 5)),
                'completed_at' => $completedAt,
                'notes' => 'Discussion completed, customer interested',
                'status' => 'done',
                'priority' => $priorities[array_rand($priorities)],
            ]);
        }
    }
}
