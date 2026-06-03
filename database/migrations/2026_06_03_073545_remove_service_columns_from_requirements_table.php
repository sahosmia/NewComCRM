<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('requirements', function (Blueprint $table) {
            $table->dropForeign(['accessories_unit_id']);
            $table->dropForeign(['installation_unit_id']);
            $table->dropColumn([
                'accessories_title',
                'accessories_quantity',
                'accessories_unit_id',
                'accessories_price',
                'installation_title',
                'installation_quantity',
                'installation_unit_id',
                'installation_price'
            ]);
        });
    }

    public function down(): void
    {
        Schema::table('requirements', function (Blueprint $table) {
            $table->string('accessories_title')->nullable();
            $table->integer('accessories_quantity')->nullable();
            $table->foreignId('accessories_unit_id')->nullable()->constrained('units')->onDelete('set null');
            $table->decimal('accessories_price', 12, 2)->nullable();
            $table->string('installation_title')->nullable();
            $table->integer('installation_quantity')->nullable();
            $table->foreignId('installation_unit_id')->nullable()->constrained('units')->onDelete('set null');
            $table->decimal('installation_price', 12, 2)->nullable();
        });
    }
};
