<?php

namespace App\Observers;

use App\Models\Requirement;
use App\Services\RequirementService;

class RequirementObserver
{
    public function __construct(
        protected RequirementService $requirementService
    ) {}

    /**
     * Handle the Requirement "updated" event.
     */
    public function updated(Requirement $requirement): void
    {
        if ($requirement->isDirty('status')) {
            $oldStatus = $requirement->getOriginal('status');
            $newStatus = $requirement->status;

            if ($newStatus === 'purchased' && $oldStatus !== 'purchased') {
                $this->requirementService->decreaseStock($requirement);
                $this->requirementService->createSale($requirement);
            }

            if ($oldStatus === 'purchased' && $newStatus !== 'purchased') {
                $this->requirementService->increaseStock($requirement);
                $this->requirementService->cancelSale($requirement);
            }
        }
    }
}
