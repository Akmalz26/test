import React, { useState, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';

const Create: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Daftar kategori yang tersedia
  const availableCategories = ['Kegiatan Sekolah', 'Ekstrakurikuler', 'Prestasi', 'Fasilitas', 'Lainnya'];

  // Menangani perubahan file gambar
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);

      // Membuat URL preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Hapus error jika ada
      if (errors.image) {
        const newErrors = { ...errors };
        delete newErrors.image;
        setErrors(newErrors);
      }
    }
  };

  // Menghapus gambar yang sudah dipilih
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Validasi form sebelum submit
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Judul wajib diisi';
    }

    if (!image) {
      newErrors.image = 'Foto wajib diunggah';
    } else {
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (image.size > maxSize) {
        newErrors.image = 'Ukuran foto maksimal 2MB';
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!allowedTypes.includes(image.type)) {
        newErrors.image = 'Format foto harus JPG, PNG, atau WebP';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Menangani submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('is_featured', isFeatured ? '1' : '0');
    if (image) {
      formData.append('image', image);
    }

    router.post('/admin/gallery', formData, {
      onSuccess: () => {
        // Navigasi ke halaman daftar galeri jika berhasil
        router.visit('/admin/gallery');
      },
      onError: (errors) => {
        setErrors(errors);
        setIsSubmitting(false);
      },
      onFinish: () => {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <AdminLayout>
      <Head title="Tambah Galeri - SMK IT Baitul Aziz" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/admin/gallery"
            className="text-white hover:text-blue-800 inline-flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kembali ke Daftar Galeri
          </Link>
          <h1 className="text-2xl font-bold text-white mt-2">Tambah Foto ke Galeri</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-8 mb-8">
              {/* Unggah Gambar */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Foto <span className="text-red-500">*</span>
                </label>
                {!imagePreview ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-1 border-2 border-dashed border-gray-300 rounded-xl p-10 flex justify-center items-center flex-col cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group"
                  >
                    <div className="p-4 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors mb-3">
                      <Upload className="h-8 w-8 text-blue-500" />
                    </div>
                    <p className="mt-2 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      Klik untuk mengunggah foto
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG, PNG, atau WebP (maks. 2MB)
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/jpeg,image/png,image/jpg,image/webp"
                      title="Unggah foto"
                    />
                  </div>
                ) : (
                  <div className="mt-1 relative group">
                    <div className="relative rounded-xl overflow-hidden shadow-md ring-2 ring-blue-100 max-w-md mx-auto">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex justify-end">
                        <button
                          type="button"
                          onClick={removeImage}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2 text-xs font-medium"
                          title="Hapus gambar"
                        >
                          <X className="h-4 w-4" />
                          Hapus Foto
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Klik tombol silang untuk mengganti foto
                    </p>
                  </div>
                )}
                {errors.image && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                    {errors.image}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Judul */}
                <div className="md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                    Judul <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4 ${errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Masukkan judul foto"
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                {/* Kategori */}
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                    Kategori <span className="text-gray-400 font-normal">(opsional)</span>
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4 appearance-none"
                    >
                      <option value="">-- Pilih Kategori --</option>
                      {availableCategories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Unggulan */}
                <div className="flex items-start pt-6">
                  <div className="flex items-center h-5">
                    <input
                      id="is_featured"
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="is_featured" className="font-semibold text-gray-700 select-none cursor-pointer">
                      Jadikan Foto Unggulan
                    </label>
                    <p className="text-gray-500 mt-0.5">
                      Foto akan ditampilkan di halaman depan website sekolah
                    </p>
                  </div>
                </div>
              </div>

              {/* Deskripsi */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4"
                  placeholder="Tuliskan deskripsi lengkap mengenai foto ini..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
              <Link
                href="/admin/gallery"
                className="inline-flex justify-center py-2.5 px-6 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
              >
                Batal
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-xl text-black  bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md transform hover:-translate-y-0.5'}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Menyimpan...
                  </>
                ) : 'Simpan Foto'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Create; 