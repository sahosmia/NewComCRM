<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('requirement_items', function (Blueprint $table) {
            $table->decimal('ait_percentage', 5, 2)->default(5)->after('quantity');
            $table->decimal('calculated_price', 12, 2)->after('unit_price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('requirement_items', function (Blueprint $table) {
            $table->dropColumn(['ait_percentage', 'calculated_price']);
        });
    }
};
