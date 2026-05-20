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
            $table->decimal('costing_price', 12, 2)->default(0)->after('unit_price');
            $table->text('description')->nullable()->after('costing_price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('requirement_items', function (Blueprint $table) {
            $table->dropColumn(['costing_price', 'description']);
        });
    }
};
