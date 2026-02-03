<?php

namespace App\Http\Controllers;

use App\Models\Ppdb;
use App\Models\PpdbSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Carbon\Carbon;

class PpdbController extends Controller
{
    /**
     * Tampilkan halaman informasi PPDB
     */
    public function index()
    {
        // Cek apakah user sudah login dan sudah mendaftar
        $hasRegistered = false;
        if (Auth::check()) {
            $hasRegistered = Ppdb::where('user_id', Auth::id())->exists();
        }
        
        // Get PPDB settings
        $ppdbSettings = PpdbSetting::current();
        $isOpen = $ppdbSettings ? $ppdbSettings->isCurrentlyOpen() : false;
        
        return Inertia::render('Ppdb/Index', [
            'hasRegistered' => $hasRegistered,
            'ppdbSettings' => $ppdbSettings ? [
                'isOpen' => $isOpen,
                'openDate' => $ppdbSettings->open_date?->format('Y-m-d'),
                'closeDate' => $ppdbSettings->close_date?->format('Y-m-d'),
                'academicYear' => $ppdbSettings->academic_year,
                'messageClosed' => $ppdbSettings->message_closed,
            ] : null,
        ]);
    }
    
    /**
     * Tampilkan halaman form pendaftaran
     */
    public function create()
    {
        // Cek apakah PPDB sedang dibuka
        $ppdbSettings = PpdbSetting::current();
        if (!$ppdbSettings || !$ppdbSettings->isCurrentlyOpen()) {
            return redirect()->route('ppdb.index')
                ->with('error', 'Pendaftaran PPDB saat ini sedang ditutup.');
        }
        
        // Cek apakah user sudah login
        if (!Auth::check()) {
            return redirect()->route('login')->with('message', 'Silakan login terlebih dahulu untuk mendaftar PPDB');
        }
        
        // Cek apakah user sudah pernah mendaftar
        $existingApplication = Ppdb::where('user_id', Auth::id())->first();
        if ($existingApplication) {
            return redirect()->route('ppdb.show', $existingApplication->id)
                ->with('message', 'Anda telah memiliki pendaftaran aktif');
        }
        
        // Nilai default tahun ajaran
        $currentYear = Carbon::now()->year;
        $nextYear = $currentYear + 1;
        $defaultTahunAjaran = $currentYear . ' - ' . $nextYear;
        
        return Inertia::render('Ppdb/Create', [
            'defaultTahunAjaran' => $defaultTahunAjaran
        ]);
    }
    
    /**
     * Simpan pendaftaran PPDB baru
     */
    public function store(Request $request)
    {
        try {
            // Validasi data
        $validatedData = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
                'jenis_kelamin' => 'required|string|in:Laki-laki,Perempuan,L,P',
                'nik' => 'required|string|max:255',
                'nisn' => 'required|string|max:255',
                'agama' => 'nullable|string|max:255',
                'alamat' => 'required|string|max:255',
                'rt' => 'required|string|max:10',
                'rw' => 'required|string|max:10',
                'desa' => 'required|string|max:255',
                'kecamatan' => 'required|string|max:255',
                'kabupaten' => 'required|string|max:255',
                'provinsi' => 'nullable|string|max:255',
                'kode_pos' => 'nullable|string|max:10',
            'sekolah_asal' => 'required|string|max:255',
                'alamat_sekolah' => 'nullable|string|max:255',
                'telepon_sekolah' => 'nullable|string|max:20',
                'tahun_pelajaran' => 'nullable|string|max:20',
                'is_pesantren' => 'nullable|boolean',
                'telepon_hp' => 'nullable|string|max:20',
                
                // Data orang tua
                'nama_ayah' => 'required|string|max:255',
                'nama_ibu' => 'required|string|max:255',
            'pekerjaan_ayah' => 'nullable|string|max:255',
            'pekerjaan_ibu' => 'nullable|string|max:255',
                'pendidikan_ayah' => 'nullable|string|max:255',
                'pendidikan_ibu' => 'nullable|string|max:255',
                'penghasilan_ayah' => 'nullable|string|max:255',
                'penghasilan_ibu' => 'nullable|string|max:255',
                'no_hp_ayah' => 'nullable|string|max:20',
                'no_hp_ibu' => 'nullable|string|max:20',
                
                // Alamat orang tua
                'alamat_ortu' => 'required|string|max:255',
                'rt_ortu' => 'required|string|max:10',
                'rw_ortu' => 'required|string|max:10',
                'desa_ortu' => 'required|string|max:255',
                'kecamatan_ortu' => 'required|string|max:255',
                'kabupaten_ortu' => 'required|string|max:255',
                'provinsi_ortu' => 'nullable|string|max:255',
                'kode_pos_ortu' => 'nullable|string|max:10',
                
                // File uploads (wajib saat pendaftaran baru)
                'foto' => 'required|file|mimes:jpeg,png,jpg|max:2048',
                'kk_file' => 'required|file|mimes:jpeg,png,jpg,pdf|max:2048',
                'akta_lahir_file' => 'required|file|mimes:jpeg,png,jpg,pdf|max:2048',
                'ijazah_file' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
                'rapor_file' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
                'skhun_file' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
                'ktp_ortu_file' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
            ]);
            
