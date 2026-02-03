<?php

use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ExtracurricularController;
use App\Http\Controllers\PpdbController;
use App\Http\Controllers\Admin\PpdbAdminController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\StrukturController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/profil-sekolah', [HomeController::class, 'profile'])->name('profile');
Route::get('/program-keahlian', [HomeController::class, 'programKeahlian'])->name('program-keahlian');
Route::get('/gallery', [HomeController::class, 'gallery'])->name('gallery');
Route::get('/berita', [HomeController::class, 'news'])->name('news');
Route::get('/berita/{slug}', [HomeController::class, 'newsDetail'])->name('news.detail');
Route::get('/kontak', [HomeController::class, 'contact'])->name('contact');

// Ekstrakurikuler routes
Route::get('/ekstrakurikuler', [ExtracurricularController::class, 'index'])->name('extracurricular');
Route::get('/ekstrakurikuler/{slug}', [ExtracurricularController::class, 'show'])->name('extracurricular.detail');

// Struktur Organisasi routes
Route::get('/struktur-organisasi', [StrukturController::class, 'index'])->name('struktur.index');

// PPDB routes
Route::get('/ppdb', [PpdbController::class, 'index'])->name('ppdb.index');
Route::get('/ppdb/pendaftaran', [PpdbController::class, 'create'])->name('ppdb.create');
Route::post('/ppdb/pendaftaran', [PpdbController::class, 'store'])->name('ppdb.store');
Route::get('/ppdb/status', [PpdbController::class, 'status'])->name('ppdb.status');
Route::get('/ppdb/{ppdb}', [PpdbController::class, 'show'])->name('ppdb.show');
Route::get('/ppdb/{ppdb}/cetak', [PpdbController::class, 'print'])->name('ppdb.print');
Route::get('/ppdb/{ppdb}/edit', [PpdbController::class, 'edit'])->name('ppdb.edit');
Route::post('/ppdb/pendaftaran/{ppdb}/update', [PpdbController::class, 'update'])->name('ppdb.update');

// Authentication routes
Route::middleware('auth')->group(function () {
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile/destroy', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin routes
Route::prefix('admin')->middleware(['auth', AdminMiddleware::class])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Gallery Routes
    Route::resource('gallery', GalleryController::class)->names([
        'index' => 'admin.gallery.index',
        'create' => 'admin.gallery.create',
        'store' => 'admin.gallery.store',
        'show' => 'admin.gallery.show',
        'edit' => 'admin.gallery.edit',
        'update' => 'admin.gallery.update',
        'destroy' => 'admin.gallery.destroy',
    ]);
    
    // News Routes
    Route::resource('news', NewsController::class)->names([
        'index' => 'admin.news.index',
        'create' => 'admin.news.create',
        'store' => 'admin.news.store',
        'show' => 'admin.news.show',
        'edit' => 'admin.news.edit',
        'update' => 'admin.news.update',
        'destroy' => 'admin.news.destroy',
    ]);

    // Ekstrakurikuler management
    Route::resource('extracurriculars', \App\Http\Controllers\Admin\ExtracurricularController::class)->names([
        'index' => 'admin.extracurriculars.index',
        'create' => 'admin.extracurriculars.create',
        'store' => 'admin.extracurriculars.store',
        'show' => 'admin.extracurriculars.show',
        'edit' => 'admin.extracurriculars.edit',
        'update' => 'admin.extracurriculars.update',
        'destroy' => 'admin.extracurriculars.destroy',
    ]);
    
    // PPDB management
    Route::get('/ppdb', [PpdbAdminController::class, 'index'])->name('admin.ppdb.index');
    Route::get('/ppdb/dashboard', [PpdbAdminController::class, 'dashboard'])->name('admin.ppdb.dashboard');
    Route::get('/ppdb/settings', [PpdbAdminController::class, 'settings'])->name('admin.ppdb.settings');
    Route::put('/ppdb/settings', [PpdbAdminController::class, 'updateSettings'])->name('admin.ppdb.settings.update');
    Route::get('/ppdb/export', [PpdbAdminController::class, 'export'])->name('admin.ppdb.export');
    Route::get('/ppdb/{ppdb}', [PpdbAdminController::class, 'show'])->name('admin.ppdb.show');
    Route::put('/ppdb/{ppdb}/status', [PpdbAdminController::class, 'updateStatus'])->name('admin.ppdb.update-status');
    Route::get('/ppdb/{ppdb}/cetak', [PpdbAdminController::class, 'print'])->name('admin.ppdb.print');
    Route::delete('/ppdb/{ppdb}', [PpdbAdminController::class, 'destroy'])->name('admin.ppdb.destroy');
    
    // User management
    Route::resource('users', UserController::class)->names([
        'index' => 'admin.users.index',
        'create' => 'admin.users.create',
        'store' => 'admin.users.store',
        'show' => 'admin.users.show',
        'edit' => 'admin.users.edit',
        'update' => 'admin.users.update',
        'destroy' => 'admin.users.destroy',
    ]);
    
    // Teacher management
    Route::resource('teachers', TeacherController::class)->names([
        'index' => 'admin.teachers.index',
        'create' => 'admin.teachers.create',
        'store' => 'admin.teachers.store',
        'show' => 'admin.teachers.show',
        'edit' => 'admin.teachers.edit',
        'update' => 'admin.teachers.update',
        'destroy' => 'admin.teachers.destroy',
    ]);
});

require __DIR__.'/auth.php';
