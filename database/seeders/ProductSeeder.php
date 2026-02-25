<?php
namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            [
                'name' => 'Cat 6 UTP Cable',
                'brand' => 'Rosenberger',
                'unit_price' => 20000,
                'category' => 'Cable',
                'description' => '305 meter box',
                'stock_quantity' => 50
            ],
            [
                'name' => 'PoE Switch 8 Port',
                'brand' => 'UNV',
                'unit_price' => 4500,
                'category' => 'Switch',
                'description' => 'Model: NSW2010-12P',
                'stock_quantity' => 25
            ],
            [
                'name' => 'Gigabit Media Converter',
                'brand' => 'DLink',
                'unit_price' => 2026,
                'category' => 'Converter',
                'description' => '10/100/1000Mbps',
                'stock_quantity' => 30
            ],
            [
                'name' => 'Cat 6 RJ45 Connector',
                'brand' => 'Rosenberger',
                'unit_price' => 15,
                'category' => 'Accessories',
                'description' => '100 pieces pack',
                'stock_quantity' => 200
            ],
            [
                'name' => '16 Port PoE Switch',
                'brand' => 'UNV',
                'unit_price' => 8500,
                'category' => 'Switch',
                'description' => 'Model: NSW2010-16P',
                'stock_quantity' => 15
            ],
            [
                'name' => 'Fiber Optic Cable',
                'brand' => 'DLink',
                'unit_price' => 12000,
                'category' => 'Cable',
                'description' => '1km drum, Single Mode',
                'stock_quantity' => 10
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }

    }
}
