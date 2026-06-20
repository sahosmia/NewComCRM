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
                'category' => 'Cable',
                'unit_price' => 15000,
                'costing_price' => 12000,
                'unit_id' => $units->where('short_form', 'Roll')->first()?->id ?? $units->random()->id,
                'stock_quantity' => 50,
            ],
            [
                'name' => '24 Port Gigabit Switch',
                'category' => 'Switch',
                'unit_price' => 35000,
                'costing_price' => 28000,
                'unit_id' => $units->where('short_form', 'Pcs')->first()?->id ?? $units->random()->id,
                'stock_quantity' => 20,
            ],
            [
                'name' => 'Optical Fiber Patch Cord',
                'category' => 'Accessories',
                'unit_price' => 1200,
                'costing_price' => 800,
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
