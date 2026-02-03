# Dokumentasi Fitur Struktur Organisasi & CRUD Guru

## 📋 Deskripsi
Fitur ini menambahkan sistem manajemen data guru dan struktur organisasi sekolah yang lengkap, termasuk:
- Halaman publik untuk menampilkan struktur organisasi
- Halaman publik untuk menampilkan daftar guru
- Panel admin untuk mengelola data (Create, Read, Update, Delete)

## 🗂️ File-File yang Dibuat/Dimodifikasi

### Backend Files

#### 1. Migration
- **File**: `database/migrations/2025_10_09_085328_create_teachers_table.php`
- **Deskripsi**: Membuat tabel `teachers` dengan kolom:
  - `id`, `name`, `nip`, `position`, `subject`
  - `photo`, `email`, `phone`, `education`
  - `order`, `is_active`, `type` (struktur/guru)
  - `user_id`, `timestamps`

#### 2. Model
- **File**: `app/Models/Teacher.php`
- **Fitur**:
  - Mass assignment protection
  - Photo URL accessor
  - Scopes: `struktur()`, `guru()`, `active()`
  - Relationship dengan User

#### 3. Controllers

**Admin Controller**
- **File**: `app/Http/Controllers/Admin/TeacherController.php`
- **Methods**:
  - `index()` - List dengan pagination, search, dan filter
  - `create()` - Form tambah data
  - `store()` - Simpan data baru (dengan upload foto)
  - `edit()` - Form edit data
  - `update()` - Update data (dengan upload foto)
  - `destroy()` - Hapus data (dengan hapus foto)

**Public Controller**
- **File**: `app/Http/Controllers/StrukturController.php`
- **Methods**:
  - `index()` - Tampilkan struktur organisasi dan daftar guru

#### 4. Routes
**File**: `routes/web.php`
- Public route: `/struktur-organisasi`
- Admin routes: `/admin/teachers/*` (resource route)

#### 5. Dashboard Update
**File**: `app/Http/Controllers/Admin/DashboardController.php`
- Menambahkan statistik `totalTeachers` pada dashboard admin

### Frontend Files

#### 1. Admin Pages

**Index Page**
- **File**: `resources/js/pages/Admin/Teachers/Index.tsx`
- **Fitur**:
  - Tabel daftar guru dengan foto
  - Search (nama, NIP, jabatan)
  - Filter (tipe, status)
  - Pagination
  - Statistics cards
  - Action buttons (Edit, Delete)

**Create Page**
- **File**: `resources/js/pages/Admin/Teachers/Create.tsx`
- **Fitur**:
  - Form input lengkap
  - Upload foto dengan preview
  - Validasi form
  - Auto-redirect setelah simpan

**Edit Page**
- **File**: `resources/js/pages/Admin/Teachers/Edit.tsx`
- **Fitur**:
  - Pre-fill data existing
  - Upload foto baru dengan preview
  - Update data
  - Hapus foto lama otomatis

#### 2. Public Page

**Struktur Organisasi**
- **File**: `resources/js/pages/StrukturOrganisasi.tsx`
- **Fitur**:
  - Hero section dengan gradient
  - Grid struktur organisasi (pejabat)
  - Grid daftar guru
  - Contact info (email, phone)
  - Responsive design
  - CTA section

#### 3. Navigation Updates

**Navbar**
- **File**: `resources/js/components/Navbar.tsx`
- **Update**: Menambahkan menu "Struktur Organisasi"

**Admin Sidebar**
- **File**: `resources/js/layouts/AdminLayout.tsx`
- **Update**: Menambahkan menu "Guru & Struktur"

**Admin Dashboard**
- **File**: `resources/js/pages/Admin/Dashboard.tsx`
- **Update**: 
  - Menambahkan card statistik "Guru & Struktur"
  - Menambahkan quick menu "Kelola Guru & Struktur"

## 🚀 Cara Menggunakan

### Akses Admin Panel

1. Login sebagai admin
2. Buka menu **"Guru & Struktur"** di sidebar
3. Klik **"Tambah Data"** untuk menambah guru/struktur baru
4. Isi form:
   - Pilih **Tipe**: Struktur Organisasi atau Guru
   - Upload foto (opsional)
   - Isi data lengkap (Nama, NIP, Jabatan, dll)
   - Set **Urutan Tampilan** (angka kecil = tampil duluan)
   - Centang **Aktif** untuk tampil di website
5. Klik **"Simpan"**

### Filter & Search

- **Search**: Ketik nama, NIP, atau jabatan
- **Filter Tipe**: Pilih "Struktur" atau "Guru"
- **Filter Status**: Pilih "Aktif" atau "Nonaktif"
- Klik **"Terapkan Filter"**

### Edit & Delete

- Klik icon **pensil** untuk edit
- Klik icon **tempat sampah** untuk hapus (dengan konfirmasi)

### Akses Halaman Publik

Buka: `http://localhost/struktur-organisasi` atau klik menu "Struktur Organisasi" di navbar website

## 📊 Database Schema

```sql
CREATE TABLE teachers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    nip VARCHAR(255) NULL,
    position VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NULL,
    photo VARCHAR(255) NULL,
    email VARCHAR(255) NULL,
    phone VARCHAR(255) NULL,
    education TEXT NULL,
    order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    type ENUM('struktur', 'guru') DEFAULT 'guru',
    user_id BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
```

## 🎨 Screenshot Fitur

### Admin Panel
- ✅ Dashboard dengan statistik guru
- ✅ Daftar guru dengan foto dan filter
- ✅ Form tambah/edit dengan upload foto
- ✅ Pagination dan search

### Public Website
- ✅ Hero section menarik
- ✅ Grid struktur organisasi dengan foto
- ✅ Grid daftar guru dengan info lengkap
- ✅ Contact info dan pendidikan
- ✅ Responsive design (mobile & desktop)

## 🔐 Permission

Hanya user dengan role **"admin"** yang bisa mengakses:
- `/admin/teachers/*`

Public user bisa akses:
- `/struktur-organisasi`

## 📝 Catatan Penting

1. **Upload Foto**:
   - Format: JPEG, PNG, JPG
   - Max size: 2MB
   - Otomatis disimpan di `storage/app/public/teachers/`
   - Run `php artisan storage:link` jika belum

2. **Urutan Tampilan**:
   - Angka lebih kecil = ditampilkan lebih dulu
   - Contoh: order 1 akan muncul sebelum order 2

3. **Tipe Data**:
   - **Struktur**: Untuk pejabat (Kepala Sekolah, Wakil, dll)
   - **Guru**: Untuk tenaga pengajar

4. **Status Aktif**:
   - Hanya data dengan status "Aktif" yang tampil di website publik
   - Data "Nonaktif" tetap tersimpan di database

## 🛠️ Testing

Jalankan migration:
```bash
php artisan migrate
```

Jalankan server:
```bash
php artisan serve
npm run dev
```

Akses:
- Admin: `http://localhost/admin/teachers`
- Public: `http://localhost/struktur-organisasi`

## ✨ Fitur Tambahan yang Bisa Dikembangkan

1. Export data guru ke Excel/PDF
2. Import data guru dari Excel
3. Filter berdasarkan mata pelajaran
4. Pencarian advanced (pendidikan, tahun masuk, dll)
5. Statistik per bidang studi
6. Calendar kegiatan guru
7. Performance tracking

## 📞 Support

Jika ada pertanyaan atau bug, silakan hubungi tim developer.

---

**Dibuat**: 9 Oktober 2025
**Version**: 1.0.0
**Status**: ✅ Production Ready

