<?php

use App\Models\FollowUp;
use App\Models\Meeting;
use App\Models\User;
use App\Repositories\FollowUpRepository;
use App\Repositories\MeetingRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create(['role' => 'super_admin']);
    $this->followUpRepository = new FollowUpRepository();
    $this->meetingRepository = new MeetingRepository();
});

it('includes overdue pending follow-ups in today period filter', function () {
    // Today's follow-up
    FollowUp::factory()->create([
        'follow_up_date' => today(),
        'status' => 'pending',
        'user_id' => $this->user->id
    ]);

    // Overdue pending follow-up
    FollowUp::factory()->create([
        'follow_up_date' => today()->subDays(5),
        'status' => 'pending',
        'user_id' => $this->user->id
    ]);

    // Overdue completed follow-up (should NOT be in today)
    FollowUp::factory()->create([
        'follow_up_date' => today()->subDays(5),
        'status' => 'done',
        'user_id' => $this->user->id
    ]);

    // Future follow-up (should NOT be in today)
    FollowUp::factory()->create([
        'follow_up_date' => today()->addDays(5),
        'status' => 'pending',
        'user_id' => $this->user->id
    ]);

    $results = $this->followUpRepository->paginateForIndex(['period' => 'today'], $this->user);

    expect($results->total())->toBe(2);
});

it('includes overdue scheduled meetings in today period filter', function () {
    // Today's meeting
    Meeting::factory()->create([
        'scheduled_at' => today(),
        'status' => 'scheduled',
        'user_id' => $this->user->id
    ]);

    // Overdue scheduled meeting
    Meeting::factory()->create([
        'scheduled_at' => today()->subDays(5),
        'status' => 'scheduled',
        'user_id' => $this->user->id
    ]);

    // Overdue completed meeting (should NOT be in today)
    Meeting::factory()->create([
        'scheduled_at' => today()->subDays(5),
        'status' => 'completed',
        'user_id' => $this->user->id
    ]);

    // Future meeting (should NOT be in today)
    Meeting::factory()->create([
        'scheduled_at' => today()->addDays(5),
        'status' => 'scheduled',
        'user_id' => $this->user->id
    ]);

    $results = $this->meetingRepository->paginateForIndex(['period' => 'today']);

    expect($results->total())->toBe(2);
});
