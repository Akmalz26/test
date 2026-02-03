<?php

namespace App\Http\Controllers;

use App\Models\Extracurricular;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExtracurricularController extends Controller
{
    /**
     * Menampilkan halaman ekstrakurikuler
     */
    public function index()
    {
        $extracurriculars = Extracurricular::where('is_active', true)
            ->orderBy('order')
            ->get();

        return Inertia::render('Extracurricular', [
            'extracurriculars' => $extracurriculars
        ]);
    }

    /**
     * Menampilkan detail ekstrakurikuler
     */
    public function show($slug)
    {
        $extracurricular = Extracurricular::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $otherExtracurriculars = Extracurricular::where('id', '!=', $extracurricular->id)
            ->where('is_active', true)
            ->orderBy('order')
            ->limit(5)
            ->get();

        return Inertia::render('ExtracurricularDetail', [
            'extracurricular' => $extracurricular,
            'otherExtracurriculars' => $otherExtracurriculars
        ]);
    }
}
