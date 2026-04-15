<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->superAdmin = User::factory()->create(['role' => 'super_admin']);
    $this->regularUser = User::factory()->create(['role' => 'user']);
});

it('protects_user_management_from_unauthorized_roles', function () {
    $this->actingAs($this->regularUser)
        ->get(route('users.index'))
        ->assertForbidden();
});

it('allows_super_admin_to_list_all_users', function () {
    $response = $this->actingAs($this->superAdmin)
        ->get(route('users.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('Users/Index')
        ->has('users.data', 2)
    );
});

it('can_store_a_new_user', function () {
    $userData = [
        'name' => 'New User',
        'email' => 'newuser@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'role' => 'user',
    ];

    $response = $this->actingAs($this->superAdmin)
        ->post(route('users.store'), $userData);

    $response->assertRedirect(route('users.index'));
    $this->assertDatabaseHas('users', [
        'name' => 'New User',
        'email' => 'newuser@example.com',
        'role' => 'user',
    ]);
});

it('validates_required_fields_on_store', function () {
    $response = $this->actingAs($this->superAdmin)
        ->post(route('users.store'), []);

    $response->assertSessionHasErrors(['name', 'email', 'password', 'role']);
});

it('can_update_an_existing_user', function () {
    $user = User::factory()->create();

    $updatedData = [
        'name' => 'Updated User Name',
        'email' => $user->email,
        'role' => 'super_admin',
    ];

    $response = $this->actingAs($this->superAdmin)
        ->put(route('users.update', $user), $updatedData);

    $response->assertRedirect(route('users.index'));
    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'name' => 'Updated User Name',
        'role' => 'super_admin',
    ]);
});

it('can_delete_a_user', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($this->superAdmin)
        ->delete(route('users.destroy', $user));

    $response->assertRedirect();
    $this->assertSoftDeleted('users', [
        'id' => $user->id,
    ]);
});
