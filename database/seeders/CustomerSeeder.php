<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    public function run()
    {
        // 'user' রোলের ইউজারদের খুঁজে বের করা, যদি না থাকে তবে প্রথম ইউজারকে নেওয়া
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
                'phones' => ['01799-992813', '01800-000000'], // Array format
                'email' => 'contact@samuda.com',
                'addresses' => ['T.K Bhaban (8th & 9th F), Dhaka'], // Array format
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
            $customer = Customer::create(array_merge($customerData, [
                'assigned_to' => $users->random()->id
            ]));

            $this->createRequirements($customer);
        }

        Customer::factory()->count(10)->create();
    }

    private function createRequirements($customer)
    {
        $products = Product::inRandomOrder()->take(rand(1, 3))->get();

        foreach ($products as $product) {
            $quantity = rand(5, 50);
            $customer->requirements()->create([
                'product_id' => $product->id,
                'quantity' => $quantity,
                'unit_price' => $product->unit_price,
                'total_price' => $quantity * $product->unit_price,
                'notes' => 'Generated via Seeder'
            ]);
        }
    }
}
