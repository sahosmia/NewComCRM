<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Quotation;
use App\Models\QuotationItem;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuotationItemFactory extends Factory
{
    protected $model = QuotationItem::class;

    public function definition(): array
    {
        $unitPrice = $this->faker->randomFloat(2, 10, 500);
        $quantity = $this->faker->numberBetween(1, 10);

        return [
            'quotation_id' => Quotation::factory(),
            'product_id'   => Product::factory(),
            'description'  => $this->faker->sentence(3),
            'quantity'     => $quantity,
            'unit_price'   => $unitPrice,
            'total'        => $quantity * $unitPrice,
        ];
    }
}
