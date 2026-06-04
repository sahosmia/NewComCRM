<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SettingSeeder::class,
            UnitSeeder::class,
            CompanySeeder::class,
            UserSeeder::class,
            CustomerSeeder::class,
            ProductSeeder::class,
            RequirementSeeder::class,
            FollowUpSeeder::class,
            MeetingSeeder::class,
            SaleSeeder::class,
        ]);
    }
}
