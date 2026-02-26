<?php

use App\Models\Product;
use App\Models\User;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;
use function Pest\Laravel\delete;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('can view products index', function () {
    actingAs($this->user)
        ->get(route('products.index'))
        ->assertStatus(200);
});

test('can create a product', function () {
    $productData = [
        'name' => 'Test Product',
        'brand' => 'Test Brand',
        'unit_price' => 100.50,
        'category' => 'Test Category',
        'stock_quantity' => 10,
        'description' => 'Test Description',
    ];

    actingAs($this->user)
        ->post(route('products.store'), $productData)
        ->assertRedirect(route('products.index'));

    $this->assertDatabaseHas('products', [
        'name' => 'Test Product',
        'unit_price' => 100.50,
    ]);
});

test('can update a product', function () {
    $product = Product::factory()->create();

    $updatedData = [
        'name' => 'Updated Product',
        'brand' => 'Updated Brand',
        'unit_price' => 200.00,
        'category' => 'Updated Category',
        'stock_quantity' => 20,
        'description' => 'Updated Description',
    ];

    actingAs($this->user)
        ->put(route('products.update', $product), $updatedData)
        ->assertRedirect(route('products.index'));

    $this->assertDatabaseHas('products', [
        'id' => $product->id,
        'name' => 'Updated Product',
        'unit_price' => 200.00,
    ]);
});

test('can delete a product', function () {
    $product = Product::factory()->create();

    actingAs($this->user)
        ->delete(route('products.destroy', $product))
        ->assertRedirect(route('products.index'));

    $this->assertSoftDeleted($product);
});
