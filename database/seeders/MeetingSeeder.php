<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Meeting;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MeetingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          $customers = Customer::all();
        $users = User::where('role', 'user')->get();

        $types = ['physical', 'virtual', 'phone'];
        $statuses = ['scheduled', 'completed', 'cancelled'];

        // Today's meetings
        foreach (range(1, 3) as $i) {
            $startTime = Carbon::today()->setTime(rand(10, 16), 0);
            Meeting::create([
                'customer_id' => $customers->random()->id,
                'user_id' => $users->random()->id,
                'title' => 'Product Demo Meeting',
                'start_time' => $startTime,
                'end_time' => $startTime->copy()->addHours(1),
                'meeting_type' => $types[array_rand($types)],
                'location' => 'Conference Room / Zoom',
                'agenda' => 'Discuss requirements and demonstrate products',
                'status' => 'scheduled'
            ]);
        }

        // Upcoming meetings
        foreach (range(1, 8) as $i) {
            $startTime = Carbon::today()->addDays(rand(1, 7))->setTime(rand(10, 16), 0);
            Meeting::create([
                'customer_id' => $customers->random()->id,
                'user_id' => $users->random()->id,
                'title' => 'Follow-up Meeting',
                'start_time' => $startTime,
                'end_time' => $startTime->copy()->addHours(1),
                'meeting_type' => $types[array_rand($types)],
                'location' => 'Customer Office / Online',
                'agenda' => 'Review quotation and finalize order',
                'status' => 'scheduled'
            ]);
        }

        // Past meetings
        foreach (range(1, 20) as $i) {
            $startTime = Carbon::today()->subDays(rand(1, 30))->setTime(rand(10, 16), 0);
            Meeting::create([
                'customer_id' => $customers->random()->id,
                'user_id' => $users->random()->id,
                'title' => 'Initial Meeting',
                'start_time' => $startTime,
                'end_time' => $startTime->copy()->addHours(1),
                'meeting_type' => $types[array_rand($types)],
                'location' => 'Various',
                'agenda' => 'Introduction and requirement gathering',
                'status' => $statuses[array_rand(['completed', 'cancelled'])],
                'notes' => 'Customer showed interest in our products'
            ]);
        }
    }
}
