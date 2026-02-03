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
        // Untuk SQLite, kita tidak bisa langsung mengubah enum
        // Jadi kita akan membuat tabel baru dengan constraint yang benar
        if (DB::getDriverName() === 'sqlite') {
            // Untuk SQLite, hanya perbaiki data yang salah
            DB::table('ppdbs')
                ->where('status', 'verifikasi')
                ->update(['status' => 'Verifikasi']);
                
            DB::table('ppdbs')
                ->where('status', 'cadangan')
                ->update(['status' => 'Cadangan']);
        } else {
            // Untuk MySQL atau PostgreSQL, kita bisa mengubah tipe enum
            DB::statement('ALTER TABLE ppdbs MODIFY COLUMN status ENUM("Menunggu", "Verifikasi", "Diterima", "Ditolak", "Cadangan") DEFAULT "Menunggu"');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Tidak perlu rollback karena tidak semua database mendukung menghapus nilai enum
    }
};
