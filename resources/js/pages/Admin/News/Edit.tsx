import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';
import { Editor } from '@tinymce/tinymce-react';

interface News {
  id: number;
  title: string;
  summary: string | null;
  content: string;
  image: string;
  category: string | null;
  author: string | null;
  slug: string; // Added slug
  is_featured: boolean;
}

interface Props {
  news: News;
}

const Edit: React.FC<Props> = ({ news }) => {
  const [title, setTitle] = useState(news.title);
  const [summary, setSummary] = useState(news.summary || '');
  const [content, setContent] = useState(news.content);
  const [category, setCategory] = useState(news.category || '');
  const [author, setAuthor] = useState(news.author || '');
  const [slug, setSlug] = useState(news.slug);
  const [isFeatured, setIsFeatured] = useState(news.is_featured);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(news.image);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);

  // Daftar kategori yang tersedia
  const availableCategories = ['Akademik', 'Kegiatan Sekolah', 'Prestasi', 'Pengumuman', 'Artikel', 'Lainnya'];

  // Menangani perubahan file gambar
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImageChanged(true);

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

  // Menghapus gambar yang sudah dipilih dan kembali ke gambar asli
  const removeImage = () => {
    if (imageChanged) {
      setImage(null);
      setImagePreview(news.image);
      setImageChanged(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      // Jika belum ada perubahan, tetap tunjukkan form unggah
      setImagePreview(null);
    }
  };

  // Validasi form sebelum submit
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Judul wajib diisi';
    }

    if (!content.trim()) {
      newErrors.content = 'Konten berita wajib diisi';
    }

    if (image) {
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (image.size > maxSize) {
        newErrors.image = 'Ukuran gambar maksimal 2MB';
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!allowedTypes.includes(image.type)) {
        newErrors.image = 'Format gambar harus JPG, PNG, atau WebP';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Menangani submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Pastikan content dari editor disimpan
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }

    if (!validateForm() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('_method', 'PUT'); // For Laravel method spoofing
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('author', author);
    formData.append('slug', slug);
    formData.append('is_featured', isFeatured ? '1' : '0');
    if (image) {
      formData.append('image', image);
    }

    router.post(`/admin/news/${news.slug}`, formData, {
      onSuccess: () => {
        // Navigasi ke halaman daftar berita jika berhasil
        router.visit('/admin/news');
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
      <Head title="Edit Berita - SMK IT Baitul Aziz" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/admin/news"
            className="text-blue-600 hover:text-blue-800 inline-flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kembali ke Daftar Berita
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">Edit Berita</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mb-6">
              {/* Judul */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Judul Berita <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.title ? 'border-red-300' : ''}`}
                  placeholder="Masukkan judul berita"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Slug */}
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.slug ? 'border-red-300' : ''}`}
                  placeholder="slug-berita"
                />
                {errors.slug && (
                  <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
                )}
              </div>

              {/* Ringkasan */}
              <div>
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                  Ringkasan <span className="text-gray-400">(opsional)</span>
                </label>
                <textarea
                  id="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Masukkan ringkasan berita (akan ditampilkan di halaman daftar berita)"
                />
              </div>

              {/* Gambar Saat Ini / Unggah Gambar Baru */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gambar Berita
                </label>
                {!imagePreview ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 flex justify-center items-center flex-col cursor-pointer hover:border-blue-500 transition-colors"
                  >
                    <Upload className="h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Klik untuk mengunggah gambar baru
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      JPG, PNG, atau WebP (maks. 2MB)
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/jpeg,image/png,image/jpg,image/webp"
                      title="Unggah gambar baru"
                    />
                  </div>
                ) : (
                  <div className="mt-1 relative">
                    <div className="relative rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        title="Hapus gambar"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {imageChanged
                        ? 'Klik tombol silang untuk kembali ke gambar asli'
                        : 'Klik tombol silang untuk mengubah gambar'}
                    </p>
                  </div>
                )}
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                )}
              </div>

              {/* Kategori */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori <span className="text-gray-400">(opsional)</span>
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">-- Pilih Kategori --</option>
                  {availableCategories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Penulis */}
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  Penulis <span className="text-gray-400">(opsional)</span>
                </label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Nama penulis artikel (jika berbeda dari akun)"
                />
              </div>

              {/* Konten Berita */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konten Berita <span className="text-red-500">*</span>
                </label>
                <Editor
                  apiKey="your-tinymce-api-key"
                  onInit={(evt, editor) => {
                    editorRef.current = editor;
                  }}
                  initialValue={content}
                  init={{
                    height: 400,
                    menubar: true,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                      'bold italic backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                  onEditorChange={setContent}
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                )}
              </div>

              {/* Unggulan */}
              <div>
                <div className="flex items-center">
                  <input
                    id="is_featured"
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-700">
                    Jadikan sebagai berita unggulan
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Berita unggulan akan ditampilkan di bagian beranda website
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Link
                href="/admin/news"
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Batal
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Edit;