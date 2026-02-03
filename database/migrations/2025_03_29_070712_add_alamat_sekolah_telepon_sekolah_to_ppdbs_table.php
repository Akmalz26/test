<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('ppdbs', function (Blueprint $table) {
            // Cek apakah kolom alamat_sekolah sudah ada
            if (!Schema::hasColumn('ppdbs', 'alamat_sekolah')) {
                $table->string('alamat_sekolah')->nullable()->after('sekolah_asal');
            }
            
            // Cek apakah kolom telepon_sekolah sudah ada
            if (!Schema::hasColumn('ppdbs', 'telepon_sekolah')) {
                $table->string('telepon_sekolah')->nullable()->after('alamat_sekolah');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ppdbs', function (Blueprint $table) {
            // Cek apakah kolom ada sebelum mencoba menghapusnya
            if (Schema::hasColumn('ppdbs', 'alamat_sekolah')) {
                $table->dropColumn('alamat_sekolah');
            }
            
            if (Schema::hasColumn('ppdbs', 'telepon_sekolah')) {
                $table->dropColumn('telepon_sekolah');
            }
        });
    }
};
