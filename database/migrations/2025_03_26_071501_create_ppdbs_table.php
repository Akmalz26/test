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
        Schema::create('ppdbs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('nomor_pendaftaran')->unique();
            $table->string('tahun_pelajaran');
            $table->boolean('is_pesantren')->default(false);
            
            // Data Siswa
            $table->string('nama_lengkap');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->text('alamat');
            $table->string('rt')->nullable();
            $table->string('rw')->nullable();
            $table->string('desa')->nullable();
            $table->string('kecamatan')->nullable();
            $table->string('kabupaten')->nullable();
            $table->string('kode_pos')->nullable();
            $table->string('nisn');
            
            // Data Sekolah
            $table->string('sekolah_asal');
            $table->text('alamat_sekolah')->nullable();
            $table->string('telepon_sekolah')->nullable();
            
            // Data Orang Tua
            $table->string('nama_ayah')->nullable();
            $table->string('nama_ibu')->nullable();
            $table->string('pekerjaan_ayah')->nullable();
            $table->string('pekerjaan_ibu')->nullable();
            $table->text('alamat_ortu')->nullable();
            $table->string('rt_ortu')->nullable();
            $table->string('rw_ortu')->nullable();
            $table->string('desa_ortu')->nullable();
            $table->string('kecamatan_ortu')->nullable();
            $table->string('kabupaten_ortu')->nullable();
            $table->string('kode_pos_ortu')->nullable();
            $table->string('telepon_rumah')->nullable();
            $table->string('telepon_hp')->nullable();
            
            // Dokumen
            $table->string('foto')->nullable();
            $table->string('rapor_file')->nullable();
            $table->string('ijazah_file')->nullable();
            $table->string('skhun_file')->nullable();
            $table->string('kk_file')->nullable();
            $table->string('akta_lahir_file')->nullable();
            $table->string('ktp_ortu_file')->nullable();
            $table->string('kip_kks_kps_file')->nullable();
            
            // Status
            $table->enum('status', ['Menunggu', 'Diterima', 'Ditolak'])->default('Menunggu');
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ppdbs');
    }
}; 