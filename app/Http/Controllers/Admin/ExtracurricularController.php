<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Extracurricular;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ExtracurricularController extends Controller
{
    /**
     * Menampilkan daftar ekstrakurikuler di dashboard
     */
    public function index()
    {
        $extracurriculars = Extracurricular::with('user')
            ->orderBy('id')
            ->get();

        return Inertia::render('Admin/Extracurriculars/Index', [
            'extracurriculars' => $extracurriculars
        ]);
    }

    /**
     * Menampilkan form untuk membuat ekstrakurikuler baru
     */
    public function create()
    {
        return Inertia::render('Admin/Extracurriculars/Create');
    }

    /**
     * Menyimpan ekstrakurikuler baru
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'schedule' => 'nullable|string|max:255',
            'coach' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'is_active' => 'boolean'
        ]);

        $validatedData['slug'] = Str::slug($validatedData['name']);
        $validatedData['user_id'] = Auth::id();

        // Upload gambar jika ada
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('extracurriculars', 'public');
            $validatedData['image'] = $path;
        }

        Extracurricular::create($validatedData);

        return redirect()->route('admin.extracurriculars.index')
            ->with('success', 'Ekstrakurikuler berhasil ditambahkan!');
    }

    /**
     * Menampilkan detail ekstrakurikuler
     */
    public function show(Extracurricular $extracurricular)
    {
        return Inertia::render('Admin/Extracurriculars/Show', [
            'extracurricular' => $extracurricular->load('user')
        ]);
    }

    /**
     * Menampilkan form edit ekstrakurikuler
     */
    public function edit(Extracurricular $extracurricular)
    {
        return Inertia::render('Admin/Extracurriculars/Edit', [
            'extracurricular' => $extracurricular
        ]);
    }

    /**
     * Mengupdate ekstrakurikuler
     */
    public function update(Request $request, Extracurricular $extracurricular)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'schedule' => 'nullable|string|max:255',
            'coach' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'remove_image' => 'nullable|boolean'
        ]);

        $validatedData['slug'] = Str::slug($validatedData['name']);

        // Upload gambar baru jika ada
        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($extracurricular->image) {
                Storage::disk('public')->delete($extracurricular->image);
            }
            
            $path = $request->file('image')->store('extracurriculars', 'public');
            $validatedData['image'] = $path;
        } else if ($request->boolean('remove_image')) {
            // Hapus gambar jika user memilih untuk menghapusnya
            if ($extracurricular->image) {
                Storage::disk('public')->delete($extracurricular->image);
            }
            $validatedData['image'] = null;
        } else {
            // Jika tidak ada gambar baru dan tidak menghapus gambar, pertahankan gambar lama
            unset($validatedData['image']);
        }

        // Hapus remove_image dari data yang akan diupdate
        if (isset($validatedData['remove_image'])) {
            unset($validatedData['remove_image']);
        }

        $extracurricular->update($validatedData);

        return redirect()->route('admin.extracurriculars.index')
            ->with('success', 'Ekstrakurikuler berhasil diperbarui!');
    }

    /**
     * Menghapus ekstrakurikuler
     */
    public function destroy(Extracurricular $extracurricular)
    {
        // Hapus gambar jika ada
        if ($extracurricular->image) {
            Storage::disk('public')->delete($extracurricular->image);
        }

        $extracurricular->delete();

        return redirect()->route('admin.extracurriculars.index')
            ->with('success', 'Ekstrakurikuler berhasil dihapus!');
    }
}
