<?php

use App\Models\Requirement;
use App\Models\User;
use App\Models\Customer;
use App\Models\Sale;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create(['role' => 'super_admin']);
});

it('can_filter_sales_by_customer', function () {
    $customer1 = Customer::factory()->create();
    $customer2 = Customer::factory()->create();

    Sale::factory()->create(['customer_id' => $customer1->id]);
    Sale::factory()->create(['customer_id' => $customer2->id]);

    $response = $this->actingAs($this->user)
        ->get(route('sales.index', ['customer_id' => $customer1->id]));

    $response->assertStatus(200);

    $response->assertInertia(fn ($page) => $page
        ->has('sales.data', 1)
        ->where('sales.data.0.customer_id', $customer1->id)
    );
});

it('can_filter_sales_by_representative', function () {
    $rep = User::factory()->create();
    // Use actingAs(super_admin) to avoid AssignedDataScope issues during test setup if any
    $customer1 = Customer::factory()->create(['assigned_to' => $rep->id]);
    $customer2 = Customer::factory()->create(['assigned_to' => $this->user->id]);

    Sale::factory()->create(['customer_id' => $customer1->id]);
    Sale::factory()->create(['customer_id' => $customer2->id]);

    $response = $this->actingAs($this->user)
        ->get(route('sales.index', ['assigned_to' => $rep->id]));

    $response->assertStatus(200);

    $response->assertInertia(fn ($page) => $page
        ->has('sales.data', 1)
        ->where('sales.data.0.customer.assigned_to', $rep->id)
    );
});

it('can_search_sales_by_requirement_title', function () {
    $req1 = Requirement::factory()->create(['title' => 'Special Project']);
    $req2 = Requirement::factory()->create(['title' => 'Normal Work']);

    Sale::factory()->create(['requirement_id' => $req1->id]);
    Sale::factory()->create(['requirement_id' => $req2->id]);

    $response = $this->actingAs($this->user)
        ->get(route('sales.index', ['search' => 'Special']));

    $response->assertStatus(200);

    $response->assertInertia(fn ($page) => $page
        ->has('sales.data', 1)
        ->where('sales.data.0.requirement.title', 'Special Project')
    );
});

it('can_filter_sales_by_date_range', function () {
    Sale::factory()->create(['sale_date' => '2023-01-01']);
    Sale::factory()->create(['sale_date' => '2023-01-15']);
    Sale::factory()->create(['sale_date' => '2023-02-01']);

    $response = $this->actingAs($this->user)
        ->get(route('sales.index', [
            'start_date' => '2023-01-01',
            'end_date' => '2023-01-31'
        ]));

    $response->assertStatus(200);

    $response->assertInertia(fn ($page) => $page
        ->has('sales.data', 2)
    );
});
