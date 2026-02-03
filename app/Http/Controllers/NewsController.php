<?php

namespace App\Http\Controllers;

use App\Models\News;
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
            'is_featured' => 'nullable|boolean'
        ]);

        $imagePath = null;
        
        if ($request->hasFile('image')) {
            // Generate a unique name for the image
            $fileName = Str::random(20) . '.' . $request->file('image')->getClientOriginalExtension();
            
            // Store the image in the public storage
            $imagePath = $request->file('image')->storeAs('news', $fileName, 'public');
        }

        $news = News::create([
            'title' => $request->title,
            'slug' => $request->slug, // Use provided slug
            'summary' => $request->summary,
            'content' => $request->content,
            'category' => $request->category,
            'author' => $request->author,
            'image' => $imagePath ? Storage::url($imagePath) : null,
            'is_featured' => $request->is_featured ? true : false,
            'user_id' => Auth::id()
        ]);

        return redirect()->route('admin.news.index')
                        ->with('success', 'Berita berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        return Inertia::render('Admin/News/Show', [
            'news' => $news->load('user')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
    {
        return Inertia::render('Admin/News/Edit', [
            'news' => $news
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
            'is_featured' => 'nullable|boolean'
        ]);

        $data = [
            'title' => $request->title,
            'slug' => $request->slug, // Use provided slug
            'summary' => $request->summary,
            'content' => $request->content,
            'category' => $request->category,
            'author' => $request->author,
            'is_featured' => $request->is_featured ? true : false,
        ];

        // Handle image update if provided
        if ($request->hasFile('image')) {
            // Remove the old image if exists
            if ($news->image && Storage::exists('public/' . str_replace('/storage/', '', $news->image))) {
                Storage::delete('public/' . str_replace('/storage/', '', $news->image));
            }

            // Generate a unique name for the new image
            $fileName = Str::random(20) . '.' . $request->file('image')->getClientOriginalExtension();
            
            // Store the new image
            $imagePath = $request->file('image')->storeAs('news', $fileName, 'public');
            
            $data['image'] = Storage::url($imagePath);
        }

        $news->update($data);

        return redirect()->route('admin.news.index')
                        ->with('success', 'Berita berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        // Delete the image file
        if ($news->image && Storage::exists('public/' . str_replace('/storage/', '', $news->image))) {
            Storage::delete('public/' . str_replace('/storage/', '', $news->image));
        }

        // Delete the news entry
        $news->delete();

        return redirect()->route('admin.news.index')
                        ->with('success', 'Berita berhasil dihapus.');
    }
}
