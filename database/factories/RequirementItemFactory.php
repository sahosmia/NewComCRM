<?php
namespace Database\Factories;

use App\Models\Product;
use App\Models\Requirement;
use App\Models\RequirementItem;
use Illuminate\Database\Eloquent\Factories\Factory;

class RequirementItemFactory extends Factory
{
    protected $model = RequirementItem::class;

    public function definition(): array
    {
        $unitPrice = $this->faker->randomFloat(2, 50, 500);
        $quantity = $this->faker->numberBetween(1, 10);

        return [
            'requirement_id' => Requirement::factory(),
            'product_id'     => Product::factory(),
            'quantity'       => $quantity,
            'unit_price'     => $unitPrice,
            'total_price'    => $quantity * $unitPrice,
        ];
    }
}
