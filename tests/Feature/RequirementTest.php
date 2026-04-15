<?php

use App\Models\Requirement;
use App\Models\User;
use App\Models\Customer;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('protects_routes_from_unauthorized_users', function () {
    $this->get(route('requirements.index'))->assertRedirect(route('login'));
});

it('can_list_all_requirements', function () {
    Requirement::factory()->count(3)->create();

    $response = $this->actingAs($this->user)
        ->get(route('requirements.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('Requirements/Index')
        ->has('requirements.data', 3)
    );
});

it('can_store_a_new_requirement', function () {
    $customer = Customer::factory()->create();
    $product = Product::factory()->create();

    $requirementData = [
        'customer_id' => $customer->id,
        'product_id' => $product->id,
        'quantity' => 5,
        'unit_price' => 100.00,
        'total_price' => 500.00,
        'notes' => 'Some notes',
    ];

    $response = $this->actingAs($this->user)
        ->post(route('requirements.store'), $requirementData);

    $response->assertRedirect(route('requirements.index'));
    $this->assertDatabaseHas('requirements', [
        'customer_id' => $customer->id,
        'product_id' => $product->id,
        'quantity' => 5,
        'unit_price' => 100.00,
        'total_price' => 500.00,
    ]);
});

it('validates_required_fields_on_store', function () {
    $response = $this->actingAs($this->user)
        ->post(route('requirements.store'), []);

    $response->assertSessionHasErrors(['customer_id', 'product_id', 'quantity', 'unit_price']);
});

it('can_update_an_existing_requirement', function () {
    $requirement = Requirement::factory()->create();

    $updatedData = [
        'customer_id' => $requirement->customer_id,
        'product_id' => $requirement->product_id,
        'quantity' => 10,
        'unit_price' => 150.00,
        'total_price' => 1500.00,
    ];

    $response = $this->actingAs($this->user)
        ->put(route('requirements.update', $requirement), $updatedData);

    $response->assertRedirect(route('requirements.index'));
    $this->assertDatabaseHas('requirements', [
        'id' => $requirement->id,
        'quantity' => 10,
        'unit_price' => 150.00,
        'total_price' => 1500.00,
    ]);
});

it('can_delete_a_requirement', function () {
    $requirement = Requirement::factory()->create();

    $response = $this->actingAs($this->user)
        ->delete(route('requirements.destroy', $requirement));

    $response->assertRedirect(route('requirements.index'));
    $this->assertDatabaseMissing('requirements', [
        'id' => $requirement->id,
    ]);
});
