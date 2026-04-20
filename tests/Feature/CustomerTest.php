<?php

use App\Models\Customer;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create(['role' => 'user']);
    $this->admin = User::factory()->create(['role' => 'super_admin']);
});

test('user can only see their own assigned customers in index', function () {
    Customer::factory()->count(3)->create(['assigned_to' => $this->user->id]);
    $otherUser = User::factory()->create(['role' => 'user']);
    Customer::factory()->count(2)->create(['assigned_to' => $otherUser->id]);

    $this->actingAs($this->user)
        ->get(route('customers.index'))
        ->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page->has('customers.data', 3));
});

test('super admin can see all customers in index', function () {
    Customer::factory()->count(5)->create(['assigned_to' => $this->user->id]);

    $this->actingAs($this->admin)
        ->get(route('customers.index'))
        ->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page->has('customers.data', 5));
});

test('authenticated user can create a customer', function () {
    $data = [
        'name'          => 'John Doe',
        'company_name'  => 'Tech Corp',
        'email'         => 'john.' . uniqid() . '@example.com',
        'assigned_to'   => $this->user->id,
        'type'          => 'corporate',
        'status'        => 'active',
        'phones'        => ['01700000000'],
        'addresses'     => ['Dhaka'],
    ];

    $this->actingAs($this->user)
        ->post(route('customers.store'), $data)
        ->assertRedirect(route('customers.index'));

    $this->assertDatabaseHas('customers', ['email' => $data['email']]);
});

test('user cannot view someone else customer detail', function () {
    $otherUser = User::factory()->create(['role' => 'user']);
    $otherCustomer = Customer::factory()->create(['assigned_to' => $otherUser->id]);

    $this->actingAs($this->user)
        ->get(route('customers.show', $otherCustomer))
        ->assertStatus(403);
});

test('user can update their own customer', function () {
    $customer = Customer::factory()->create(['assigned_to' => $this->user->id]);

    $updatedData = [
        'name'          => 'Updated Name',
        'company_name'  => 'Updated Corp',
        'email'         => $customer->email,
        'assigned_to'   => $this->user->id,
        'type'          => 'reseller',
        'status'        => 'active',
        'phones'        => ['01900000000'],
        'addresses'     => ['Chittagong'],
    ];

    $this->actingAs($this->user)
        ->put(route('customers.update', $customer), $updatedData)
        ->assertRedirect(route('customers.index'));

    expect($customer->refresh()->name)->toBe('Updated Name');
});

test('user can delete their own customer', function () {
    $customer = Customer::factory()->create(['assigned_to' => $this->user->id]);

    $this->actingAs($this->user)
        ->delete(route('customers.destroy', $customer))
        ->assertStatus(302);

    $this->assertSoftDeleted('customers', ['id' => $customer->id]);
});

test('user cannot bulk delete others customers', function () {
    $myCustomer = Customer::factory()->create(['assigned_to' => $this->user->id]);
    $othersCustomer = Customer::factory()->create(['assigned_to' => $this->admin->id]);

    $this->actingAs($this->user)
        ->delete(route('customers.bulkDestroy'), [
            'ids' => [$myCustomer->id, $othersCustomer->id]
        ]);

    $this->assertSoftDeleted('customers', ['id' => $myCustomer->id]);
    $this->assertDatabaseHas('customers', ['id' => $othersCustomer->id]);
});
