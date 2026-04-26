<?php

namespace App\Observers;

use App\Models\Requirement;
use App\Models\Sale;

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
                $this->createSale($requirement);
            }

            if ($newStatus === 'cancel' && $oldStatus === 'purchased') {
                $this->increaseStock($requirement);
                $this->cancelSale($requirement);
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

    protected function createSale(Requirement $requirement): void
    {
        Sale::create([
            'requirement_id' => $requirement->id,
            'customer_id' => $requirement->customer_id,
            'amount' => $requirement->grand_total,
            'sale_date' => now(),
        ]);
    }

    protected function cancelSale(Requirement $requirement): void
    {
        Sale::where('requirement_id', $requirement->id)->forceDelete();
    }
}
