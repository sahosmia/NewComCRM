<?php

namespace Database\Seeders;

use App\Models\Sale;
use App\Models\Requirement;
use Illuminate\Database\Seeder;

class SaleSeeder extends Seeder
{
    public function run(): void
    {
        $purchasedRequirements = Requirement::where('status', 'purchased')->get();

        foreach ($purchasedRequirements as $requirement) {
            Sale::create([
                'requirement_id' => $requirement->id,
                'customer_id' => $requirement->customer_id,
                'amount' => $requirement->grand_total,
                'sale_date' => $requirement->updated_at ?? now(),
            ]);
        }
    }
}
