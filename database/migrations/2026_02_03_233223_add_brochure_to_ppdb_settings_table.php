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
        Schema::table('ppdb_settings', function (Blueprint $table) {
            $table->string('brochure_file')->nullable()->after('updated_at');
            $table->string('brochure_title')->nullable()->after('brochure_file');
            $table->text('brochure_description')->nullable()->after('brochure_title');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ppdb_settings', function (Blueprint $table) {
            $table->dropColumn(['brochure_file', 'brochure_title', 'brochure_description']);
        });
    }
};
