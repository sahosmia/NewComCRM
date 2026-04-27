<?php

use App\Models\Requirement;
use App\Models\User;
use App\Models\Customer;
use App\Models\Sale;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('automatically_creates_a_sale_when_requirement_is_purchased', function () {
    $requirement = Requirement::factory()->create(['status' => 'pending', 'grand_total' => 1000]);

    $requirement->update(['status' => 'purchased']);

    $this->assertDatabaseHas('sales', [
        'requirement_id' => $requirement->id,
        'customer_id' => $requirement->customer_id,
        'amount' => 1000,
    ]);
});

it('automatically_removes_a_sale_when_purchased_requirement_is_cancelled', function () {
    $requirement = Requirement::factory()->create(['status' => 'pending', 'grand_total' => 1000]);

    $requirement->update(['status' => 'purchased']);
    $this->assertDatabaseHas('sales', ['requirement_id' => $requirement->id]);

    $requirement->update(['status' => 'cancel']);
    $this->assertDatabaseMissing('sales', ['requirement_id' => $requirement->id]);
});

it('protects_sales_route_from_unauthorized_users', function () {
    $this->get(route('sales.index'))->assertRedirect(route('login'));
});

it('can_list_all_sales', function () {
    Sale::factory()->count(3)->create();

    $response = $this->actingAs($this->user)
        ->get(route('sales.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('Sales/Index')
        ->has('sales.data', 3)
    );
});
