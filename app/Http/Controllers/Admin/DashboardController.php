<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\News;
use App\Models\Extracurricular;
use App\Models\Ppdb;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard with statistics
     */
    public function index()
    {
        // Hitung statistik
        $stats = [
            'totalGalleries' => Gallery::count(),
            'totalNews' => News::count(),
            'totalExtracurriculars' => Extracurricular::count(),
            'totalTeachers' => Teacher::count(),
            'totalPpdb' => Ppdb::count(),
            'ppdbPending' => Ppdb::where('status', 'Menunggu')->count(),
            'ppdbVerified' => Ppdb::where('status', 'Verifikasi')->count(),
            'ppdbAccepted' => Ppdb::where('status', 'Diterima')->count(),
            'ppdbRejected' => Ppdb::where('status', 'Ditolak')->count(),
        ];

        // Log untuk debugging
        \Log::info('Dashboard Stats:', $stats);

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats
        ]);
    }
}

