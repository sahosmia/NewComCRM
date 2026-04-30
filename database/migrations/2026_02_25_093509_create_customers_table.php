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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('designation')->nullable();
            $table->foreignId('company_id')->nullable()->constrained()->onDelete('set null');
            $table->string('email')->nullable();
            $table->foreignId('assigned_to')->constrained('users')->onDelete('cascade');
            $table->enum('type', ['corporate', 'reseller', 'personal'])->default('corporate');
            $table->json('phones')->nullable();
            $table->json('addresses')->nullable();
            $table->text('remarks')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->softDeletes();
            $table->timestamps();

            $table->index('assigned_to');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
