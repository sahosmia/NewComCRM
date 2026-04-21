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
            'model' => 'CP1104',
            'unit_price' => 20000,
            'category' => 'Cable',
            'description' => '305 meter box',
            'stock_quantity' => 50,
            'supplier_name' => 'Global Tech',
            'source' => 'Imported from Singapore'
        ],
        [
            'name' => 'PoE Switch 8 Port',
            'brand' => 'UNV',
            'model' => 'NSW2010-12P',
            'unit_price' => 4500,
            'category' => 'Switch',
            'description' => 'High speed PoE',
            'stock_quantity' => 25,
            'supplier_name' => 'Star Tech',
            'source' => 'Local Market'
        ],
    ];

        foreach ($products as $product) {
            Product::create($product);
        }

    }
}
