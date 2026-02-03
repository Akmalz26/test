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
        Schema::create('ppdb_settings', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_open')->default(false);
            $table->date('open_date')->nullable();
            $table->date('close_date')->nullable();
            $table->string('academic_year')->nullable();
            $table->text('message_closed')->nullable();
            $table->timestamps();
        });

        // Insert default settings
        \DB::table('ppdb_settings')->insert([
            'is_open' => false,
            'academic_year' => '2025/2026',
            'message_closed' => 'Pendaftaran PPDB saat ini sedang ditutup. Silakan hubungi pihak sekolah untuk informasi lebih lanjut.',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ppdb_settings');
    }
};
