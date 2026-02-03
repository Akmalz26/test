import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { ArrowLeft, Save, X } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Extracurricular {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  schedule: string | null;
  coach: string | null;
  location: string | null;
  is_active: boolean;
  order: number;
  user_id: number | null;
  created_at: string;
  updated_at: string;
  user: User | null;
}

interface EditProps {
  extracurricular: Extracurricular;
}

export default function Edit({ extracurricular }: EditProps) {
  const { data, setData, put, processing, errors } = useForm({
    name: extracurricular.name || '',
    description: extracurricular.description || '',
    image: null as File | null,
    schedule: extracurricular.schedule || '',
    coach: extracurricular.coach || '',
    location: extracurricular.location || '',
    is_active: extracurricular.is_active,
    remove_image: false,
    _method: 'PUT'
  });

  const [preview, setPreview] = useState<string | null>(
    extracurricular.image ? `/storage/${extracurricular.image}` : null
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', data.name);
    formData.append('description', data.description || '');
    formData.append('schedule', data.schedule || '');
    formData.append('coach', data.coach || '');
    formData.append('location', data.location || '');
    formData.append('is_active', data.is_active ? '1' : '0');
    formData.append('remove_image', data.remove_image ? '1' : '0');
    
    if (data.image instanceof File) {
      formData.append('image', data.image);
    }
    
    router.post(route('admin.extracurriculars.update', extracurricular.id), formData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('image', file);
      setData('remove_image', false);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setData('image', null);
    setData('remove_image', true);
    setPreview(null);
  };

  return (
    <AdminLayout>
      <Head title={`Edit Ekstrakurikuler - ${extracurricular.name}`} />

      <div className="container px-6 mx-auto">
        <div className="flex items-center justify-between py-4 mb-6">
          <div className="flex items-center">
            <Link
              href={route('admin.extracurriculars.index')}
              className="inline-flex items-center mr-4 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900">Edit Ekstrakurikuler</h1>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-md rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="p-6 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {/* Nama Ekstrakurikuler */}
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Ekstrakurikuler<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Pembina */}
                  <div className="mb-6">
                    <label htmlFor="coach" className="block text-sm font-medium text-gray-700 mb-1">
                      Pembina
                    </label>
                    <input
                      type="text"
                      id="coach"
                      value={data.coach}
                      onChange={(e) => setData('coach', e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.coach && (
                      <p className="mt-1 text-sm text-red-600">{errors.coach}</p>
                    )}
                  </div>

                  {/* Jadwal */}
                  <div className="mb-6">
                    <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-1">
                      Jadwal
                    </label>
                    <input
                      type="text"
                      id="schedule"
                      value={data.schedule}
                      onChange={(e) => setData('schedule', e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="contoh: Setiap Senin, 15:00 - 17:00"
                    />
                    {errors.schedule && (
                      <p className="mt-1 text-sm text-red-600">{errors.schedule}</p>
                    )}
                  </div>

                  {/* Lokasi */}
                  <div className="mb-6">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Lokasi
                    </label>
                    <input
                      type="text"
                      id="location"
                      value={data.location}
                      onChange={(e) => setData('location', e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="mb-6">
                    <label htmlFor="is_active" className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      id="is_active"
                      value={data.is_active ? '1' : '0'}
                      onChange={(e) => setData('is_active', e.target.value === '1')}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="1">Aktif</option>
                      <option value="0">Tidak Aktif</option>
                    </select>
                  </div>
                </div>

                <div>
                  {/* Gambar */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gambar</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      {preview ? (
                        <div className="relative w-full">
                          <img
                            src={preview}
                            alt="Preview"
                            className="mx-auto h-48 object-contain"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                            title="Hapus gambar"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="image"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                              <span>Upload gambar</span>
                              <input
                                id="image"
                                name="image"
                                type="file"
                                className="sr-only"
                                onChange={handleImageChange}
                                accept="image/*"
                              />
                            </label>
                            <p className="pl-1">atau drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF hingga 2MB</p>
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Kosongkan jika tidak ingin mengubah gambar
                    </p>
                    {errors.image && (
                      <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                    )}
                  </div>

                  {/* Deskripsi */}
                  <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Deskripsi
                    </label>
                    <textarea
                      id="description"
                      rows={8}
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    ></textarea>
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-3 bg-gray-50 flex items-center justify-between">
              <Link
                href={route('admin.extracurriculars.index')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Batal
              </Link>
              <button
                type="submit"
                disabled={processing}
                className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${processing ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                <Save className="w-4 h-4 mr-2" />
                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
} 