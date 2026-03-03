import React, { useState, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Upload, X, Images, Plus } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';
import { Editor } from '@tinymce/tinymce-react';

interface GalleryPhotoItem {
  id: number;
  image: string;
  caption: string | null;
  sort_order: number;
}

interface News {
  id: number;
  title: string;
  summary: string | null;
  content: string;
  image: string;
  category: string | null;
  author: string | null;
  slug: string;
  is_featured: boolean;
  gallery_photos: GalleryPhotoItem[];
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

  // Gallery state
  const [existingPhotos, setExistingPhotos] = useState<GalleryPhotoItem[]>(news.gallery_photos || []);
  const [removedGalleryIds, setRemovedGalleryIds] = useState<number[]>([]);
  const [newGalleryPhotos, setNewGalleryPhotos] = useState<File[]>([]);
  const [newGalleryPreviews, setNewGalleryPreviews] = useState<string[]>([]);
  const [newGalleryCaptions, setNewGalleryCaptions] = useState<string[]>([]);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const availableCategories = ['Akademik', 'Kegiatan Sekolah', 'Prestasi', 'Pengumuman', 'Artikel', 'Lainnya'];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImageChanged(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (errors.image) {
        const newErrors = { ...errors };
        delete newErrors.image;
        setErrors(newErrors);
      }
    }
  };

  const removeImage = () => {
    if (imageChanged) {
      setImage(null);
      setImagePreview(news.image);
      setImageChanged(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      setImagePreview(null);
    }
  };

  // Gallery handlers
  const removeExistingPhoto = (photoId: number) => {
    setRemovedGalleryIds(prev => [...prev, photoId]);
    setExistingPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const newPreviews: string[] = [];
    let loaded = 0;

    newFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews[index] = reader.result as string;
        loaded++;
        if (loaded === newFiles.length) {
          setNewGalleryPhotos(prev => [...prev, ...newFiles]);
          setNewGalleryPreviews(prev => [...prev, ...newPreviews]);
          setNewGalleryCaptions(prev => [...prev, ...newFiles.map(() => '')]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (galleryInputRef.current) {
      galleryInputRef.current.value = '';
    }
  };

  const removeNewGalleryPhoto = (index: number) => {
    setNewGalleryPhotos(prev => prev.filter((_, i) => i !== index));
    setNewGalleryPreviews(prev => prev.filter((_, i) => i !== index));
    setNewGalleryCaptions(prev => prev.filter((_, i) => i !== index));
  };

  const updateNewGalleryCaption = (index: number, caption: string) => {
    setNewGalleryCaptions(prev => {
      const updated = [...prev];
      updated[index] = caption;
      return updated;
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Judul wajib diisi';
    }

    if (!content.trim()) {
      newErrors.content = 'Konten berita wajib diisi';
    }

    if (image) {
      const maxSize = 2 * 1024 * 1024;
      if (image.size > maxSize) {
        newErrors.image = 'Ukuran gambar maksimal 2MB';
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!allowedTypes.includes(image.type)) {
        newErrors.image = 'Format gambar harus JPG, PNG, atau WebP';
      }
    }

    // Validate new gallery photos
    const maxGallerySize = 5 * 1024 * 1024;
    const allowedGalleryTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    for (let i = 0; i < newGalleryPhotos.length; i++) {
      if (newGalleryPhotos[i].size > maxGallerySize) {
        newErrors.gallery = `Foto galeri ke-${i + 1} melebihi ukuran maksimal 5MB`;
        break;
      }
      if (!allowedGalleryTypes.includes(newGalleryPhotos[i].type)) {
        newErrors.gallery = `Foto galeri ke-${i + 1} format tidak didukung`;
        break;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }

    if (!validateForm() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('_method', 'PUT');
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

    // Append removed gallery IDs
    removedGalleryIds.forEach((id, index) => {
      formData.append(`removed_gallery_ids[${index}]`, id.toString());
    });

    // Append new gallery photos
    newGalleryPhotos.forEach((photo, index) => {
      formData.append(`gallery_photos[${index}]`, photo);
      formData.append(`gallery_captions[${index}]`, newGalleryCaptions[index] || '');
    });

    router.post(`/admin/news/${news.slug}`, formData, {
      onSuccess: () => {
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

  const totalPhotos = existingPhotos.length + newGalleryPhotos.length;

  return (
    <AdminLayout>
      <Head title="Edit Berita - SMK IT Baitul Aziz" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/admin/news"
            className="text-gray-800 hover:text-blue-800 inline-flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kembali ke Daftar Berita
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">Edit Berita</h1>
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
                    onChange={(e) => setTitle(e.target.value)}
                    className={`block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4 ${errors.title ? 'border-red-300' : ''}`}
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
                    placeholder="slug-berita"
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
                      onInit={(evt, editor) => {
                        editorRef.current = editor;
                      }}
                      initialValue={content}
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

                {/* Galeri Foto */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Images className="h-5 w-5 text-blue-500" />
                      <h3 className="font-semibold text-gray-900">Galeri Foto</h3>
                    </div>
                    <span className="text-xs text-gray-400">{totalPhotos} foto</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Kelola foto galeri untuk berita ini.
                  </p>

                  {/* Existing Gallery Photos */}
                  {existingPhotos.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Foto yang ada</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {existingPhotos.map((photo) => (
                          <div key={photo.id} className="relative group">
                            <div className="relative rounded-xl overflow-hidden shadow-sm ring-1 ring-gray-200">
                              <img
                                src={photo.image}
                                alt={photo.caption || 'Gallery photo'}
                                className="w-full h-32 object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => removeExistingPhoto(photo.id)}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-lg shadow-lg transition-all opacity-0 group-hover:opacity-100"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            {photo.caption && (
                              <p className="mt-1 text-xs text-gray-500 truncate">{photo.caption}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* New Gallery Photos Preview */}
                  {newGalleryPreviews.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Foto baru</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {newGalleryPreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <div className="relative rounded-xl overflow-hidden shadow-sm ring-1 ring-green-200">
                              <img
                                src={preview}
                                alt={`New gallery ${index + 1}`}
                                className="w-full h-32 object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => removeNewGalleryPhoto(index)}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-lg shadow-lg transition-all opacity-0 group-hover:opacity-100"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                              <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                                BARU
                              </div>
                            </div>
                            <input
                              type="text"
                              value={newGalleryCaptions[index] || ''}
                              onChange={(e) => updateNewGalleryCaption(index, e.target.value)}
                              className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs py-1.5 px-2"
                              placeholder="Keterangan foto..."
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add Photos Button */}
                  <div
                    onClick={() => galleryInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex justify-center items-center flex-col cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300 group bg-white"
                  >
                    <div className="p-2.5 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors mb-2">
                      <Plus className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
                      Tambah Foto Galeri
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Max 5MB per foto (JPG/PNG/WebP)</p>
                    <input
                      type="file"
                      ref={galleryInputRef}
                      className="hidden"
                      onChange={handleGalleryChange}
                      accept="image/jpeg,image/png,image/jpg,image/webp"
                      multiple
                    />
                  </div>
                  {errors.gallery && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                      {errors.gallery}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Gambar Berita */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Gambar Utama
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
                        Klik untuk unggah gambar baru
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
                            {imageChanged ? 'Kembalikan' : 'Ubah'}
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
                className={`inline-flex justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md transform hover:-translate-y-0.5'}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Menyimpan...
                  </>
                ) : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Edit;