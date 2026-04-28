<?php

use App\Models\FollowUp;
use App\Models\User;
use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('protects_routes_from_unauthorized_users', function () {
    $this->get(route('follow-ups.index'))->assertRedirect(route('login'));
});

it('can_list_all_follow_ups', function () {
    FollowUp::factory()->count(3)->create(['user_id' => $this->user->id]);

    $response = $this->actingAs($this->user)
        ->get(route('follow-ups.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('FollowUps/Index')
        ->has('followUps.data', 3)
    );
});

it('can_store_a_new_follow_up', function () {
    $customer = Customer::factory()->create();

    $followUpData = [
        'customer_id' => $customer->id,
        'follow_up_date' => now()->addDay()->format('Y-m-d H:i:s'),
        'notes' => 'Follow up notes',
        'status' => 'pending',
        'priority' => 'medium',
    ];

    $response = $this->actingAs($this->user)
        ->post(route('follow-ups.store'), $followUpData);

    $response->assertRedirect(route('follow-ups.index'));
    $this->assertDatabaseHas('follow_ups', [
        'customer_id' => $customer->id,
        'user_id' => $this->user->id,
        'notes' => 'Follow up notes',
    ]);
});

it('validates_required_fields_on_store', function () {
    $response = $this->actingAs($this->user)
        ->post(route('follow-ups.store'), []);

    $response->assertSessionHasErrors(['customer_id', 'follow_up_date', 'notes', 'status', 'priority']);
});

it('can_update_an_existing_follow_up', function () {
    $followUp = FollowUp::factory()->create(['user_id' => $this->user->id]);

    $updatedData = [
        'customer_id' => $followUp->customer_id,
        'follow_up_date' => now()->addDays(2)->format('Y-m-d H:i:s'),
        'notes' => 'Updated notes',
        'status' => 'done',
        'priority' => 'high',
    ];

    $response = $this->actingAs($this->user)
        ->put(route('follow-ups.update', $followUp), $updatedData);

    $response->assertRedirect(route('follow-ups.index'));
    $this->assertDatabaseHas('follow_ups', [
        'id' => $followUp->id,
        'notes' => 'Updated notes',
        'status' => 'done',
    ]);
});

it('can_delete_a_follow_up', function () {
    $followUp = FollowUp::factory()->create(['user_id' => $this->user->id]);

    $response = $this->actingAs($this->user)
        ->delete(route('follow-ups.destroy', $followUp));

    $response->assertRedirect(route('follow-ups.index'));
    $this->assertDatabaseMissing('follow_ups', [
        'id' => $followUp->id,
    ]);
});

it('updates_dates_when_status_is_updated_to_done', function () {
    $followUp = FollowUp::factory()->create([
        'user_id' => $this->user->id,
        'status' => 'pending',
        'completed_at' => null
    ]);

    $response = $this->actingAs($this->user)
        ->patch(route('follow-ups.update-status', $followUp), [
            'status' => 'done'
        ]);

    $response->assertRedirect();
    $followUp->refresh();

    expect($followUp->status)->toBe('done');
    expect($followUp->completed_at)->not->toBeNull();
});

it('updates_follow_up_date_when_status_is_updated_from_done_to_pending', function () {
    $originalDate = now()->subDays(5);
    $followUp = FollowUp::factory()->create([
        'user_id' => $this->user->id,
        'status' => 'done',
        'follow_up_date' => $originalDate,
        'completed_at' => now()
    ]);

    $response = $this->actingAs($this->user)
        ->patch(route('follow-ups.update-status', $followUp), [
            'status' => 'pending'
        ]);

    $response->assertRedirect();
    $followUp->refresh();

    expect($followUp->status)->toBe('pending');
    expect($followUp->completed_at)->toBeNull();
    expect($followUp->follow_up_date->gt($originalDate))->toBeTrue();
});
