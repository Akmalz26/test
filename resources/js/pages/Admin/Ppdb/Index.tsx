import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import {
  Search, Filter, Download, Eye, Trash, Edit,
  UserCheck, AlertTriangle, Clock, CheckCircle, Book
} from 'lucide-react';

export default function AdminPpdbIndex({ auth, applications, filters = {} }) {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data, setData, get, processing } = useForm({
    search: filters.search || '',
    status: filters.status || '',
    jurusan: filters.jurusan || '',
    tahun: filters.tahun || new Date().getFullYear()
  });

  const handleSearch = (e) => {
    e.preventDefault();
    get(route('admin.ppdb.index'), {
      preserveState: true,
      replace: true
    });
  };

  const handleFilterChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const getStatusBadge = (status) => {
    // Pastikan status ada dan konversi ke lowercase untuk pencocokan
    const statusLower = status ? status.toLowerCase() : 'menunggu';

    const statusConfig = {
      'menunggu': {
        color: 'bg-amber-500/20 text-amber-500 border-amber-500/20',
        icon: <Clock className="h-4 w-4" />,
        text: 'Menunggu'
      },
      'verifikasi': {
        color: 'bg-blue-500/20 text-blue-500 border-blue-500/20',
        icon: <UserCheck className="h-4 w-4" />,
        text: 'Verifikasi'
      },
      'diterima': {
        color: 'bg-green-500/20 text-green-500 border-green-500/20',
        icon: <CheckCircle className="h-4 w-4" />,
        text: 'Diterima'
      },
      'ditolak': {
        color: 'bg-red-500/20 text-red-500 border-red-500/20',
        icon: <AlertTriangle className="h-4 w-4" />,
        text: 'Ditolak'
      },
      'cadangan': {
        color: 'bg-purple-500/20 text-purple-500 border-purple-500/20',
        icon: <Book className="h-4 w-4" />,
        text: 'Cadangan'
      }
    };

    const config = statusConfig[statusLower] || statusConfig['menunggu'];

    return (
      <div className={`inline-flex items-center px-2.5 py-1 rounded-full ${config.color} border text-xs font-medium`}>
        {config.icon}
        <span className="ml-1">{config.text}</span>
      </div>
    );
  };

  const deleteApplication = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus data pendaftaran ini?')) {
      router.delete(route('admin.ppdb.destroy', id), {
        onSuccess: () => {
          // Success notification is handled by Inertia
        },
      });
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Pendaftaran PPDB - Admin Dashboard" />

      <div className="px-6 py-8">
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Kelola Pendaftaran PPDB
            </h1>
            <p className="mt-1 text-white">
              Kelola dan lihat status pendaftaran peserta didik baru.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={route('admin.ppdb.export')}
              className="inline-flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
              target="_blank"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5 transition-all"
                    placeholder="Cari berdasarkan nama atau nomor pendaftaran..."
                    value={data.search}
                    onChange={(e) => setData('search', e.target.value)}
                  />
                </div>
              </form>

              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="inline-flex items-center px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>

            {isFilterOpen && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      id="status-filter"
                      name="status"
                      value={data.status}
                      onChange={handleFilterChange}
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                      aria-label="Filter berdasarkan status"
                    >
                      <option value="">Semua Status</option>
                      <option value="Menunggu">Menunggu</option>
                      <option value="Verifikasi">Verifikasi</option>
                      <option value="Diterima">Diterima</option>
                      <option value="Ditolak">Ditolak</option>
                      <option value="Cadangan">Cadangan</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="jurusan-filter" className="block text-sm font-medium text-gray-700 mb-1">
                      Jurusan
                    </label>
                    <select
                      id="jurusan-filter"
                      name="jurusan"
                      value={data.jurusan}
                      onChange={handleFilterChange}
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                      aria-label="Filter berdasarkan jurusan"
                    >
                      <option value="">Semua Jurusan</option>
                      <option value="PPLG (Program Pengembangan Perangkat Lunak dan Gim)">PPLG (Program Pengembangan Perangkat Lunak dan Gim)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="tahun-filter" className="block text-sm font-medium text-gray-700 mb-1">
                      Tahun
                    </label>
                    <select
                      id="tahun-filter"
                      name="tahun"
                      value={data.tahun}
                      onChange={handleFilterChange}
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                      aria-label="Filter berdasarkan tahun"
                    >
                      <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                      <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
                      <option value={new Date().getFullYear() - 2}>{new Date().getFullYear() - 2}</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setData({
                        search: '',
                        status: '',
                        jurusan: '',
                        tahun: new Date().getFullYear()
                      });
                    }}
                    className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 font-medium mr-2"
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    onClick={handleSearch}
                    disabled={processing}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors disabled:bg-orange-300"
                  >
                    Terapkan Filter
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No. Pendaftaran
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nama Lengkap
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                    Pilihan Jurusan
                  </th> */}
                  <th scope="col" className="px-6 py-3">
                    Asal Sekolah
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tanggal Daftar
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications && Array.isArray(applications.data) && applications.data.length > 0 ? (
                  applications.data.map((app) => (
                    <tr key={app.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {app.nomor_pendaftaran}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {app.nama_lengkap}
                      </td>
                      {/* <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-gray-900">1. {app.jurusan_1 || "Tidak ada"}</span>
                          {app.jurusan_2 && (
                            <span className="text-gray-500 text-xs mt-1">2. {app.jurusan_2}</span>
                          )}
                        </div>
                      </td> */}
                      <td className="px-6 py-4">
                        {app.sekolah_asal}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(app.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(app.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={route('admin.ppdb.show', app.id)}
                            className="p-1.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-lg transition-colors"
                            title="Lihat Detail"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>

                          <Link
                            href={`${route('admin.ppdb.show', app.id)}?action=edit`}
                            className="p-1.5 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 rounded-lg transition-colors"
                            title="Edit Status"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>

                          <button
                            type="button"
                            className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"
                            title="Hapus"
                            onClick={() => deleteApplication(app.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  // Handle ketika applications.data tidak ada atau kosong
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                      Tidak ada data pendaftaran yang ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {applications && applications.data && applications.data.length > 0 && applications.from && applications.to && applications.total && applications.links && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Menampilkan {applications.from} - {applications.to} dari {applications.total} hasil
                </div>

                <div className="flex items-center space-x-2">
                  {applications.links.map((link, i) => (
                    <Link
                      key={i}
                      href={link.url || '#'}
                      className={`px-3 py-1 rounded-md text-sm ${link.active
                          ? 'bg-orange-500 text-white'
                          : link.url
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-50 text-gray-400 cursor-default'
                        }`}
                      preserveScroll
                    >
                      {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
} 