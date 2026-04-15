<?php

use App\Models\Customer;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('test_can_search_customers_by_company_name', function () {
    $user = User::factory()->create();

    Customer::factory()->create([
        'company_name' => 'Kamal Enterprise',
        'assigned_to'  => $user->id,
    ]);

    Customer::factory()->count(5)->create([
        'assigned_to' => $user->id,
    ]);

    $response = $this->actingAs($user)
                     ->get(route('customers.index', ['search' => 'Kamal']));

    $response->assertStatus(200);

    $response->assertInertia(fn ($page) => $page
        ->component('Customers/Index')
        ->has('customers.data', 1)
        ->where('customers.data.0.company_name', 'Kamal Enterprise')
    );
});
