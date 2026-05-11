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
        $companies = Company::all();
        $users = User::where('role', 'user')->get();

        if ($companies->isEmpty() || $users->isEmpty()) {
            $this->command->warn('Companies or Users not found. Skipping CustomerSeeder.');
            return;
        }

        $realCustomers = [
            [
                'name' => 'Md. Rahim Ullah',
                'designation' => 'Procurement Officer',
                'company_id' => $companies->where('name', 'Square Pharmaceuticals Ltd.')->first()?->id,
                'email' => 'rahim@squarepharma.com.bd',
                'type' => 'corporate',
                'phones' => ['01711223344', '01811223344'],
                'addresses' => ['Dhaka, Bangladesh'],
                'assigned_to' => $users->random()->id,
            ],
            [
                'name' => 'Fatima Tuz Zohra',
                'designation' => 'IT Manager',
                'company_id' => $companies->where('name', 'Grameenphone Ltd.')->first()?->id,
                'email' => 'fatima@grameenphone.com',
                'type' => 'corporate',
                'phones' => ['01700000001'],
                'addresses' => ['Bashundhara R/A, Dhaka'],
                'assigned_to' => $users->random()->id,
            ],
            [
                'name' => 'Abdul Karim',
                'designation' => 'Owner',
                'company_id' => null,
                'email' => 'karim@example.com',
                'type' => 'personal',
                'phones' => ['01911998877'],
                'addresses' => ['Mirpur, Dhaka'],
                'assigned_to' => $users->random()->id,
            ],
        ];

        foreach ($realCustomers as $customerData) {
            Customer::create($customerData);
        }

        // Create additional 10 customers using factory
        Customer::factory()->count(10)->create();
    }
}
