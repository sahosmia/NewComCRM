<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\Product;
use App\Models\Requirement;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RequirementCostingPriceTest extends TestCase
{
    use RefreshDatabase;

    public function test_requirement_item_costing_price_cannot_be_null()
    {
        $user = User::factory()->create(['role' => 'super_admin']);
        $customer = Customer::factory()->create();
        $product = Product::factory()->create(['unit_price' => 100]);

        $data = [
            'customer_id' => $customer->id,
            'title' => 'Test Requirement',
            'ait_percentage' => 5,
            'vat_percentage' => 10,
            'price_validity_days' => 30,
            'delivery_time_days' => 7,
            'advance_payment' => 10,
            'before_payment' => 90,
            'items' => [
                [
                    'product_id' => $product->id,
                    'quantity' => 1,
                    'unit_price' => 100,
                    'costing_price' => '', // Empty string should be converted to 0, not null
                    'description' => 'Test'
                ]
            ]
        ];

        $response = $this->actingAs($user)->post(route('requirements.store'), $data);

        $response->assertRedirect(route('requirements.index'));
        $this->assertDatabaseHas('requirement_items', [
            'costing_price' => 0
        ]);
    }
}
