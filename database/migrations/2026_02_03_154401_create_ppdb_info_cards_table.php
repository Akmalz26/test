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
        Schema::create('ppdb_info_cards', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('icon')->default('file-text');
            $table->text('content');
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->string('card_type')->default('general');
            $table->timestamps();
        });

        // Insert default data
        DB::table('ppdb_info_cards')->insert([
            [
                'title' => 'Persyaratan Pendaftaran',
                'icon' => 'file-text',
                'content' => '<ul><li>FC akta kelahiran</li><li>FC kartu keluarga</li><li>Pas foto anak</li><li>Surat Keterangan Lulus</li><li>FC KTP Orang Tua</li><li>FC KIP (Jika Ada)</li><li>FC Rapor (Jika sudah ada)</li><li>FC Ijazah SMP (Jika sudah ada)</li></ul>',
                'order' => 1,
                'is_active' => true,
                'card_type' => 'requirements',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Program Keahlian',
                'icon' => 'school',
                'content' => '<h4>Program Keahlian</h4><p>Pengembangan Perangkat Lunak dan Gim</p><h4>Konsentrasi Keahlian (Kelas 11)</h4><ul><li>Rekayasa Perangkat Lunak</li><li>Pemrograman Gim (Baru)</li></ul><hr><h4>Prestasi Tingkat Kabupaten</h4><ul><li>2024 - Juara 1 LKS Bidang Web Technologies</li><li>2023 - Juara 2 LKS Bidang Web Technologies</li></ul>',
                'order' => 2,
                'is_active' => true,
                'card_type' => 'programs',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Keunggulan SMK IT Baitul Aziz',
                'icon' => 'award',
                'content' => '<ul><li>Beasiswa KIP, prestasi, yatim, kurang mampu</li><li>Berpeluang bisa bekerja</li><li>Alumni tersebar kuliah di kampus UIN, UPI, Unisa Univ.Muhammadiyah, STMIK IM, Univ.Wanita International</li><li>Bisa lanjut kuliah KIP</li><li>Program Tahfidz Qur\'an</li><li>Pembelajaran berbasis industri</li><li>Pendidikan berkarakter</li><li>Magang di perusahaan 3-4 bulan</li></ul>',
                'order' => 3,
                'is_active' => true,
                'card_type' => 'benefits',
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
        Schema::dropIfExists('ppdb_info_cards');
    }
};
