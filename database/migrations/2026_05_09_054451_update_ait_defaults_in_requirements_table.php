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
        Schema::table('requirements', function (Blueprint $table) {
            $table->boolean('has_ait')->default(true)->change();
            $table->decimal('ait_percentage', 5, 2)->default(5)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('requirements', function (Blueprint $table) {
            $table->boolean('has_ait')->default(false)->change();
            $table->decimal('ait_percentage', 5, 2)->default(0)->change();
        });
    }
};
