<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

dataset('rolePermissions', [
    ['super_admin', 200],
    ['user', 403],
]);

it('checks user page access for different roles', function (string $role, int $status) {

    $user = User::factory()->create([
        'role' => $role,
    ]);

    $this->actingAs($user)
        ->get('/users')
        ->assertStatus($status);

})->with('rolePermissions');
