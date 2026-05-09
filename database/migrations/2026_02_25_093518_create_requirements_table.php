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
        Schema::create('requirements', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            // Taxes
            $table->decimal('ait_percentage', 5, 2)->default(5);
            $table->decimal('vat_percentage', 5, 2)->default(0);

            // Accessories
            $table->boolean('has_accessories')->default(false);
            $table->string('accessories_title')->nullable();
            $table->integer('accessories_quantity')->nullable();
            $table->foreignId('accessories_unit_id')->nullable()->constrained('units')->onDelete('set null');
            $table->decimal('accessories_price', 12, 2)->nullable();

            // Installation
            $table->boolean('has_installation')->default(false);
            $table->string('installation_title')->nullable();
            $table->integer('installation_quantity')->nullable();
            $table->foreignId('installation_unit_id')->nullable()->constrained('units')->onDelete('set null');
            $table->decimal('installation_price', 12, 2)->nullable();

            // Terms & Delivery
            $table->integer('price_validity_days')->nullable();
            $table->integer('delivery_time_days')->nullable();
            $table->integer('advance_payment')->default(0);
            $table->integer('before_payment')->default(100);
            $table->string('delivery_location')->nullable();

            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->decimal('grand_total', 12, 2)->default(0);
            $table->text('notes')->nullable();
            $table->enum('status', ['pending', 'processing', 'purchased', 'cancel'])->default('pending');
            $table->timestamps();

            $table->index('customer_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requirements');
    }
};
