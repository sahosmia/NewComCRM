<?php

namespace Database\Factories\Concerns;

use Illuminate\Support\Carbon;

trait HasTemporalData
{
    /**
     * Get a random date from one of the five temporal buckets.
     *
     * @param array|null $includeBuckets
     * @return mixed
     */
    public function getRandomTemporalDate(?array $includeBuckets = null)
    {
        $allBuckets = [
            'past_history'     => fn() => now()->subYear()->addDays(rand(0, 30)),
            'recent_history'   => fn() => now()->subMonths(2)->addDays(rand(0, 15)),
            'current_timeline' => fn() => now()->subDays(rand(0, 6)),
            'near_future'      => fn() => now()->addWeeks(rand(1, 4)),
            'distant_future'   => fn() => now()->addYear()->subDays(rand(0, 30)),
        ];

        $availableBuckets = $includeBuckets
            ? array_intersect_key($allBuckets, array_flip($includeBuckets))
            : $allBuckets;

        if (empty($availableBuckets)) {
            $availableBuckets = $allBuckets;
        }

        $selectedBucketKey = array_rand($availableBuckets);

        return $availableBuckets[$selectedBucketKey]();
    }
}
