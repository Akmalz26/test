<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Buat akun admin
        User::create([
            'name' => 'Admin SMK IT Baitul Aziz',
            'email' => 'admin@smkitbaitulaziz.sch.id',
            'password' => Hash::make('smkitbaitulaziz2026'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Buat akun operator
        User::create([
            'name' => 'Operator PPDB',
            'email' => 'spmb@smkitbaitulaziz.sch.id',
            'password' => Hash::make('spmbsmkitba2026'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Output informasi
        $this->command->info('Akun admin berhasil dibuat!');
        $this->command->line('Email: admin@smkitbaitulaziz.sch.id');
        $this->command->line('Password: smkitbaitulaziz2026');
        $this->command->line('');
        $this->command->line('Email: spmb@smkitbaitulaziz.sch.id');
        $this->command->line('Password: spmbsmkitba2026');
    }
}
