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
        // Perbaiki nilai status yang tidak sesuai dengan constraint enum
        DB::table('ppdbs')
            ->where('status', 'menunggu')
            ->update(['status' => 'Menunggu']);
            
        // Tambahkan nilai default yang benar ke kolom status
        Schema::table('ppdbs', function (Blueprint $table) {
            // Hapus enum constraint lama
            if (DB::getDriverName() !== 'sqlite') {
                // MySQL/PostgreSQL membutuhkan pendekatan berbeda
                DB::statement('ALTER TABLE ppdbs MODIFY COLUMN status ENUM("Menunggu", "Diterima", "Ditolak") DEFAULT "Menunggu"');
            } else {
                // Untuk SQLite, kita tidak perlu mengubah skema, cukup perbaiki data
                // karena SQLite tidak memiliki ALTER COLUMN lengkap seperti MySQL
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Tidak perlu melakukan apa-apa saat rollback, karena
        // kita hanya memperbaiki data yang salah
    }
};
