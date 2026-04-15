<?php

use App\Models\Quotation;
use App\Models\QuotationItem;
use App\Models\User;
use App\Models\Customer;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('protects_routes_from_unauthorized_users', function () {
    $this->get(route('quotations.index'))->assertRedirect(route('login'));
});

it('can_list_all_quotations', function () {
    Quotation::factory()->count(3)->create(['user_id' => $this->user->id]);

    $response = $this->actingAs($this->user)
        ->get(route('quotations.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('Quotations/Index')
        ->has('quotations.data', 3)
    );
});

it('can_store_a_new_quotation', function () {
    $customer = Customer::factory()->create();
    $product = Product::factory()->create();

    $quotationData = [
        'customer_id' => $customer->id,
        'quotation_date' => now()->format('Y-m-d'),
        'valid_until' => now()->addMonth()->format('Y-m-d'),
        'status' => 'draft',
        'subtotal' => 100.00,
        'tax' => 10.00,
        'discount' => 5.00,
        'total' => 105.00,
        'items' => [
            [
                'product_id' => $product->id,
                'description' => 'Test Product',
                'quantity' => 1,
                'unit_price' => 100.00,
                'total' => 100.00,
            ]
        ]
    ];

    $response = $this->actingAs($this->user)
        ->post(route('quotations.store'), $quotationData);

    $response->assertRedirect(route('quotations.index'));
    $this->assertDatabaseHas('quotations', [
        'customer_id' => $customer->id,
        'user_id' => $this->user->id,
        'total' => 105.00,
    ]);
    $this->assertDatabaseHas('quotation_items', [
        'product_id' => $product->id,
        'total' => 100.00,
    ]);
});

it('validates_required_fields_on_store', function () {
    $response = $this->actingAs($this->user)
        ->post(route('quotations.store'), []);

    $response->assertSessionHasErrors(['customer_id', 'quotation_date', 'valid_until', 'items']);
});

it('can_update_an_existing_quotation', function () {
    $quotation = Quotation::factory()->create(['user_id' => $this->user->id]);
    $product = Product::factory()->create();

    $updatedData = [
        'customer_id' => $quotation->customer_id,
        'quotation_date' => now()->format('Y-m-d'),
        'valid_until' => now()->addMonths(2)->format('Y-m-d'),
        'status' => 'sent',
        'subtotal' => 200.00,
        'tax' => 20.00,
        'discount' => 0.00,
        'total' => 220.00,
        'items' => [
            [
                'product_id' => $product->id,
                'description' => 'Updated Product',
                'quantity' => 2,
                'unit_price' => 100.00,
                'total' => 200.00,
            ]
        ]
    ];

    $response = $this->actingAs($this->user)
        ->put(route('quotations.update', $quotation), $updatedData);

    $response->assertRedirect(route('quotations.index'));
    $this->assertDatabaseHas('quotations', [
        'id' => $quotation->id,
        'status' => 'sent',
        'total' => 220.00,
    ]);
});

it('can_delete_a_quotation', function () {
    $quotation = Quotation::factory()->create(['user_id' => $this->user->id]);

    $response = $this->actingAs($this->user)
        ->delete(route('quotations.destroy', $quotation));

    $response->assertRedirect(route('quotations.index'));
    $this->assertDatabaseMissing('quotations', [
        'id' => $quotation->id,
    ]);
});
