<?php

namespace Tests\Feature;

use App\Models\Customer;
use App\Models\Product;
use App\Models\User;
use App\Models\Requirement;
use App\Models\RequirementAccessory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RequirementValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_requirement_can_be_saved_with_has_accessories_true_but_empty_accessories_data()
    {
        $user = User::factory()->create();
        $customer = Customer::factory()->create();
        $product = Product::factory()->create();

        $data = [
            'customer_id' => $customer->id,
            'title' => 'Test Requirement',
            'status' => 'pending',
            'ait_percentage' => 0,
            'vat_percentage' => 0,
            'price_validity_days' => 30,
            'delivery_time_days' => 7,
            'advance_payment' => 50,
            'items' => [
                [
                    'product_id' => $product->id,
                    'quantity' => 1,
                    'unit_price' => 100,
                ]
            ],
            'has_accessories' => true,
            'accessories' => [
                ['title' => '', 'quantity' => 1, 'price' => 10, 'unit_id' => '']
            ]
        ];

        $response = $this->actingAs($user)->post(route('requirements.store'), $data);

        $response->assertStatus(302);
        $this->assertEquals(0, RequirementAccessory::count());
    }

    public function test_requirement_can_be_saved_with_has_accessories_false_but_with_data()
    {
        $user = User::factory()->create();
        $customer = Customer::factory()->create();
        $product = Product::factory()->create();

        $data = [
            'customer_id' => $customer->id,
            'title' => 'Test Requirement',
            'status' => 'pending',
            'ait_percentage' => 0,
            'vat_percentage' => 0,
            'price_validity_days' => 30,
            'delivery_time_days' => 7,
            'advance_payment' => 50,
            'items' => [
                [
                    'product_id' => $product->id,
                    'quantity' => 1,
                    'unit_price' => 100,
                ]
            ],
            'has_accessories' => false,
            'accessories' => [
                ['title' => 'Should be ignored', 'quantity' => 1, 'price' => 10, 'unit_id' => '']
            ]
        ];

        $response = $this->actingAs($user)->post(route('requirements.store'), $data);

        $response->assertStatus(302);
        $this->assertEquals(0, RequirementAccessory::count());
    }
}
