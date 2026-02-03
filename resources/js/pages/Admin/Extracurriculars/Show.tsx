import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
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

interface ShowProps {
  extracurricular: Extracurricular;
}

export default function Show({ extracurricular }: ShowProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminLayout>
      <Head title={`Detail Ekstrakurikuler - ${extracurricular.name}`} />

      <div className="container px-6 mx-auto">
        <div className="flex items-center justify-between py-4 mb-6">
          <div className="flex items-center">
            <Link
              href={route('admin.extracurriculars.index')}
              className="inline-flex items-center mr-4 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900">Detail Ekstrakurikuler</h1>
          </div>
          <div className="flex space-x-2">
            <Link
              href={route('admin.extracurriculars.edit', extracurricular.id)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Link>
            <Link
              href={route('admin.extracurriculars.destroy', extracurricular.id)}
              method="delete"
              as="button"
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Hapus
            </Link>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-md rounded-lg">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                {extracurricular.image ? (
                  <div className="mb-6">
                    <img
                      src={`/storage/${extracurricular.image}`}
                      alt={extracurricular.name}
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                ) : (
                  <div className="mb-6 bg-gray-200 rounded-md p-4 flex items-center justify-center h-64">
                    <span className="text-gray-500">Tidak ada gambar</span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Informasi Tambahan</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <dl className="divide-y divide-gray-200">
                      <div className="py-2 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                        <dd className="text-sm font-medium">
                          {extracurricular.is_active ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Aktif
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Tidak Aktif
                            </span>
                          )}
                        </dd>
                      </div>
                      <div className="py-2 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Urutan</dt>
                        <dd className="text-sm font-medium text-gray-900">{extracurricular.order}</dd>
                      </div>
                      <div className="py-2 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Slug</dt>
                        <dd className="text-sm font-medium text-gray-900">{extracurricular.slug}</dd>
                      </div>
                      <div className="py-2 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Dibuat pada</dt>
                        <dd className="text-sm font-medium text-gray-900">
                          {formatDate(extracurricular.created_at)}
                        </dd>
                      </div>
                      <div className="py-2 flex justify-between">
                        <dt className="text-sm font-medium text-gray-500">Diperbarui pada</dt>
                        <dd className="text-sm font-medium text-gray-900">
                          {formatDate(extracurricular.updated_at)}
                        </dd>
                      </div>
                      {extracurricular.user && (
                        <div className="py-2 flex justify-between">
                          <dt className="text-sm font-medium text-gray-500">Dibuat oleh</dt>
                          <dd className="text-sm font-medium text-gray-900">
                            {extracurricular.user.name}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{extracurricular.name}</h2>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {extracurricular.schedule && (
                      <div className="text-sm text-gray-700 flex items-center">
                        <span className="font-medium mr-2">Jadwal:</span>
                        {extracurricular.schedule}
                      </div>
                    )}
                    {extracurricular.coach && (
                      <div className="text-sm text-gray-700 flex items-center">
                        <span className="font-medium mr-2">Pembina:</span>
                        {extracurricular.coach}
                      </div>
                    )}
                    {extracurricular.location && (
                      <div className="text-sm text-gray-700 flex items-center">
                        <span className="font-medium mr-2">Lokasi:</span>
                        {extracurricular.location}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Deskripsi</h3>
                  {extracurricular.description ? (
                    <div className="prose max-w-none">
                      <p className="text-gray-700 whitespace-pre-line">{extracurricular.description}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Tidak ada deskripsi</p>
                  )}
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Link Terkait</h3>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <Link
                        href={route('extracurricular')}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                        target="_blank"
                      >
                        Lihat semua ekstrakurikuler di halaman publik →
                      </Link>
                    </div>
                    <div>
                      <Link
                        href={route('extracurricular.detail', extracurricular.slug)}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                        target="_blank"
                      >
                        Lihat detail ekstrakurikuler ini di halaman publik →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 