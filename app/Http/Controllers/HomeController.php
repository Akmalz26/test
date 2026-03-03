<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Gallery;
use App\Models\News;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index()
    {
        // Ambil data galeri yang ditandai sebagai featured (maksimal 6)
        $featuredGallery = Gallery::with('user')
            ->where('is_featured', true)
            ->latest()
            ->take(6)
            ->get();

        // Ambil berita terbaru (maksimal 3)
        $latestNews = News::with('author')
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Home', [
            'featuredGallery' => $featuredGallery,
            'latestNews' => $latestNews,
        ]);
    }

    /**
     * Display the gallery page (album view — news with gallery photos).
     */
    public function gallery()
    {
        // Ambil berita yang memiliki galeri foto, ditampilkan sebagai album
        $albums = News::with('author')
            ->withCount('galleryPhotos')
            ->has('galleryPhotos')
            ->latest()
            ->get()
            ->map(function ($news) {
                // Ambil foto pertama sebagai cover album
                $coverPhoto = $news->galleryPhotos()->first();
                return [
                    'id' => $news->id,
                    'title' => $news->title,
                    'slug' => $news->slug,
                    'summary' => $news->summary,
                    'image' => $news->image, // gambar utama berita sebagai cover
                    'cover_photo' => $coverPhoto ? $coverPhoto->image : null,
                    'category' => $news->category,
                    'photo_count' => $news->gallery_photos_count,
                    'created_at' => $news->created_at,
                    'updated_at' => $news->updated_at,
                    'author' => $news->author,
                ];
            });

        // Ambil semua kategori unik dari berita yang punya galeri
        $categories = News::has('galleryPhotos')
            ->distinct()
            ->pluck('category')
            ->filter()
            ->values();

        return Inertia::render('Gallery', [
            'albums' => $albums,
            'categories' => $categories,
        ]);
    }

    /**
     * Display a gallery album detail (all photos from a news article).
     */
    public function galleryDetail($slug)
    {
        $news = News::with(['author', 'galleryPhotos'])
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('GalleryDetail', [
            'album' => [
                'id' => $news->id,
                'title' => $news->title,
                'slug' => $news->slug,
                'summary' => $news->summary,
                'image' => $news->image,
                'category' => $news->category,
                'created_at' => $news->created_at,
                'author' => $news->author,
            ],
            'photos' => $news->galleryPhotos,
        ]);
    }

    /**
     * Display the news page.
     */
    public function news()
    {
        // Ambil semua berita
        $news = News::with('author')->latest()->get();

        // Ambil berita yang ditandai sebagai featured
        $featured = News::with('author')
            ->where('is_featured', true)
            ->latest()
            ->first();

        // Ambil semua kategori unik
        $categories = News::distinct()->pluck('category')->filter()->values();

        return Inertia::render('News', [
            'news' => $news,
            'featured' => $featured,
            'categories' => $categories,
        ]);
    }

    /**
     * Display a single news article.
     */
    public function newsDetail($slug)
    {
        // Cari berita berdasarkan slug, jika tidak ditemukan coba berdasarkan ID
        $news = News::with(['author', 'galleryPhotos'])
            ->where('slug', $slug)
            ->first();

        if (!$news && is_numeric($slug)) {
            $news = News::with(['author', 'galleryPhotos'])->find($slug);
        }

        if (!$news) {
            abort(404);
        }

        // Ambil berita terkait berdasarkan kategori yang sama (maksimal 3)
        $relatedNews = News::with('author')
            ->where('id', '!=', $news->id)
            ->where('category', $news->category)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('NewsDetail', [
            'news' => $news,
            'relatedNews' => $relatedNews,
        ]);
    }

    /**
     * Display the school profile page.
     */
    public function profile()
    {
        return Inertia::render('ProfileSekolah');
    }

    /**
     * Display the program keahlian page.
     */
    public function programKeahlian()
    {
        return Inertia::render('ProgramKeahlian');
    }

    /**
     * Display the contact page.
     */
    public function contact()
    {
        return Inertia::render('Contact');
    }
}