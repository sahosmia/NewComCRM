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
            $table->foreignId('send_qutation_to')->nullable()->constrained('customers')->onDelete('set null');
            $table->foreignId('qutation_send_by')->nullable()->constrained('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('requirements', function (Blueprint $table) {
            $table->dropConstrainedForeignId('send_qutation_to');
            $table->dropConstrainedForeignId('qutation_send_by');
        });
    }
};
