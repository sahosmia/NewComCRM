<?php

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('protects_routes_from_unauthorized_users', function () {
    $this->get(route('products.index'))->assertRedirect(route('login'));
    $this->get(route('products.create'))->assertRedirect(route('login'));
    $this->post(route('products.store'))->assertRedirect(route('login'));
    $this->get(route('products.edit', 1))->assertRedirect(route('login'));
    $this->put(route('products.update', 1))->assertRedirect(route('login'));
    $this->delete(route('products.destroy', 1))->assertRedirect(route('login'));
});

it('can_list_all_products', function () {
    Product::factory()->count(3)->create();

    $response = $this->actingAs($this->user)
        ->get(route('products.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('Products/Index')
        ->has('products.data', 3)
    );
});

it('can_search_products_by_name', function () {
    Product::factory()->create(['name' => 'Specific Product']);
    Product::factory()->count(5)->create(['name' => 'Other']);

    $response = $this->actingAs($this->user)
        ->get(route('products.index', ['search' => 'Specific']));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->has('products.data', 1)
        ->where('products.data.0.name', 'Specific Product')
    );
});

it('can_filter_products_by_category', function () {
    Product::factory()->create(['category' => 'Electronics']);
    Product::factory()->create(['category' => 'Furniture']);

    $response = $this->actingAs($this->user)
        ->get(route('products.index', ['category' => 'Electronics']));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->has('products.data', 1)
        ->where('products.data.0.category', 'Electronics')
    );
});

it('can_store_a_new_product', function () {
    $productData = [
        'name' => 'New Product',
        'brand' => 'New Brand',
        'unit_price' => 150.50,
        'description' => 'Product description',
        'category' => 'Software',
        'stock_quantity' => 10,
    ];

    $response = $this->actingAs($this->user)
        ->post(route('products.store'), $productData);

    $response->assertRedirect(route('products.index'));
    $this->assertDatabaseHas('products', [
        'name' => 'New Product',
        'unit_price' => 150.50,
    ]);
});

it('validates_required_fields_on_store', function () {
    $response = $this->actingAs($this->user)
        ->post(route('products.store'), []);

    $response->assertSessionHasErrors(['name', 'unit_price', 'stock_quantity']);
});

it('can_update_an_existing_product', function () {
    $product = Product::factory()->create();

    $updatedData = [
        'name' => 'Updated Name',
        'unit_price' => 200.00,
        'stock_quantity' => 50,
    ];

    $response = $this->actingAs($this->user)
        ->put(route('products.update', $product), $updatedData);

    $response->assertRedirect(route('products.index'));
    $this->assertDatabaseHas('products', [
        'id' => $product->id,
        'name' => 'Updated Name',
        'unit_price' => 200.00,
    ]);
});

it('can_delete_a_product', function () {
    $product = Product::factory()->create();

    $response = $this->actingAs($this->user)
        ->delete(route('products.destroy', $product));

    $response->assertRedirect(route('products.index'));
    $this->assertSoftDeleted('products', [
        'id' => $product->id,
    ]);
});
