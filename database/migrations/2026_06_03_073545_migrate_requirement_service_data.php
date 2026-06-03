<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $requirements = DB::table('requirements')->get();

        foreach ($requirements as $requirement) {
            $aitFactor = 1;
            if ($requirement->ait_percentage > 0 && $requirement->ait_percentage < 100) {
                $aitFactor = 1 / (1 - ($requirement->ait_percentage / 100));
            }

            if ($requirement->has_accessories && !empty($requirement->accessories_price)) {
                $total_price = ($requirement->accessories_quantity * $requirement->accessories_price * $aitFactor);
                DB::table('requirement_accessories')->insert([
                    'requirement_id' => $requirement->id,
                    'title' => $requirement->accessories_title ?? 'Accessory',
                    'quantity' => $requirement->accessories_quantity ?? 1,
                    'unit_id' => $requirement->accessories_unit_id,
                    'price' => $requirement->accessories_price ?? 0,
                    'total_price' => $total_price,
                    'created_at' => $requirement->created_at,
                    'updated_at' => $requirement->updated_at,
                ]);
            }

            if ($requirement->has_installation && !empty($requirement->installation_price)) {
                $total_price = ($requirement->installation_quantity * $requirement->installation_price * $aitFactor);
                DB::table('requirement_installations')->insert([
                    'requirement_id' => $requirement->id,
                    'title' => $requirement->installation_title ?? 'Installation',
                    'quantity' => $requirement->installation_quantity ?? 1,
                    'unit_id' => $requirement->installation_unit_id,
                    'price' => $requirement->installation_price ?? 0,
                    'total_price' => $total_price,
                    'created_at' => $requirement->created_at,
                    'updated_at' => $requirement->updated_at,
                ]);
            }
        }
    }

    public function down(): void
    {
        DB::table('requirement_accessories')->truncate();
        DB::table('requirement_installations')->truncate();
    }
};
