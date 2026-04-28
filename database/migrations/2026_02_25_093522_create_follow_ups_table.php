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
        Schema::create('follow_ups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->dateTime('follow_up_date');
            $table->text('notes')->nullable();
            $table->enum('status', [
                'pending',
                'done',
            ])->default('pending');
            $table->enum('priority', ['high', 'medium', 'low'])->default('medium');
            $table->dateTime('completed_at')->nullable();
            $table->dateTime('next_follow_up')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'follow_up_date']);
            $table->index('status');
            $table->index('next_follow_up');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('follow_ups');
    }
};
