<?php

namespace App\Observers;

use App\Models\FollowUp;

class FollowUpObserver
{
    /**
     * Handle the FollowUp "saving" event.
     */
    public function saving(FollowUp $followUp): void
    {
        if ($followUp->isDirty('status')) {
            if ($followUp->status === 'done') {
                $followUp->completed_at = now();
            } else {
                // If status is not 'done', update the follow_up_date to current date time
                $followUp->follow_up_date = now();
                $followUp->completed_at = null;
            }
        }
    }
}
