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
        $users = User::where('role', 'user')->get();

        $customers = [
            [
                'name' => 'Musabbir',
                'designation' => 'Manager',
                'company_name' => 'Samuda Chemical Com',
                'phone' => '01799-992813',
                'email' => 'contact@samuda.com',
                'address' => 'T.K Bhaban (8th & 9th F), Dhaka',
                'status' => 'active'
            ],
            [
                'name' => 'Rahman Ahmed',
                'designation' => 'Director',
                'company_name' => 'Tech Solutions Ltd',
                'phone' => '01811-223344',
                'email' => 'rahman@techsolutions.com',
                'address' => 'Gulshan, Dhaka',
                'status' => 'active'
            ],
            [
                'name' => 'Fatema Begum',
                'designation' => 'Procurement Officer',
                'company_name' => 'Global Electronics',
                'phone' => '01922-334455',
                'email' => 'fatema@globalelec.com',
                'address' => 'Uttara, Dhaka',
                'status' => 'active'
            ],
            [
                'name' => 'Kamal Hossain',
                'designation' => 'Owner',
                'company_name' => 'Kamal Enterprise',
                'phone' => '01533-445566',
                'email' => 'kamal@enterprise.com',
                'address' => 'Motijheel, Dhaka',
                'status' => 'active'
            ],
        ];

        foreach ($customers as $customerData) {
            $customer = Customer::create(array_merge($customerData, [
                'assigned_to' => $users->random()->id
            ]));

            // Create requirements for each customer
            $this->createRequirements($customer);
        }

       
    }

    private function createRequirements($customer)
    {
        $products = Product::inRandomOrder()->take(rand(1, 3))->get();

        foreach ($products as $product) {
            $quantity = rand(1, 10);
            $customer->requirements()->create([
                'product_id' => $product->id,
                'quantity' => $quantity,
                'unit_price' => $product->unit_price,
                'total_price' => $quantity * $product->unit_price,
                'notes' => 'Sample requirement'
            ]);
        }
    }
}
