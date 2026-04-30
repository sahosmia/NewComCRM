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
        Schema::table('meetings', function (Blueprint $table) {
            $table->dropIndex(['user_id', 'start_time']);
            $table->dateTime('scheduled_at')->after('title')->nullable();
        });

        // Copy data from start_time to scheduled_at if possible
        \DB::table('meetings')->update([
            'scheduled_at' => \DB::raw('start_time')
        ]);

        Schema::table('meetings', function (Blueprint $table) {
            $table->dateTime('scheduled_at')->nullable(false)->change();
            $table->dropColumn(['start_time', 'end_time']);
            $table->index(['user_id', 'scheduled_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('meetings', function (Blueprint $table) {
            $table->dropIndex(['user_id', 'scheduled_at']);
            $table->dateTime('start_time')->after('title')->nullable();
            $table->dateTime('end_time')->after('start_time')->nullable();
        });

        \DB::table('meetings')->update([
            'start_time' => \DB::raw('scheduled_at'),
            'end_time' => \DB::raw('scheduled_at')
        ]);

        Schema::table('meetings', function (Blueprint $table) {
            $table->dropColumn('scheduled_at');
            $table->index(['user_id', 'start_time']);
        });
    }
};
