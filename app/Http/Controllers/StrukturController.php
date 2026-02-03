<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StrukturController extends Controller
{
    /**
     * Display the organizational structure page
     */
    public function index()
    {
        // Get struktur organisasi (pejabat)
        $struktur = Teacher::struktur()->get();
        
        // Get daftar guru
        $teachers = Teacher::guru()->get();
        
        return Inertia::render('StrukturOrganisasi', [
            'struktur' => $struktur,
            'teachers' => $teachers
        ]);
    }
}

