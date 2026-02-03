<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $galleries = Gallery::with('user')
                    ->orderBy('created_at', 'desc')
                    ->get();
        
        return Inertia::render('Admin/Gallery/Index', [
            'galleries' => $galleries
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Gallery/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_featured' => 'nullable|boolean'
        ]);

        $imagePath = null;
        
        if ($request->hasFile('image')) {
            // Generate a unique name for the image
            $fileName = Str::random(20) . '.' . $request->file('image')->getClientOriginalExtension();
            
            // Store the image in the public storage
            $imagePath = $request->file('image')->storeAs('gallery', $fileName, 'public');
        }

        $gallery = Gallery::create([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'image' => $imagePath ? Storage::url($imagePath) : null,
            'is_featured' => $request->is_featured ? true : false,
            'user_id' => Auth::id()
        ]);

        return redirect()->route('admin.gallery.index')
                        ->with('success', 'Foto berhasil ditambahkan ke galeri.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Gallery $gallery)
    {
        return Inertia::render('Admin/Gallery/Show', [
            'gallery' => $gallery->load('user')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gallery $gallery)
    {
        return Inertia::render('Admin/Gallery/Edit', [
            'gallery' => $gallery
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gallery $gallery)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_featured' => 'nullable|boolean'
        ]);

        $data = [
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'is_featured' => $request->is_featured ? true : false,
        ];

        // Handle image update if provided
        if ($request->hasFile('image')) {
            // Remove the old image if exists
            if ($gallery->image && Storage::exists('public/' . str_replace('/storage/', '', $gallery->image))) {
                Storage::delete('public/' . str_replace('/storage/', '', $gallery->image));
            }

            // Generate a unique name for the new image
            $fileName = Str::random(20) . '.' . $request->file('image')->getClientOriginalExtension();
            
            // Store the new image
            $imagePath = $request->file('image')->storeAs('gallery', $fileName, 'public');
            
            $data['image'] = Storage::url($imagePath);
        }

        $gallery->update($data);

        return redirect()->route('admin.gallery.index')
                        ->with('success', 'Foto galeri berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gallery $gallery)
    {
        // Delete the image file
        if ($gallery->image && Storage::exists('public/' . str_replace('/storage/', '', $gallery->image))) {
            Storage::delete('public/' . str_replace('/storage/', '', $gallery->image));
        }

        // Delete the gallery entry
        $gallery->delete();

        return redirect()->route('admin.gallery.index')
                        ->with('success', 'Foto galeri berhasil dihapus.');
    }
}
