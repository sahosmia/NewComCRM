<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Unit;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $units = Unit::all();

        if ($units->isEmpty()) {
            $this->command->warn('Units not found. Skipping ProductSeeder.');
            return;
        }

        $realProducts = [
            [
                'name' => 'Cat6 Network Cable',
                'brand' => 'Rosenberger',
                'model' => 'CP1104',
                'category' => 'Cable',
                'unit_price' => 15000,
                'unit_id' => $units->where('short_form', 'Roll')->first()?->id ?? $units->random()->id,
                'stock_quantity' => 50,
            ],
            [
                'name' => '24 Port Gigabit Switch',
                'brand' => 'Cisco',
                'model' => 'CBS250-24T-4G',
                'category' => 'Switch',
                'unit_price' => 35000,
                'unit_id' => $units->where('short_form', 'Pcs')->first()?->id ?? $units->random()->id,
                'stock_quantity' => 20,
            ],
            [
                'name' => 'Optical Fiber Patch Cord',
                'brand' => 'CommScope',
                'model' => 'LC-SC Duplex',
                'category' => 'Accessories',
                'unit_price' => 1200,
                'unit_id' => $units->where('short_form', 'Pcs')->first()?->id ?? $units->random()->id,
                'stock_quantity' => 100,
            ],
        ];

        foreach ($realProducts as $productData) {
            Product::create($productData);
        }

        // Create 20 more products using factory
        Product::factory()->count(20)->create();
    }
}
