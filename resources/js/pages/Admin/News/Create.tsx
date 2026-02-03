import React, { useState, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';
import { Editor } from '@tinymce/tinymce-react';

const Create: React.FC = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [slug, setSlug] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const editorRef = useRef<any>(null);

    // Helper untuk membuat slug otomatis
    const generateSlug = (text: string) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')     // Ganti spasi dengan -
            .replace(/[^\w\-]+/g, '') // Hapus karakter non-word
            .replace(/\-\-+/g, '-')   // Ganti multiple - dengan single -
            .replace(/^-+/, '')       // Hapus - di awal
            .replace(/-+$/, '');      // Hapus - di akhir
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTitle(value);

        // Auto generate slug jika user belum mengetik slug secara manual (atau kita bisa overwrite selalu)
        // Di sini saya buat overwrite selalu untuk kemudahan, kecuali user mengedit slug terpisah
        // Tapi untuk UI terbaik, biasanya slug mengikuti title selama slug belum disentuh.
        // Untuk sederhananya, kita update slug setiap title berubah.
        setSlug(generateSlug(value));
    };

    // Daftar kategori yang tersedia
    const availableCategories = ['Akademik', 'Kegiatan Sekolah', 'Prestasi', 'Pengumuman', 'Artikel', 'Lainnya'];

    // Menangani perubahan file gambar

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

        if (!content.trim()) {
            newErrors.content = 'Konten berita wajib diisi';
        }

        if (!image) {
            newErrors.image = 'Gambar berita wajib diunggah';
        } else {
            const maxSize = 2 * 1024 * 1024; // 2MB
            if (image.size > maxSize) {
                newErrors.image = 'Ukuran gambar maksimal 2MB';
            }

            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
            if (!allowedTypes.includes(image.type)) {
                newErrors.image = 'Format gambar harus JPG, PNG, atau WebP';
            }
        }

        if (!slug.trim()) {
            newErrors.slug = 'Slug wajib diisi';
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
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('content', content);
        formData.append('category', category);
        formData.append('author', author);
        formData.append('is_featured', isFeatured ? '1' : '0');
        if (image) {
            formData.append('image', image);
        }
        formData.append('slug', slug);

        router.post('/admin/news', formData, {
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
            <Head title="Tambah Berita - SMK IT Baitul Aziz" />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link
                        href="/admin/news"
                        className="text-white hover:text-blue-800 inline-flex items-center"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Kembali ke Daftar Berita
                    </Link>
                    <h1 className="text-2xl font-bold text-white mt-2">Tambah Berita Baru</h1>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Main Content */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Judul */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Judul Berita <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={handleTitleChange}
                                        className={`block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4 ${errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                                        placeholder="Masukkan judul berita"
                                    />
                                    {errors.title && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                {/* Slug */}
                                <div>
                                    <label htmlFor="slug" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Slug <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="slug"
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                        className={`block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4 ${errors.slug ? 'border-red-300' : ''}`}
                                        placeholder="slug-berita-otomatis"
                                    />
                                    {errors.slug && (
                                        <p className="mt-2 text-sm text-red-600">{errors.slug}</p>
                                    )}
                                </div>

                                {/* Ringkasan */}
                                <div>
                                    <label htmlFor="summary" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Ringkasan <span className="text-gray-400 font-normal">(opsional)</span>
                                    </label>
                                    <textarea
                                        id="summary"
                                        value={summary}
                                        onChange={(e) => setSummary(e.target.value)}
                                        rows={3}
                                        className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4"
                                        placeholder="Ringkasan singkat untuk ditampilkan di kartu berita..."
                                    />
                                </div>

                                {/* Editor Konten */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Konten Berita <span className="text-red-500">*</span>
                                    </label>
                                    <div className="rounded-xl overflow-hidden border border-gray-300 shadow-sm">
                                        <Editor
                                            apiKey='us5k11n22fvccimhy645zjsiqgkl4l5du8597i653h7qqni0'
                                            onInit={(evt, editor) => editorRef.current = editor}
                                            initialValue=""
                                            init={{
                                                height: 500,
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
                                                content_style: 'body { font-family:Inter,system-ui,sans-serif; font-size:14px }'
                                            }}
                                            onEditorChange={setContent}
                                        />
                                    </div>
                                    {errors.content && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                                            {errors.content}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Right Column - Sidebar */}
                            <div className="space-y-6">
                                {/* Gambar Berita */}
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Gambar Utama <span className="text-red-500">*</span>
                                    </label>
                                    {!imagePreview ? (
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="mt-1 border-2 border-dashed border-gray-300 rounded-xl p-8 flex justify-center items-center flex-col cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group bg-white"
                                        >
                                            <div className="p-3 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors mb-3">
                                                <Upload className="h-6 w-6 text-blue-500" />
                                            </div>
                                            <p className="mt-1 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors text-center">
                                                Klik untuk unggah
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1 text-center">
                                                Max 2MB (JPG/PNG)
                                            </p>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                onChange={handleImageChange}
                                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                            />
                                        </div>
                                    ) : (
                                        <div className="mt-1 relative group">
                                            <div className="relative rounded-xl overflow-hidden shadow-md ring-2 ring-blue-100">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-full h-48 object-cover"
                                                />
                                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 flex justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center gap-1.5 text-xs font-medium"
                                                    >
                                                        <X className="h-3.5 w-3.5" />
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {errors.image && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                                            {errors.image}
                                        </p>
                                    )}
                                </div>

                                {/* Publishing Options */}
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-5">
                                    <h3 className="font-semibold text-gray-900 border-b border-gray-200 pb-3">Opsi Publikasi</h3>

                                    {/* Kategori */}
                                    <div>
                                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                            Kategori
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="category"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 px-3 appearance-none bg-white"
                                            >
                                                <option value="">-- Pilih Kategori --</option>
                                                {availableCategories.map((cat, index) => (
                                                    <option key={index} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Penulis */}
                                    <div>
                                        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                                            Penulis <span className="text-gray-400 text-xs">(Opsional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="author"
                                            value={author}
                                            onChange={(e) => setAuthor(e.target.value)}
                                            className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 px-3 bg-white"
                                            placeholder="Nama penulis"
                                        />
                                    </div>

                                    {/* Unggulan */}
                                    <div className="flex items-start pt-2">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="is_featured"
                                                type="checkbox"
                                                checked={isFeatured}
                                                onChange={(e) => setIsFeatured(e.target.checked)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="is_featured" className="font-medium text-gray-700 cursor-pointer select-none">
                                                Berita Unggulan
                                            </label>
                                            <p className="text-gray-500 text-xs mt-0.5">
                                                Tampilkan di slide utama website
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end space-x-4 pt-8 border-t border-gray-100 mt-8">
                            <Link
                                href="/admin/news"
                                className="inline-flex justify-center py-2.5 px-6 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`inline-flex justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-xl text-black bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md transform hover:-translate-y-0.5'}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Menyimpan...
                                    </>
                                ) : 'Simpan Berita'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Create;