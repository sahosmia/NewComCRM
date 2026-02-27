<?php

use App\Models\Quotation;
use App\Models\Customer;
use App\Models\Product;
use App\Models\User;
use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->user = User::factory()->create(['role' => 'super_admin']);
});

test('can view quotations index', function () {
    actingAs($this->user)
        ->get(route('quotations.index'))
        ->assertStatus(200);
});

test('can create a quotation', function () {
    $customer = Customer::factory()->create();
    $product = Product::factory()->create();

    $data = [
        'customer_id' => $customer->id,
        'valid_until' => now()->addMonth()->format('Y-m-d'),
        'tax' => 10,
        'discount' => 5,
        'status' => 'draft',
        'items' => [
            [
                'product_id' => $product->id,
                'quantity' => 2,
                'unit_price' => 50,
                'description' => 'Test Item'
            ]
        ]
    ];

    actingAs($this->user)
        ->post(route('quotations.store'), $data)
        ->assertStatus(302);

    $this->assertDatabaseHas('quotations', [
        'customer_id' => $customer->id,
        'total' => 105, // 2*50 + 10 - 5
    ]);

    $this->assertDatabaseHas('quotation_items', [
        'description' => 'Test Item',
        'total' => 100,
    ]);
});

test('can update a quotation', function () {
    $quotation = Quotation::factory()->create(['user_id' => $this->user->id]);
    $product = Product::factory()->create();

    $data = [
        'valid_until' => now()->addMonth()->format('Y-m-d'),
        'items' => [
            [
                'product_id' => $product->id,
                'quantity' => 3,
                'unit_price' => 40,
            ]
        ],
        'status' => 'draft'
    ];

    actingAs($this->user)
        ->put(route('quotations.update', $quotation->id), $data)
        ->assertRedirect();

    $this->assertDatabaseHas('quotations', [
        'id' => $quotation->id,
        'total' => 120,
    ]);
});
