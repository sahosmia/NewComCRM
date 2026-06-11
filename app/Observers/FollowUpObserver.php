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
                $followUp->completed_at = null;
            }
        }
    }
}
