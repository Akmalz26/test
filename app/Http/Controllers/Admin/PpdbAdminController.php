<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ppdb;
use App\Models\PpdbSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Font;

class PpdbAdminController extends Controller
{
    /**
     * Menampilkan daftar pendaftaran PPDB
     */
    public function index(Request $request)
    {
        $query = Ppdb::with('user');
        
        // Filter berdasarkan pencarian
        if ($request->has('search') && $request->search !== '') {
            $query->where(function($q) use ($request) {
                $q->where('nama_lengkap', 'like', '%' . $request->search . '%')
                  ->orWhere('nomor_pendaftaran', 'like', '%' . $request->search . '%')
                  ->orWhere('nisn', 'like', '%' . $request->search . '%');
            });
        }
        
        // Filter berdasarkan status
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }
        
        // Filter berdasarkan jurusan
        if ($request->has('jurusan') && $request->jurusan !== '') {
            $query->where(function($q) use ($request) {
                $q->where('jurusan_1', $request->jurusan)
                  ->orWhere('jurusan_2', $request->jurusan);
            });
        }
        
        // Filter berdasarkan tahun
        if ($request->has('tahun') && $request->tahun !== '') {
            $query->whereYear('created_at', $request->tahun);
        }
        
        $applications = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();
        
        // Statistik
        $stats = [
            'total' => Ppdb::count(),
            'menunggu' => Ppdb::where('status', 'Menunggu')->count(),
            'diterima' => Ppdb::where('status', 'Diterima')->count(),
            'ditolak' => Ppdb::where('status', 'Ditolak')->count()
        ];

