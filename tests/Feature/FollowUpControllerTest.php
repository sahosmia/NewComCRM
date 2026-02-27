<?php

use App\Models\FollowUp;
use App\Models\Customer;
use App\Models\User;
use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->user = User::factory()->create(['role' => 'super_admin']);
});

test('can view follow ups index', function () {
    actingAs($this->user)
        ->get(route('follow-ups.index'))
        ->assertStatus(200);
});

test('can schedule a follow up', function () {
    $customer = Customer::factory()->create();

    $data = [
        'customer_id' => $customer->id,
        'follow_up_date' => now()->addDay()->format('Y-m-d H:i'),
        'notes' => 'Test follow up',
        'status' => 'pending',
        'priority' => 'high',
    ];

    actingAs($this->user)
        ->from(route('follow-ups.index'))
        ->post(route('follow-ups.store'), $data)
        ->assertRedirect();

    $this->assertDatabaseHas('follow_ups', [
        'customer_id' => $customer->id,
        'notes' => 'Test follow up',
    ]);
});

test('can update a follow up', function () {
    $followUp = FollowUp::factory()->create(['user_id' => $this->user->id]);

    $data = [
        'status' => 'negotiation',
        'notes' => 'Negotiating price',
    ];

    actingAs($this->user)
        ->put(route('follow-ups.update', $followUp), $data)
        ->assertRedirect();

    $this->assertDatabaseHas('follow_ups', [
        'id' => $followUp->id,
        'status' => 'negotiation',
    ]);
});

test('can complete a follow up', function () {
    $followUp = FollowUp::factory()->create(['user_id' => $this->user->id]);

    actingAs($this->user)
        ->post(route('follow-ups.complete', $followUp))
        ->assertRedirect();

    $this->assertNotNull($followUp->fresh()->completed_at);
});
