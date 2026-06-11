<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        Customer::flushEventListeners();

        $companies = Company::all();
        $users = User::where('role', 'user')->get();

        if ($companies->isEmpty() || $users->isEmpty()) {
            $this->command->warn('Companies or Users not found. Skipping CustomerSeeder.');
            return;
        }

        // Create 500 customers using factory
        Customer::factory()->count(50)->create([
            'company_id' => fn() => $companies->random()->id,
            'assigned_to' => fn() => $users->random()->id,
        ]);
    }
}
