<?php

use App\Models\Meeting;
use App\Models\User;
use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('protects_routes_from_unauthorized_users', function () {
    $this->get(route('meetings.index'))->assertRedirect(route('login'));
});

it('can_list_all_meetings', function () {
    Meeting::factory()->count(3)->create(['user_id' => $this->user->id]);

    $response = $this->actingAs($this->user)
        ->get(route('meetings.index'));

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('Meetings/Index')
        ->has('meetings.data', 3)
    );
});

it('can_store_a_new_meeting', function () {
    $customer = Customer::factory()->create();

    $meetingData = [
        'customer_id' => $customer->id,
        'title' => 'Project Kickoff',
        'scheduled_at' => now()->addDay()->format('Y-m-d H:i:s'),
        'meeting_type' => 'virtual',
        'location' => 'Zoom',
        'agenda' => 'Initial discussion',
        'status' => 'scheduled',
    ];

    $response = $this->actingAs($this->user)
        ->post(route('meetings.store'), $meetingData);

    $response->assertRedirect(route('meetings.index'));
    $this->assertDatabaseHas('meetings', [
        'customer_id' => $customer->id,
        'user_id' => $this->user->id,
        'title' => 'Project Kickoff',
    ]);
});

it('validates_required_fields_on_store', function () {
    $response = $this->actingAs($this->user)
        ->post(route('meetings.store'), []);

    $response->assertSessionHasErrors(['customer_id', 'title', 'scheduled_at']);
});

it('can_update_an_existing_meeting', function () {
    $meeting = Meeting::factory()->create(['user_id' => $this->user->id]);

    $updatedData = [
        'customer_id' => $meeting->customer_id,
        'title' => 'Updated Meeting Title',
        'scheduled_at' => now()->addDays(2)->format('Y-m-d H:i:s'),
        'meeting_type' => 'physical',
        'location' => 'Office',
        'status' => 'completed',
    ];

    $response = $this->actingAs($this->user)
        ->put(route('meetings.update', $meeting), $updatedData);

    $response->assertRedirect(route('meetings.index'));
    $this->assertDatabaseHas('meetings', [
        'id' => $meeting->id,
        'title' => 'Updated Meeting Title',
        'status' => 'completed',
    ]);
});

it('can_delete_a_meeting', function () {
    $meeting = Meeting::factory()->create(['user_id' => $this->user->id]);

    $response = $this->actingAs($this->user)
        ->delete(route('meetings.destroy', $meeting));

    $response->assertRedirect(route('meetings.index'));
    $this->assertDatabaseMissing('meetings', [
        'id' => $meeting->id,
    ]);
});
