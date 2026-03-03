<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ppdb_timelines', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('date');
            $table->text('description');
            $table->string('icon')->default('check-circle');
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Insert default timeline data
        DB::table('ppdb_timelines')->insert([
            [
                'title' => 'Pendaftaran Tahap 1',
                'date' => 'Februari - April 2025',
                'description' => 'Pendaftaran dapat dilakukan secara online melalui website resmi SMK IT Baitul Aziz',
                'icon' => 'file-text',
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Pendaftaran Tahap 2',
                'date' => 'Mei - Juli 2025',
                'description' => 'Pendaftaran tahap kedua untuk calon peserta didik baru SMK IT Baitul Aziz',
                'icon' => 'check-circle',
                'order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Pengumuman Hasil',
                'date' => '10 Juni 2025',
                'description' => 'Pengumuman hasil seleksi SPMB melalui website dan Whatsapp',
                'icon' => 'calendar-check',
                'order' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Daftar Ulang',
                'date' => 'Juni - Juli 2025',
                'description' => 'Proses daftar ulang bagi calon peserta didik yang diterima',
                'icon' => 'clock',
                'order' => 4,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ppdb_timelines');
    }
};
