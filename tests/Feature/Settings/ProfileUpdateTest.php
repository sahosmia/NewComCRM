<?php

use App\Models\User;
use function Pest\Laravel\{actingAs, delete, assertGuest, assertModelMissing};

test('profile page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('profile.edit'));

    $response->assertOk();
});

test('profile information can be updated', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->patch(route('profile.update'), [
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('profile.edit'));

    $user->refresh();

    expect($user->name)->toBe('Test User');
    expect($user->email)->toBe('test@example.com');
    expect($user->email_verified_at)->toBeNull();
});

test('email verification status is unchanged when the email address is unchanged', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->patch(route('profile.update'), [
            'name' => 'Test User',
            'email' => $user->email,
        ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('profile.edit'));

    expect($user->refresh()->email_verified_at)->not->toBeNull();
});

test('user can delete their account with valid password', function () {
    // 1. Arrange: Create user with a specific password
    $user = User::factory()->create([
        'password' => bcrypt('password'),
    ]);

    // 2. Act: Attempt deletion
    $response = actingAs($user)
        ->from(route('profile.edit')) // Set the 'previous' URL
        ->delete(route('profile.destroy'), [
            'password' => 'password',
        ]);

    // 3. Assert: Flow & Auth State
    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('home'));

    assertGuest();

    // 4. Assert: Database integrity
    // assertModelMissing is smarter than toBeNull as it handles SoftDeletes correctly
    assertModelMissing($user);
})->skip();

test('user cannot delete account with incorrect password', function () {
    $user = User::factory()->create();

    $response = actingAs($user)
        ->from(route('profile.edit'))
        ->delete(route('profile.destroy'), [
            'password' => 'wrong-password',
        ]);

    $response->assertSessionHasErrors(['password']);

    // Ensure the user still exists in the DB
    expect($user->fresh())->not->toBeNull();
});

test('correct password must be provided to delete account', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->from(route('profile.edit'))
        ->delete(route('profile.destroy'), [
            'password' => 'wrong-password',
        ]);

    $response
        ->assertSessionHasErrors('password')
        ->assertRedirect(route('profile.edit'));

    expect($user->fresh())->not->toBeNull();
});