        return Inertia::render('Admin/Ppdb/Index', [
            'applications' => $applications,
            'filters' => $request->only(['search', 'status', 'jurusan', 'tahun']),
            'stats' => $stats
        ]);
    }

    /**
     * Menampilkan dashboard PPDB
     */
    public function dashboard()
    {
        // Statistik
        $stats = [
            'total' => Ppdb::count(),
            'menunggu' => Ppdb::where('status', 'Menunggu')->count(),
            'verifikasi' => Ppdb::where('status', 'Verifikasi')->count(),
            'diterima' => Ppdb::where('status', 'Diterima')->count(),
            'ditolak' => Ppdb::where('status', 'Ditolak')->count(),
            'cadangan' => Ppdb::where('status', 'Cadangan')->count()
        ];
        
        // Pendaftar terbaru
        $recent = Ppdb::with('user')
                    ->orderBy('created_at', 'desc')
                    ->limit(5)
                    ->get();
        
        // Data jurusan
        $jurusan = [
            [
                'nama' => 'PPLG (Program Pengembangan Perangkat Lunak dan Gim)',
                'total' => Ppdb::count(),
                'kuota' => 40
            ]
        ];
        
        return Inertia::render('Admin/Ppdb/Dashboard', [
            'stats' => $stats,
            'recent' => $recent,
            'jurusan' => $jurusan
        ]);
    }

    /**
     * Menampilkan detail pendaftaran
     */
    public function show(Ppdb $ppdb)
    {
        // Dokumen
        $documents = [];
        
        if ($ppdb->foto) {
            $documents[] = [
                'name' => 'Foto',
                'size' => '–',
                'url' => $ppdb->foto_url
            ];
        }
        
        if ($ppdb->rapor_file) {
            $documents[] = [
                'name' => 'Rapor',
                'size' => '–',
                'url' => $ppdb->rapor_file_url
            ];
        }
        
        if ($ppdb->ijazah_file) {
            $documents[] = [
                'name' => 'Ijazah',
                'size' => '–',
                'url' => $ppdb->ijazah_file_url
            ];
        }
        
        if ($ppdb->skhun_file) {
            $documents[] = [
                'name' => 'SKHUN',
                'size' => '–',
                'url' => $ppdb->skhun_file_url
            ];
        }
        
        if ($ppdb->kk_file) {
            $documents[] = [
                'name' => 'Kartu Keluarga',
                'size' => '–',
                'url' => $ppdb->kk_file_url
            ];
        }
        
        if ($ppdb->akta_lahir_file) {
            $documents[] = [
                'name' => 'Akta Kelahiran',
                'size' => '–',
                'url' => $ppdb->akta_lahir_file_url
            ];
        }
        
        if ($ppdb->ktp_ortu_file) {
            $documents[] = [
                'name' => 'KTP Orang Tua',
                'size' => '–',
                'url' => $ppdb->ktp_ortu_file_url
            ];
        }
        
        if ($ppdb->kip_kks_kps_file) {
            $documents[] = [
                'name' => 'KIP/KKS/KPS',
                'size' => '–',
                'url' => $ppdb->kip_kks_kps_file_url
            ];
        }

        return Inertia::render('Admin/Ppdb/Show', [
            'ppdb' => $ppdb->load('user'),
            'documents' => $documents
        ]);
    }

    /**
     * Update status pendaftaran
     */
    public function updateStatus(Request $request, Ppdb $ppdb)
    {
        $validatedData = $request->validate([
            'status' => 'required|in:Menunggu,Verifikasi,Diterima,Ditolak,Cadangan',
            'notes' => 'nullable|string',
        ]);

        $ppdb->update([
            'status' => $validatedData['status'],
            'catatan' => $validatedData['notes'] ?? $ppdb->catatan
        ]);

        return redirect()->route('admin.ppdb.show', $ppdb->id)
            ->with('success', 'Status pendaftaran berhasil diupdate!');
    }

    /**
     * Mencetak formulir pendaftaran
     */
    public function print(Ppdb $ppdb)
    {
        return Inertia::render('Admin/Ppdb/Print', [
            'ppdb' => $ppdb->load('user')
        ]);
    }
    
    /**
     * Export data PPDB ke file Excel (.xlsx)
     */
    public function export()
    {
        $applications = Ppdb::with('user')->get();
        
        // Buat spreadsheet baru
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        
        // Judul kolom
        $columns = [
            'No. Pendaftaran',
            'Tanggal Daftar',
            'Nama Lengkap',
            'Jenis Kelamin',
            'NISN',
            'Tempat Lahir',
            'Tanggal Lahir',
            'Asal Sekolah',
            'Alamat Sekolah',
            'Telepon Sekolah',
            'Nama Ayah',
            'Nama Ibu',
            'Pekerjaan Ayah',
            'Pekerjaan Ibu',
            'Alamat Orang Tua',
            'No. Telepon',
            'Status'
        ];
        
        // Tulis header
        foreach ($columns as $key => $column) {
            $cell = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($key + 1) . '1';
            $sheet->setCellValue($cell, $column);
            
            // Atur format header (bold, center)
            $sheet->getStyle($cell)->getFont()->setBold(true);
            $sheet->getStyle($cell)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $sheet->getStyle($cell)->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setRGB('F5F5F5');
            $sheet->getStyle($cell)->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);
        }
        
        // Tulis data
        $row = 2;
        foreach ($applications as $ppdb) {
            $data = [
                $ppdb->nomor_pendaftaran,
                $ppdb->created_at->format('d-m-Y'),
                $ppdb->nama_lengkap,
                $ppdb->jenis_kelamin == 'L' ? 'Laki-laki' : 'Perempuan',
                $ppdb->nisn,
                $ppdb->tempat_lahir,
                $ppdb->tanggal_lahir ? $ppdb->tanggal_lahir->format('d-m-Y') : '',
                $ppdb->sekolah_asal,
                $ppdb->alamat_sekolah,
                $ppdb->telepon_sekolah,
                $ppdb->nama_ayah,
                $ppdb->nama_ibu,
                $ppdb->pekerjaan_ayah,
                $ppdb->pekerjaan_ibu,
                $ppdb->alamat_ortu,
                $ppdb->telepon_hp,
                $ppdb->status
            ];
            
            foreach ($data as $key => $value) {
                $cell = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($key + 1) . $row;
                $sheet->setCellValue($cell, $value);
                $sheet->getStyle($cell)->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);
            }
            
            $row++;
        }
        
        // Atur lebar kolom secara otomatis
        foreach (range(1, count($columns)) as $col) {
            $sheet->getColumnDimension(\PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($col))->setAutoSize(true);
        }
        
        // Buat writer dan output
        $writer = new Xlsx($spreadsheet);
        $filename = 'data_ppdb_' . date('Y-m-d') . '.xlsx';
        
        // Simpan ke output langsung
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        header('Cache-Control: max-age=0');
        
        $writer->save('php://output');
        exit;
    }

    /**
     * Display PPDB settings page
     */
    public function settings()
    {
        $settings = PpdbSetting::current();
        
        // If no settings exist, create default
        if (!$settings) {
            $settings = PpdbSetting::create([
                'is_open' => false,
                'academic_year' => date('Y') . '/' . (date('Y') + 1),
                'message_closed' => 'Pendaftaran PPDB saat ini sedang ditutup. Silakan hubungi pihak sekolah untuk informasi lebih lanjut.',
            ]);
        }

        return Inertia::render('Admin/Ppdb/Settings', [
            'settings' => $settings
        ]);
    }

    /**
     * Update PPDB settings
     */
    public function updateSettings(Request $request)
    {
        $validatedData = $request->validate([
            'is_open' => 'required|boolean',
            'open_date' => 'nullable|date',
            'close_date' => 'nullable|date|after_or_equal:open_date',
            'academic_year' => 'nullable|string|max:20',
            'message_closed' => 'nullable|string|max:500',
        ]);

        $settings = PpdbSetting::current();
        
        if (!$settings) {
            $settings = new PpdbSetting();
        }

        $settings->fill($validatedData);
        $settings->save();

        return redirect()->route('admin.ppdb.settings')
            ->with('success', 'Pengaturan PPDB berhasil disimpan!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ppdb $ppdb)
    {
        // Hapus file-file yang terkait dengan pendaftaran
        if ($ppdb->foto) {
            Storage::delete('public/' . $ppdb->foto);
        }
        
        if ($ppdb->rapor_file) {
            Storage::delete('public/' . $ppdb->rapor_file);
        }
        
        if ($ppdb->ijazah_file) {
            Storage::delete('public/' . $ppdb->ijazah_file);
        }
        
        if ($ppdb->skhun_file) {
            Storage::delete('public/' . $ppdb->skhun_file);
        }
        
        if ($ppdb->kk_file) {
            Storage::delete('public/' . $ppdb->kk_file);
        }
        
        if ($ppdb->akta_lahir_file) {
            Storage::delete('public/' . $ppdb->akta_lahir_file);
        }
        
        if ($ppdb->ktp_ortu_file) {
            Storage::delete('public/' . $ppdb->ktp_ortu_file);
        }
        
        if ($ppdb->kip_kks_kps_file) {
            Storage::delete('public/' . $ppdb->kip_kks_kps_file);
        }
        
        // Hapus data pendaftaran
        $ppdb->delete();
        
        return redirect()->route('admin.ppdb.index')->with('success', 'Data pendaftaran berhasil dihapus.');
    }
}
