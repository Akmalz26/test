import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, X } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';

interface CreateProps { }

export default function Create({ }: CreateProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    description: '',
    image: null as File | null,
    schedule: '',
    coach: '',
    location: '',
    is_active: true
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post(route('admin.extracurriculars.store'), {
      onSuccess: () => {
        reset();
        setPreview(null);
      }
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('image', file);

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
    setPreview(null);
  };

  return (
    <AdminLayout>
      <Head title="Tambah Ekstrakurikuler" />

      <div className="container px-6 mx-auto">
        <div className="flex items-center justify-between py-4 mb-6">
          <div className="flex items-center">
            <Link
              href={route('admin.extracurriculars.index')}
              className="inline-flex items-center mr-4 text-white hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-semibold text-white">Tambah Ekstrakurikuler Baru</h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Informasi Dasar</h3>

                  {/* Nama Ekstrakurikuler */}
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nama Ekstrakurikuler <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4 transition-all"
                      placeholder="Contoh: Pramuka, Futsal, Rohis..."
                      required
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Deskripsi */}
                  <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                      Deskripsi Lengkap
                    </label>
                    <textarea
                      id="description"
                      rows={6}
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4 transition-all"
                      placeholder="Jelaskan tentang kegiatan ekstrakurikuler ini, visi misi, atau prestasi yang pernah diraih..."
                    ></textarea>
                    {errors.description && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">Detail Kegiatan</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pembina */}
                    <div>
                      <label htmlFor="coach" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nama Pembina
                      </label>
                      <input
                        type="text"
                        id="coach"
                        value={data.coach}
                        onChange={(e) => setData('coach', e.target.value)}
                        className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4 transition-all"
                        placeholder="Nama Lengkap Pembina"
                      />
                      {errors.coach && (
                        <p className="mt-2 text-sm text-red-600">{errors.coach}</p>
                      )}
                    </div>

                    {/* Lokasi */}
                    <div>
                      <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                        Lokasi Latihan
                      </label>
                      <input
                        type="text"
                        id="location"
                        value={data.location}
                        onChange={(e) => setData('location', e.target.value)}
                        className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4 transition-all"
                        placeholder="Lapangan, Aula, Lab..."
                      />
                      {errors.location && (
                        <p className="mt-2 text-sm text-red-600">{errors.location}</p>
                      )}
                    </div>

                    {/* Jadwal */}
                    <div className="md:col-span-2">
                      <label htmlFor="schedule" className="block text-sm font-semibold text-gray-700 mb-2">
                        Jadwal Kegiatan
                      </label>
                      <input
                        type="text"
                        id="schedule"
                        value={data.schedule}
                        onChange={(e) => setData('schedule', e.target.value)}
                        className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-3 px-4 transition-all"
                        placeholder="Contoh: Setiap Hari Jumat, Pukul 14.00 - 16.00 WIB"
                      />
                      {errors.schedule && (
                        <p className="mt-2 text-sm text-red-600">{errors.schedule}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar (Image & Status) */}
              <div className="space-y-6">
                {/* Gambar */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Logo / Foto Kegiatan
                  </label>

                  {!preview ? (
                    <div className="mt-1 border-2 border-dashed border-gray-300 rounded-xl p-8 flex justify-center items-center flex-col cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 group bg-white">
                      <label
                        htmlFor="image"
                        className="w-full flex flex-col items-center cursor-pointer"
                      >
                        <div className="p-3 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors mb-3">
                          <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors text-center">
                          Klik untuk unggah foto
                        </p>
                        <p className="text-xs text-gray-400 mt-1 text-center">
                          PNG, JPG, GIF (Max 2MB)
                        </p>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          className="hidden"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="mt-1 relative group">
                      <div className="relative rounded-xl overflow-hidden shadow-md ring-2 ring-blue-100 bg-white">
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 flex justify-end">
                          <button
                            type="button"
                            onClick={removeImage}
                            className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center gap-1.5 text-xs font-medium"
                          >
                            <X className="w-3.5 h-3.5" />
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

                {/* Status */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <label htmlFor="is_active" className="block text-sm font-semibold text-gray-700 mb-3">
                    Status Aktivitas
                  </label>
                  <div className="relative">
                    <select
                      id="is_active"
                      value={data.is_active ? '1' : '0'}
                      onChange={(e) => {
                        const isActive = e.target.value === '1';
                        setData('is_active', isActive as any);
                      }}
                      className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 px-3 appearance-none bg-white"
                    >
                      <option value="1">Aktif</option>
                      <option value="0">Tidak Aktif</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Ekstrakurikuler yang tidak aktif tidak akan ditampilkan di halaman publik.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-8 border-t border-gray-100 mt-8">
              <Link
                href={route('admin.extracurriculars.index')}
                className="inline-flex justify-center py-2.5 px-6 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
              >
                Batal
              </Link>
              <button
                type="submit"
                disabled={processing}
                className={`inline-flex justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-xl text-black bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${processing ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md transform hover:-translate-y-0.5'}`}
              >
                {processing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Ekstrakurikuler
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
} 