            // Normalisasi data jenis kelamin
            if ($validatedData['jenis_kelamin'] === 'Laki-laki') {
                $validatedData['jenis_kelamin'] = 'L';
            } else if ($validatedData['jenis_kelamin'] === 'Perempuan') {
                $validatedData['jenis_kelamin'] = 'P';
            }
        
        // Tambahkan user_id
        $validatedData['user_id'] = Auth::id();
        
        // Generate nomor pendaftaran
        $currentYear = Carbon::now()->format('Y');
        $count = Ppdb::whereYear('created_at', $currentYear)->count() + 1;
        $validatedData['nomor_pendaftaran'] = 'PPDB-' . $currentYear . str_pad($count, 4, '0', STR_PAD_LEFT);
        
            // Set status default menjadi Menunggu
            $validatedData['status'] = 'Menunggu';
            
            // Upload files dengan error handling
            try {
                // Array untuk field file
                $fileFields = [
                    'foto' => 'foto',
                    'kk_file' => 'kk_file',
                    'akta_lahir_file' => 'akta_lahir_file',
                    'ijazah_file' => 'ijazah_file',
                    'rapor_file' => 'rapor_file',
                    'skhun_file' => 'skhun_file',
                    'ktp_ortu_file' => 'ktp_ortu_file'
                ];
                
                foreach ($fileFields as $requestField => $dbField) {
                    if ($request->hasFile($requestField)) {
                        $validatedData[$dbField] = $request->file($requestField)->store('ppdb/'.str_replace('_file', '', $dbField), 'public');
                    }
                    // Jika ini adalah field wajib dan tidak ada file
                    elseif (in_array($requestField, ['foto', 'kk_file', 'akta_lahir_file']) && !$request->hasFile($requestField)) {
                        return redirect()->back()->withErrors([$requestField => 'File '.$requestField.' wajib diupload'])->withInput();
                    }
                    // Untuk ijazah dan rapor, jika tidak diupload, kita gunakan nilai default
                    elseif ($requestField === 'skhun_file' && !$request->hasFile($requestField) && $request->hasFile('ijazah_file')) {
                        // Gunakan ijazah sebagai skhun
                        $validatedData[$dbField] = $validatedData['ijazah_file'];
                    }
                    elseif ($requestField === 'ktp_ortu_file' && !$request->hasFile($requestField) && $request->hasFile('kk_file')) {
                        // Gunakan kk sebagai ktp_ortu
                        $validatedData[$dbField] = $validatedData['kk_file'];
                    }
                }
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('File Upload Error: ' . $e->getMessage());
                if ($request->expectsJson()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Terjadi kesalahan saat mengunggah berkas.',
                        'error' => $e->getMessage()
                    ], 422);
                }
                return redirect()->back()->withErrors(['upload' => 'Terjadi kesalahan saat mengunggah berkas. Silakan coba lagi. Detail: ' . $e->getMessage()])->withInput();
            }
            
            // Simpan data dengan error handling
            try {
                $ppdb = Ppdb::create($validatedData);
                
                \Illuminate\Support\Facades\Log::info('PPDB registration success: ' . $ppdb->id);
                
                if ($request->expectsJson()) {
                    return response()->json([
                        'success' => true,
                        'message' => 'Pendaftaran berhasil!',
                        'nomor_pendaftaran' => $ppdb->nomor_pendaftaran,
                        'redirect' => route('ppdb.status')
                    ]);
                }

                return redirect()->route('ppdb.show', $ppdb->id)
                    ->with('success', 'Pendaftaran berhasil! Nomor pendaftaran Anda adalah ' . $ppdb->nomor_pendaftaran . '. Data Anda akan diverifikasi oleh admin dan hasilnya dapat dilihat di halaman status pendaftaran.');
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('Database Save Error: ' . $e->getMessage());
                if ($request->expectsJson()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Terjadi kesalahan saat menyimpan data.',
                        'error' => $e->getMessage()
                    ], 500);
                }
                return redirect()->back()->withErrors(['database' => 'Terjadi kesalahan saat menyimpan data. Silakan coba lagi. Detail: ' . $e->getMessage()])->withInput();
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Illuminate\Support\Facades\Log::error('Validation Error: ' . json_encode($e->errors()));
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $e->errors()
                ], 422);
            }
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('General Error: ' . $e->getMessage());
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Terjadi kesalahan umum',
                    'error' => $e->getMessage()
                ], 500);
            }
            return redirect()->back()->withErrors(['general' => 'Terjadi kesalahan. Silakan coba lagi nanti. Detail: ' . $e->getMessage()])->withInput();
        }
    }
    
    /**
     * Tampilkan detail pendaftaran
     */
    public function show(Ppdb $ppdb)
    {
        // Verifikasi bahwa user yang sedang login adalah pemilik pendaftaran atau admin
        if (Auth::id() !== $ppdb->user_id && !Auth::user()->is_admin) {
            abort(403, 'Unauthorized action.');
        }
        
        return Inertia::render('Ppdb/Show', [
            'ppdb' => $ppdb,
        ]);
    }
    
    /**
     * Cetak formulir pendaftaran
     */
    public function print(Ppdb $ppdb)
    {
        // Verifikasi bahwa user yang sedang login adalah pemilik pendaftaran atau admin
        if (Auth::id() !== $ppdb->user_id && !Auth::user()->is_admin) {
            abort(403, 'Unauthorized action.');
        }
        
        return Inertia::render('Ppdb/Print', [
            'ppdb' => $ppdb
        ]);
    }
    
    /**
     * Tampilkan status pendaftaran
     */
    public function status()
    {
        // Cek apakah user sudah login
        if (!Auth::check()) {
            return redirect()->route('login')->with('message', 'Silakan login terlebih dahulu untuk melihat status pendaftaran');
        }
        
        // Ambil data pendaftaran user
        $applications = Ppdb::where('user_id', Auth::id())->get();
        
        return Inertia::render('Ppdb/Status', [
            'applications' => $applications
        ]);
    }

    /**
     * Tampilkan formulir edit pendaftaran
     */
    public function edit(Ppdb $ppdb)
    {
        // Verifikasi bahwa user yang sedang login adalah pemilik pendaftaran atau admin
        if (Auth::id() !== $ppdb->user_id && !Auth::user()->is_admin) {
            abort(403, 'Unauthorized action.');
        }
        
        // Tambahkan URL file untuk ditampilkan di form edit
        $ppdbData = $ppdb->toArray();
        
        // Tambahkan URL file jika ada
        if ($ppdb->foto) {
            $ppdbData['foto_url'] = asset('storage/' . $ppdb->foto);
        }
        
        if ($ppdb->kk_file) {
            $ppdbData['kk_file_url'] = asset('storage/' . $ppdb->kk_file);
        }
        
        if ($ppdb->akta_lahir_file) {
            $ppdbData['akta_lahir_file_url'] = asset('storage/' . $ppdb->akta_lahir_file);
        }
        
        if ($ppdb->ijazah_file) {
            $ppdbData['ijazah_file_url'] = asset('storage/' . $ppdb->ijazah_file);
        }
        
        if ($ppdb->rapor_file) {
            $ppdbData['rapor_file_url'] = asset('storage/' . $ppdb->rapor_file);
        }
        
        if ($ppdb->skhun_file) {
            $ppdbData['skhun_file_url'] = asset('storage/' . $ppdb->skhun_file);
        }
        
        if ($ppdb->ktp_ortu_file) {
            $ppdbData['ktp_ortu_file_url'] = asset('storage/' . $ppdb->ktp_ortu_file);
        }
        
        return Inertia::render('Ppdb/Create', [
            'existingApplication' => $ppdbData
        ]);
    }

    /**
     * Update pendaftaran yang sudah ada
     */
    public function update(Request $request, Ppdb $ppdb)
    {
        // Verifikasi bahwa user yang sedang login adalah pemilik pendaftaran atau admin
        if (Auth::id() !== $ppdb->user_id && !Auth::user()->is_admin) {
            abort(403, 'Unauthorized action.');
        }
        
        try {
            // Validasi input
            $validatedData = $request->validate([
                'nama_lengkap' => 'required|string|max:255',
                'tempat_lahir' => 'required|string|max:255',
                'tanggal_lahir' => 'required|date',
                'jenis_kelamin' => 'required|string|in:Laki-laki,Perempuan,L,P',
                'nik' => 'required|string|max:255',
                'nisn' => 'required|string|max:255',
                'agama' => 'nullable|string|max:255',
                'alamat' => 'required|string|max:255',
                'rt' => 'required|string|max:10',
                'rw' => 'required|string|max:10',
                'desa' => 'required|string|max:255',
                'kecamatan' => 'required|string|max:255',
                'kabupaten' => 'required|string|max:255',
                'provinsi' => 'nullable|string|max:255',
                'kode_pos' => 'nullable|string|max:10',
                'sekolah_asal' => 'required|string|max:255',
                'alamat_sekolah' => 'nullable|string|max:255',
                'telepon_sekolah' => 'nullable|string|max:20',
                'tahun_lulus' => 'nullable|integer',
                'is_pesantren' => 'nullable|boolean',
                'telepon_hp' => 'nullable|string|max:20',
                
                // Data orang tua
                'nama_ayah' => 'required|string|max:255',
                'nama_ibu' => 'required|string|max:255',
                'pekerjaan_ayah' => 'nullable|string|max:255',
                'pekerjaan_ibu' => 'nullable|string|max:255',
                'pendidikan_ayah' => 'nullable|string|max:255',
                'pendidikan_ibu' => 'nullable|string|max:255',
                'penghasilan_ayah' => 'nullable|string|max:255',
                'penghasilan_ibu' => 'nullable|string|max:255',
                'no_hp_ayah' => 'nullable|string|max:20',
                'no_hp_ibu' => 'nullable|string|max:20',
                
                // Alamat orang tua
                'alamat_ortu' => 'required|string|max:255',
                'rt_ortu' => 'required|string|max:10',
                'rw_ortu' => 'required|string|max:10',
                'desa_ortu' => 'required|string|max:255',
                'kecamatan_ortu' => 'required|string|max:255',
                'kabupaten_ortu' => 'required|string|max:255',
                'provinsi_ortu' => 'nullable|string|max:255',
                'kode_pos_ortu' => 'nullable|string|max:10',
                
                // File uploads (opsional saat update)
                'foto' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
                'kk_file' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
                'akta_lahir_file' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
                'ijazah_file' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
                'rapor_file' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
                'skhun_file' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
                'ktp_ortu_file' => 'nullable|file|mimes:jpeg,png,jpg,pdf|max:2048',
                
                // Flags untuk file yang sudah ada
                'foto_exists' => 'nullable|boolean',
                'kk_file_exists' => 'nullable|boolean',
                'akta_lahir_file_exists' => 'nullable|boolean',
                'ijazah_file_exists' => 'nullable|boolean',
                'rapor_file_exists' => 'nullable|boolean',
                'skhun_file_exists' => 'nullable|boolean',
                'ktp_ortu_file_exists' => 'nullable|boolean',
            ]);
            
            // Normalisasi data jenis kelamin
            if ($validatedData['jenis_kelamin'] === 'Laki-laki') {
                $validatedData['jenis_kelamin'] = 'L';
            } else if ($validatedData['jenis_kelamin'] === 'Perempuan') {
                $validatedData['jenis_kelamin'] = 'P';
            }
            
            // Definisikan array untuk menyimpan field yang akan diupdate
            $dataToUpdate = [
                'nama_lengkap' => $validatedData['nama_lengkap'],
                'tempat_lahir' => $validatedData['tempat_lahir'],
                'tanggal_lahir' => $validatedData['tanggal_lahir'],
                'jenis_kelamin' => $validatedData['jenis_kelamin'],
                'nik' => $validatedData['nik'],
                'nisn' => $validatedData['nisn'],
                'agama' => $validatedData['agama'] ?? $ppdb->agama,
                'alamat' => $validatedData['alamat'],
                'rt' => $validatedData['rt'],
                'rw' => $validatedData['rw'],
                'desa' => $validatedData['desa'],
                'kecamatan' => $validatedData['kecamatan'],
                'kabupaten' => $validatedData['kabupaten'],
                'provinsi' => $validatedData['provinsi'] ?? $ppdb->provinsi,
                'kode_pos' => $validatedData['kode_pos'] ?? $ppdb->kode_pos,
                'sekolah_asal' => $validatedData['sekolah_asal'],
                'alamat_sekolah' => $validatedData['alamat_sekolah'] ?? $ppdb->alamat_sekolah,
                'telepon_sekolah' => $validatedData['telepon_sekolah'] ?? $ppdb->telepon_sekolah,
                'tahun_lulus' => $validatedData['tahun_lulus'] ?? $ppdb->tahun_lulus,
                'is_pesantren' => $validatedData['is_pesantren'] ?? $ppdb->is_pesantren,
                'telepon_hp' => $validatedData['telepon_hp'] ?? $ppdb->telepon_hp,
                
                // Data orang tua
                'nama_ayah' => $validatedData['nama_ayah'],
                'nama_ibu' => $validatedData['nama_ibu'],
                'pekerjaan_ayah' => $validatedData['pekerjaan_ayah'] ?? $ppdb->pekerjaan_ayah,
                'pekerjaan_ibu' => $validatedData['pekerjaan_ibu'] ?? $ppdb->pekerjaan_ibu,
                'pendidikan_ayah' => $validatedData['pendidikan_ayah'] ?? $ppdb->pendidikan_ayah,
                'pendidikan_ibu' => $validatedData['pendidikan_ibu'] ?? $ppdb->pendidikan_ibu,
                'penghasilan_ayah' => $validatedData['penghasilan_ayah'] ?? $ppdb->penghasilan_ayah,
                'penghasilan_ibu' => $validatedData['penghasilan_ibu'] ?? $ppdb->penghasilan_ibu,
                'no_hp_ayah' => $validatedData['no_hp_ayah'] ?? $ppdb->no_hp_ayah,
                'no_hp_ibu' => $validatedData['no_hp_ibu'] ?? $ppdb->no_hp_ibu,
                
                // Alamat orang tua
                'alamat_ortu' => $validatedData['alamat_ortu'],
                'rt_ortu' => $validatedData['rt_ortu'],
                'rw_ortu' => $validatedData['rw_ortu'],
                'desa_ortu' => $validatedData['desa_ortu'],
                'kecamatan_ortu' => $validatedData['kecamatan_ortu'],
                'kabupaten_ortu' => $validatedData['kabupaten_ortu'],
                'provinsi_ortu' => $validatedData['provinsi_ortu'] ?? $ppdb->provinsi_ortu,
                'kode_pos_ortu' => $validatedData['kode_pos_ortu'] ?? $ppdb->kode_pos_ortu,
            ];
            
            // Upload files dengan error handling, hanya jika file baru diupload
            try {
                $fileFields = [
                    'foto' => 'foto',
                    'kk_file' => 'kk_file',
                    'akta_lahir_file' => 'akta_lahir_file',
                    'ijazah_file' => 'ijazah_file',
                    'rapor_file' => 'rapor_file',
                    'skhun_file' => 'skhun_file',
                    'ktp_ortu_file' => 'ktp_ortu_file'
                ];
                
                foreach ($fileFields as $requestField => $dbField) {
                    // Cek apakah file baru diupload
                    if ($request->hasFile($requestField)) {
                        // Hapus file lama jika ada
                        if ($ppdb->$dbField && Storage::disk('public')->exists($ppdb->$dbField)) {
                            Storage::disk('public')->delete($ppdb->$dbField);
                        }
                        
                        // Upload file baru
                        $dataToUpdate[$dbField] = $request->file($requestField)->store('ppdb/'.str_replace('_file', '', $dbField), 'public');
                    }
                    // Jika tidak ada file baru, periksa apakah kita perlu mempertahankan file yang ada
                    elseif (isset($validatedData[$requestField.'_exists']) && $validatedData[$requestField.'_exists']) {
                        // File sudah ada sebelumnya dan tidak perlu diubah
                        // Tidak perlu update field ini
                    }
                    // Jika tidak ada file baru dan tidak ada flag bahwa file sudah ada
                    elseif (!$request->hasFile($requestField) && !isset($validatedData[$requestField.'_exists'])) {
                        // Ini kasus khusus: jika kita mengedit dan field ini wajib diisi
                        // Tapi karena ini update, kita bisa cek apakah sudah ada file sebelumnya
                        if (!$ppdb->$dbField) {
                            // Hanya berikan pesan error jika ini field wajib dan belum ada sebelumnya
                            if (in_array($requestField, ['foto', 'kk_file', 'akta_lahir_file'])) {
                                return redirect()->back()->withErrors([$requestField => 'The '.$requestField.' field is required.'])->withInput();
                            }
                        }
                    }
                }
                
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('File Upload Error: ' . $e->getMessage());
                if ($request->expectsJson()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Terjadi kesalahan saat mengunggah berkas.',
                        'error' => $e->getMessage()
                    ], 422);
                }
                return redirect()->back()->withErrors(['upload' => 'Terjadi kesalahan saat mengunggah berkas. Silakan coba lagi. Detail: ' . $e->getMessage()])->withInput();
            }
            
            // Update data pendaftaran
            $ppdb->update($dataToUpdate);
            
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Data pendaftaran berhasil diperbarui!',
                    'redirect' => route('ppdb.show', $ppdb->id)
                ]);
            }
            
            return redirect()->route('ppdb.show', $ppdb->id)
                    ->with('success', 'Data pendaftaran berhasil diperbarui!');
                
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Illuminate\Support\Facades\Log::error('Validation Error: ' . json_encode($e->errors()));
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validasi gagal',
                    'errors' => $e->errors()
                ], 422);
            }
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('General Error: ' . $e->getMessage());
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Terjadi kesalahan umum',
                    'error' => $e->getMessage()
                ], 500);
            }
            return redirect()->back()->withErrors(['general' => 'Terjadi kesalahan. Silakan coba lagi nanti. Detail: ' . $e->getMessage()])->withInput();
        }
    }
}
