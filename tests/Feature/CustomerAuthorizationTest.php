<?php

use App\Models\Customer;
use App\Models\User;
use App\Models\Meeting;
use App\Models\Company;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('user can edit a customer if they have an associated meeting even if not assigned to them', function () {
    // 1. Create two users
    $assignedUser = User::factory()->create(['role' => 'user']);
    $relatedUser = User::factory()->create(['role' => 'user']);

    // 2. Create a company (required for customer in many cases)
    $company = Company::factory()->create();

    // 3. Create a customer assigned to $assignedUser
    $customer = Customer::factory()->create([
        'assigned_to' => $assignedUser->id,
        'company_id' => $company->id,
    ]);

    // 4. Verify $relatedUser cannot edit the customer yet (should be 403 or 404 because of global scope)
    // Actually, because of AssignedDataScope, $relatedUser won't even find the customer if they have no relation.
    $this->actingAs($relatedUser)
        ->get(route('customers.edit', $customer))
        ->assertStatus(404);

    // 5. Create a meeting for this customer associated with $relatedUser
    Meeting::factory()->create([
        'customer_id' => $customer->id,
        'user_id' => $relatedUser->id,
    ]);

    // 6. Now $relatedUser should be able to edit the customer (200 OK)
    $this->actingAs($relatedUser)
        ->get(route('customers.edit', $customer))
        ->assertStatus(200);
});
