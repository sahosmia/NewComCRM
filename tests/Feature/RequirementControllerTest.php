<?php

use App\Models\Requirement;
use App\Models\Customer;
use App\Models\Product;
use App\Models\User;
use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('can view requirements index', function () {
    actingAs($this->user)
        ->get(route('requirements.index'))
        ->assertStatus(200);
});

test('can create a requirement', function () {
    $customer = Customer::factory()->create();
    $product = Product::factory()->create();

    $data = [
        'customer_id' => $customer->id,
        'product_id' => $product->id,
        'quantity' => 5,
        'unit_price' => 100,
        'notes' => 'Some notes',
    ];

    actingAs($this->user)
        ->post(route('requirements.store'), $data)
        ->assertRedirect(route('requirements.index'));

    $this->assertDatabaseHas('requirements', [
        'customer_id' => $customer->id,
        'product_id' => $product->id,
        'quantity' => 5,
        'total_price' => 500,
    ]);
});

test('can update a requirement', function () {
    $requirement = Requirement::factory()->create(['quantity' => 2, 'unit_price' => 50]);

    $data = [
        'customer_id' => $requirement->customer_id,
        'product_id' => $requirement->product_id,
        'quantity' => 3,
        'unit_price' => 60,
    ];

    actingAs($this->user)
        ->put(route('requirements.update', $requirement), $data)
        ->assertRedirect(route('requirements.index'));

    $this->assertDatabaseHas('requirements', [
        'id' => $requirement->id,
        'quantity' => 3,
        'total_price' => 180,
    ]);
});

test('can delete a requirement', function () {
    $requirement = Requirement::factory()->create();

    actingAs($this->user)
        ->delete(route('requirements.destroy', $requirement))
        ->assertRedirect(route('requirements.index'));

    $this->assertDatabaseMissing('requirements', ['id' => $requirement->id]);
});
