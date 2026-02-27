<?php

use App\Models\Meeting;
use App\Models\Customer;
use App\Models\User;
use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('can view meetings index', function () {
    actingAs($this->user)
        ->get(route('meetings.index'))
        ->assertStatus(200);
});

test('can schedule a meeting', function () {
    $customer = Customer::factory()->create();

    $data = [
        'customer_id' => $customer->id,
        'title' => 'Project Kickoff',
        'start_time' => now()->addDay()->format('Y-m-d H:i'),
        'end_time' => now()->addDay()->addHour()->format('Y-m-d H:i'),
        'meeting_type' => 'virtual',
        'agenda' => 'Discuss project scope',
        'status' => 'scheduled',
    ];

    actingAs($this->user)
        ->post(route('meetings.store'), $data)
        ->assertRedirect(route('meetings.index'));

    $this->assertDatabaseHas('meetings', [
        'customer_id' => $customer->id,
        'title' => 'Project Kickoff',
    ]);
});

test('can update a meeting', function () {
    $meeting = Meeting::factory()->create(['user_id' => $this->user->id]);

    $data = [
        'customer_id' => $meeting->customer_id,
        'title' => 'Updated Title',
        'start_time' => $meeting->start_time->format('Y-m-d H:i'),
        'end_time' => $meeting->end_time->format('Y-m-d H:i'),
        'meeting_type' => $meeting->meeting_type,
        'location' => $meeting->location,
        'status' => 'completed',
    ];

    actingAs($this->user)
        ->put(route('meetings.update', $meeting), $data)
        ->assertRedirect(route('meetings.index'));

    $this->assertDatabaseHas('meetings', [
        'id' => $meeting->id,
        'status' => 'completed',
    ]);
});

test('can delete a meeting', function () {
    $meeting = Meeting::factory()->create(['user_id' => $this->user->id]);

    actingAs($this->user)
        ->delete(route('meetings.destroy', $meeting))
        ->assertRedirect(route('meetings.index'));

    $this->assertDatabaseMissing('meetings', ['id' => $meeting->id]);
});
