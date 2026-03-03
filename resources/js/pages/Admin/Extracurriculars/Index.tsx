import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  Search,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  ImageIcon
} from 'lucide-react';
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

interface IndexProps {
  extracurriculars: Extracurricular[];
}

export default function Index({ extracurriculars }: IndexProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [extracurricularToDelete, setExtracurricularToDelete] = useState<Extracurricular | null>(null);

  // Filter ekstrakurikuler berdasarkan pencarian
  const filteredExtracurriculars = extracurriculars.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.coach && item.coach.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Handler untuk konfirmasi hapus
  const handleDeleteClick = (extracurricular: Extracurricular) => {
    setExtracurricularToDelete(extracurricular);
    setIsDeleteModalOpen(true);
  };

  // Handler untuk proses hapus
  const handleDeleteConfirm = () => {
    if (extracurricularToDelete) {
      router.delete(route('admin.extracurriculars.destroy', extracurricularToDelete.id), {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setExtracurricularToDelete(null);
        }
      });
    }
  };

  // Handler untuk batalkan hapus
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setExtracurricularToDelete(null);
  };

  return (
    <AdminLayout>
      <Head title="Manajemen Ekstrakurikuler" />

      <div className="container px-6 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Ekstrakurikuler</h1>
            <p className="mt-1 text-sm text-gray-600">
              Kelola daftar ekstrakurikuler yang tersedia di sekolah
            </p>
          </div>
          <Link
            href={route('admin.extracurriculars.create')}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-md font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Ekstrakurikuler
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-end">
            <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all"
                placeholder="Cari ekstrakurikuler..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Extracurricular List */}
        <div className="bg-white overflow-hidden shadow-md rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pembina
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jadwal
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredExtracurriculars.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-sm text-center text-gray-500">
                      {searchQuery ? 'Tidak ada ekstrakurikuler yang sesuai dengan pencarian' : 'Belum ada data ekstrakurikuler'}
                    </td>
                  </tr>
                ) : (
                  filteredExtracurriculars.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-200 overflow-hidden">
                            {item.image ? (
                              <img
                                src={`/storage/${item.image}`}
                                alt={item.name}
                                className="h-10 w-10 object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
                                <ImageIcon size={18} />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.coach || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.schedule || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.is_active ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Aktif
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Tidak Aktif
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            href={`/ekstrakurikuler/${item.slug}`}
                            className="text-gray-600 hover:text-gray-900"
                            target="_blank"
                            title="Lihat"
                          >
                            <Eye className="w-5 h-5" />
                          </Link>
                          <Link
                            href={route('admin.extracurriculars.edit', item.id)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit"
                          >
                            <Pencil className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(item)}
                            className="text-red-600 hover:text-red-900"
                            title="Hapus"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Hapus Ekstrakurikuler</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Apakah Anda yakin ingin menghapus ekstrakurikuler "{extracurricularToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteConfirm}
                >
                  Hapus
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteCancel}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
} 