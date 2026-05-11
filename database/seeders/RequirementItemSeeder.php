<?php

namespace Database\Seeders;

use App\Models\Requirement;
use App\Models\RequirementItem;
use App\Models\Product;
use Illuminate\Database\Seeder;

class RequirementItemSeeder extends Seeder
{
    public function run(): void
    {
        $requirements = Requirement::all();
        $products = Product::all();

        if ($requirements->isEmpty() || $products->isEmpty()) {
            return;
        }

        foreach ($requirements as $requirement) {
            $itemCount = rand(2, 3);
            $selectedProducts = $products->random($itemCount);

            foreach ($selectedProducts as $product) {
                RequirementItem::create([
                    'requirement_id' => $requirement->id,
                    'product_id' => $product->id,
                    'quantity' => rand(1, 10),
                    'unit_price' => $product->unit_price,
                ]);
            }
        }
    }
}
