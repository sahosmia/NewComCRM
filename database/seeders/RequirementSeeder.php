<?php

namespace Database\Seeders;

use App\Models\Requirement;
use App\Models\RequirementItem;
use Illuminate\Database\Seeder;

class RequirementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Requirement::factory()
            ->count(10)
            ->hasItems(5)
            ->create()
            ->each(function ($requirement) {
                $requirement->calculateGrandTotal();
            });
    }
}
