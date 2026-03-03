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
Route::get('/gallery/{slug}', [HomeController::class, 'galleryDetail'])->name('gallery.detail');
Route::get('/berita', [HomeController::class, 'news'])->name('news');
Route::get('/berita/{slug}', [HomeController::class, 'newsDetail'])->name('news.detail');
Route::get('/kontak', [HomeController::class, 'contact'])->name('contact');

// Ekstrakurikuler routes
Route::get('/ekstrakurikuler', [ExtracurricularController::class, 'index'])->name('extracurricular');
Route::get('/ekstrakurikuler/{slug}', [ExtracurricularController::class, 'show'])->name('extracurricular.detail');

// Struktur Organisasi routes
Route::get('/struktur-organisasi', [StrukturController::class, 'index'])->name('struktur.index');

// SPMB public routes
Route::get('/spmb', [PpdbController::class, 'index'])->name('ppdb.index');
Route::get('/spmb/brochure/download', [PpdbController::class, 'downloadBrochure'])->name('ppdb.brochure.download');
Route::get('/spmb/pendaftaran', [PpdbController::class, 'create'])->name('ppdb.create');
Route::post('/spmb/pendaftaran', [PpdbController::class, 'store'])->name('ppdb.store');
Route::get('/spmb/status', [PpdbController::class, 'status'])->name('ppdb.status');
Route::get('/spmb/{ppdb}', [PpdbController::class, 'show'])->name('ppdb.show');
Route::get('/spmb/{ppdb}/cetak', [PpdbController::class, 'print'])->name('ppdb.print');
Route::get('/spmb/{ppdb}/edit', [PpdbController::class, 'edit'])->name('ppdb.edit');
Route::post('/spmb/pendaftaran/{ppdb}/update', [PpdbController::class, 'update'])->name('ppdb.update');


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

    // SPMB management
    Route::get('/spmb', [PpdbAdminController::class, 'index'])->name('admin.ppdb.index');
    Route::get('/spmb/dashboard', [PpdbAdminController::class, 'dashboard'])->name('admin.ppdb.dashboard');
    Route::get('/spmb/settings', [PpdbAdminController::class, 'settings'])->name('admin.ppdb.settings');
    Route::put('/spmb/settings', [PpdbAdminController::class, 'updateSettings'])->name('admin.ppdb.settings.update');
    Route::post('/spmb/settings', [PpdbAdminController::class, 'updateSettings']); // For file uploads
    Route::get('/spmb/export', [PpdbAdminController::class, 'export'])->name('admin.ppdb.export');
    Route::get('/spmb/{ppdb}', [PpdbAdminController::class, 'show'])->name('admin.ppdb.show');
    Route::put('/spmb/{ppdb}/status', [PpdbAdminController::class, 'updateStatus'])->name('admin.ppdb.update-status');
    Route::get('/spmb/{ppdb}/cetak', [PpdbAdminController::class, 'print'])->name('admin.ppdb.print');
    Route::get('/spmb/{ppdb}/download/{documentType}', [PpdbAdminController::class, 'downloadDocument'])->name('admin.ppdb.download');
    Route::delete('/spmb/{ppdb}', [PpdbAdminController::class, 'destroy'])->name('admin.ppdb.destroy');

    // SPMB Timeline management
    Route::resource('/spmb/timelines', \App\Http\Controllers\Admin\PpdbTimelineController::class)->names([
        'store' => 'admin.ppdb.timelines.store',
        'update' => 'admin.ppdb.timelines.update',
        'destroy' => 'admin.ppdb.timelines.destroy',
    ])->only(['store', 'update', 'destroy']);

    // SPMB Info Cards management
    Route::resource('/spmb/info-cards', \App\Http\Controllers\Admin\PpdbInfoCardController::class)->names([
        'store' => 'admin.ppdb.info_cards.store',
        'update' => 'admin.ppdb.info_cards.update',
        'destroy' => 'admin.ppdb.info_cards.destroy',
    ])->only(['store', 'update', 'destroy']);

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

require __DIR__ . '/auth.php';
