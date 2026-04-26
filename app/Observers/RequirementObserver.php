<?php

namespace App\Observers;

use App\Models\Requirement;

class RequirementObserver
{
    /**
     * Handle the Requirement "updated" event.
     */
    public function updated(Requirement $requirement): void
    {
        if ($requirement->isDirty('status')) {
            $oldStatus = $requirement->getOriginal('status');
            $newStatus = $requirement->status;

            if ($newStatus === 'purchased' && $oldStatus !== 'purchased') {
                $this->decreaseStock($requirement);
            }

            if ($newStatus === 'cancel' && $oldStatus === 'purchased') {
                $this->increaseStock($requirement);
            }
        }
    }

    protected function decreaseStock(Requirement $requirement): void
    {
        foreach ($requirement->items as $item) {
            if ($item->product) {
                $item->product->decrement('stock_quantity', $item->quantity);
            }
        }
    }

    protected function increaseStock(Requirement $requirement): void
    {
        foreach ($requirement->items as $item) {
            if ($item->product) {
                $item->product->increment('stock_quantity', $item->quantity);
            }
        }
    }
}
