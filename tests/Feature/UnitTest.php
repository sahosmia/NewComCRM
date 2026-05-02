<?php

use App\Models\Unit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create([
        'role' => 'super_admin'
    ]);
});

it('can list units', function () {
    Unit::factory()->count(3)->create();

    $response = $this->actingAs($this->user)
        ->get(route('units.index'));

    $response->assertStatus(200);
});

it('can store a unit', function () {
    $data = [
        'title' => 'Kilogram',
        'short_form' => 'KG',
    ];

    $response = $this->actingAs($this->user)
        ->post(route('units.store'), $data);

    $response->assertRedirect(route('units.index'));
    $this->assertDatabaseHas('units', $data);
});

it('can update a unit', function () {
    $unit = Unit::factory()->create();
    $data = [
        'title' => 'Grams',
        'short_form' => 'G',
    ];

    $response = $this->actingAs($this->user)
        ->put(route('units.update', $unit), $data);

    $response->assertRedirect(route('units.index'));
    $this->assertDatabaseHas('units', $data);
});

it('can delete a unit', function () {
    $unit = Unit::factory()->create();

    $response = $this->actingAs($this->user)
        ->delete(route('units.destroy', $unit));

    $response->assertRedirect(route('units.index'));
    $this->assertDatabaseMissing('units', ['id' => $unit->id]);
});
