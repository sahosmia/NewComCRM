<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Requirement;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();


        $this->call([
            UserSeeder::class,
            UnitSeeder::class,

            ProductSeeder::class,
            CustomerSeeder::class,
            FollowUpSeeder::class,
            MeetingSeeder::class,
        ]);

        Customer::factory()->count(5)->state(['status' => 'inactive'])->create();
        Requirement::factory()
            ->hasItems(3)
            ->create();
    }
}
