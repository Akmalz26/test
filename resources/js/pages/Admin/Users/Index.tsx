import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import {
  Search, Filter, Plus, Eye, Edit, Trash,
  UserCheck, Shield, User as UserIcon
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

interface Stats {
  total: number;
  admins: number;
  users: number;
}

export default function UsersIndex({
  auth,
  users,
  filters = {},
  stats
}: {
  auth: any;
  users: any;
  filters?: any;
  stats: Stats;
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data, setData, get, processing } = useForm({
    search: filters.search || '',
    role: filters.role || '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    get(route('admin.users.index'), {
      preserveState: true,
      replace: true
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData(e.target.name as any, e.target.value);
  };

  const getRoleBadge = (role: string) => {
    if (role === 'admin') {
      return (
        <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200 text-xs font-medium">
          <Shield className="h-3 w-3 mr-1" />
          <span>Admin</span>
        </div>
      );
    }

    return (
      <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200 text-xs font-medium">
        <UserIcon className="h-3 w-3 mr-1" />
        <span>User</span>
      </div>
    );
  };

  const deleteUser = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      router.delete(route('admin.users.destroy', id), {
        onSuccess: () => {
          // Success notification is handled by Inertia
        },
      });
    }
  };

  return (
    <AdminLayout>
      <Head title="Kelola Pengguna - Admin Dashboard" />

      <div className="px-6 py-8">
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Kelola Pengguna
            </h1>
            <p className="mt-1 text-gray-600">
              Kelola akun pengguna dan administrator sistem.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={route('admin.users.create')}
              className="inline-flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Pengguna
            </Link>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Pengguna</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <UserIcon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Administrator</p>
                <p className="text-2xl font-bold text-gray-900">{stats.admins}</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">User Biasa</p>
                <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
              </div>
              <div className="p-3 rounded-full bg-emerald-100">
                <UserCheck className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
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
                    placeholder="Cari berdasarkan nama atau email..."
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="role-filter" className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select
                      id="role-filter"
                      name="role"
                      value={data.role}
                      onChange={handleFilterChange}
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    >
                      <option value="">Semua Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setData({
                        search: '',
                        role: '',
                      });
                    }}
                    className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 font-medium"
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
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Terdaftar
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {users && Array.isArray(users.data) && users.data.length > 0 ? (
                  users.data.map((user: User) => (
                    <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4">
                        {user.email}
                      </td>
                      <td className="px-6 py-4">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(user.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={route('admin.users.show', user.id)}
                            className="p-1.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-lg transition-colors"
                            title="Lihat Detail"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>

                          <Link
                            href={route('admin.users.edit', user.id)}
                            className="p-1.5 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>

                          {auth.user.id !== user.id && (
                            <button
                              type="button"
                              className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"
                              title="Hapus"
                              onClick={() => deleteUser(user.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                      Tidak ada data pengguna yang ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {users && users.data && users.data.length > 0 && users.links && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Menampilkan {users.from} - {users.to} dari {users.total} hasil
                </div>

                <div className="flex items-center space-x-2">
                  {users.links.map((link: any, i: number) => (
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
                      <span dangerouslySetInnerHTML={{ __html: link.label }} />
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

