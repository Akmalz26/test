<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\GalleryPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = News::with('user')
            ->withCount('galleryPhotos')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/News/Index', [
            'news' => $news
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/News/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:news,slug',
            'summary' => 'nullable|string',
            'content' => 'required|string',
            'category' => 'nullable|string|max:100',
            'author' => 'nullable|string|max:100',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_featured' => 'nullable|boolean',
            'gallery_photos' => 'nullable|array',
            'gallery_photos.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120',
            'gallery_captions' => 'nullable|array',
            'gallery_captions.*' => 'nullable|string|max:255',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $fileName = Str::random(20) . '.' . $request->file('image')->getClientOriginalExtension();
            $imagePath = $request->file('image')->storeAs('news', $fileName, 'public');
        }

        $news = News::create([
            'title' => $request->title,
            'slug' => $request->slug,
            'summary' => $request->summary,
            'content' => $request->content,
            'category' => $request->category,
            'author' => $request->author,
            'image' => $imagePath ? Storage::url($imagePath) : null,
            'is_featured' => $request->is_featured ? true : false,
            'user_id' => Auth::id()
        ]);

        // Handle gallery photos
        if ($request->hasFile('gallery_photos')) {
            $captions = $request->gallery_captions ?? [];
            foreach ($request->file('gallery_photos') as $index => $photo) {
                $photoName = Str::random(20) . '.' . $photo->getClientOriginalExtension();
                $photoPath = $photo->storeAs('gallery-photos', $photoName, 'public');

                GalleryPhoto::create([
                    'news_id' => $news->id,
                    'image' => Storage::url($photoPath),
                    'caption' => $captions[$index] ?? null,
                    'sort_order' => $index,
                ]);
            }
        }

        return redirect()->route('admin.news.index')
            ->with('success', 'Berita berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        return Inertia::render('Admin/News/Show', [
            'news' => $news->load(['user', 'galleryPhotos'])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
    {
        return Inertia::render('Admin/News/Edit', [
            'news' => $news->load('galleryPhotos')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:news,slug,' . $news->id,
            'summary' => 'nullable|string',
            'content' => 'required|string',
            'category' => 'nullable|string|max:100',
            'author' => 'nullable|string|max:100',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_featured' => 'nullable|boolean',
            'gallery_photos' => 'nullable|array',
            'gallery_photos.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120',
            'gallery_captions' => 'nullable|array',
            'gallery_captions.*' => 'nullable|string|max:255',
            'removed_gallery_ids' => 'nullable|array',
            'removed_gallery_ids.*' => 'integer',
        ]);

        $data = [
            'title' => $request->title,
            'slug' => $request->slug,
            'summary' => $request->summary,
            'content' => $request->content,
            'category' => $request->category,
            'author' => $request->author,
            'is_featured' => $request->is_featured ? true : false,
        ];

        // Handle image update if provided
        if ($request->hasFile('image')) {
            if ($news->image && Storage::exists('public/' . str_replace('/storage/', '', $news->image))) {
                Storage::delete('public/' . str_replace('/storage/', '', $news->image));
            }

            $fileName = Str::random(20) . '.' . $request->file('image')->getClientOriginalExtension();
            $imagePath = $request->file('image')->storeAs('news', $fileName, 'public');
            $data['image'] = Storage::url($imagePath);
        }

        $news->update($data);

        // Handle removing gallery photos
        if ($request->removed_gallery_ids) {
            $photosToRemove = GalleryPhoto::whereIn('id', $request->removed_gallery_ids)
                ->where('news_id', $news->id)
                ->get();

            foreach ($photosToRemove as $photo) {
                $filePath = 'public/' . str_replace('/storage/', '', $photo->image);
                if (Storage::exists($filePath)) {
                    Storage::delete($filePath);
                }
                $photo->delete();
            }
        }

        // Handle new gallery photos
        if ($request->hasFile('gallery_photos')) {
            $maxOrder = $news->galleryPhotos()->max('sort_order') ?? -1;
            $captions = $request->gallery_captions ?? [];

            foreach ($request->file('gallery_photos') as $index => $photo) {
                $photoName = Str::random(20) . '.' . $photo->getClientOriginalExtension();
                $photoPath = $photo->storeAs('gallery-photos', $photoName, 'public');

                GalleryPhoto::create([
                    'news_id' => $news->id,
                    'image' => Storage::url($photoPath),
                    'caption' => $captions[$index] ?? null,
                    'sort_order' => $maxOrder + $index + 1,
                ]);
            }
        }

        return redirect()->route('admin.news.index')
            ->with('success', 'Berita berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        // Delete the main image file
        if ($news->image && Storage::exists('public/' . str_replace('/storage/', '', $news->image))) {
            Storage::delete('public/' . str_replace('/storage/', '', $news->image));
        }

        // Delete all gallery photo files
        foreach ($news->galleryPhotos as $photo) {
            $filePath = 'public/' . str_replace('/storage/', '', $photo->image);
            if (Storage::exists($filePath)) {
                Storage::delete($filePath);
            }
        }

        // Delete the news entry (gallery_photos cascade deleted by DB)
        $news->delete();

        return redirect()->route('admin.news.index')
            ->with('success', 'Berita berhasil dihapus.');
    }
}
