<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Product;
use App\Models\User;
use App\Models\Company;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();

        if ($users->isEmpty()) {
            $this->command->warn("No users found. Please seed users first.");
            return;
        }

        $customers = [
            [
                'name' => 'Musabbir',
                'designation' => 'Manager',
                'company_name' => 'Samuda Chemical Com',
                'phones' => ['01799-992813', '01800-000000'],
                'email' => 'contact@samuda.com',
                'addresses' => ['T.K Bhaban (8th & 9th F), Dhaka'],
                'type' => 'corporate',
                'status' => 'active',
                'remarks' => 'Key account for chemical supplies.',
            ],
            [
                'name' => 'Rahman Ahmed',
                'designation' => 'Director',
                'company_name' => 'Tech Solutions Ltd',
                'phones' => ['01811-223344'],
                'email' => 'rahman@techsolutions.com',
                'addresses' => ['Gulshan-2, Dhaka', 'Banani, Dhaka'],
                'type' => 'corporate',
                'status' => 'active'
            ],
            [
                'name' => 'Fatema Begum',
                'designation' => 'Procurement Officer',
                'company_name' => 'Global Electronics',
                'phones' => ['01922-334455'],
                'email' => 'fatema@globalelec.com',
                'addresses' => ['Sector 4, Uttara, Dhaka'],
                'type' => 'reseller',
                'status' => 'active'
            ],
            [
                'name' => 'Kamal Hossain',
                'designation' => 'Owner',
                'company_name' => 'Kamal Enterprise',
                'phones' => ['01533-445566'],
                'email' => 'kamal@enterprise.com',
                'addresses' => ['Motijheel C/A, Dhaka'],
                'type' => 'personal',
                'status' => 'active'
            ],
        ];

        foreach ($customers as $customerData) {
            $company = Company::firstOrCreate([
                'name' => $customerData['company_name']
            ]);

            unset($customerData['company_name']);

            $customer = Customer::create(array_merge($customerData, [
                'company_id' => $company->id,
                'assigned_to' => $users->random()->id
            ]));

            $this->createRequirementWithItems($customer);
        }

        Customer::factory()->count(10)->create()->each(function ($customer) {
            $this->createRequirementWithItems($customer);
        });
    }

    private function createRequirementWithItems($customer)
    {
        $requirement = $customer->requirements()->create([
            'notes' => 'Generated via Seeder',
            'status' => 'pending',
        ]);

        $products = Product::inRandomOrder()->take(rand(1, 4))->get();

        foreach ($products as $product) {
            $quantity = rand(1, 10);

            $requirement->items()->create([
                'product_id' => $product->id,
                'quantity'   => $quantity,
                'unit_price' => $product->unit_price,
            ]);
        }
    }
}
