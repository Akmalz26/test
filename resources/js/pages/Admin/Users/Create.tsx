import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { User, Mail, Lock, Shield, ArrowLeft, Save } from 'lucide-react';

export default function UserCreate() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.users.store'));
  };

  return (
    <AdminLayout>
      <Head title="Tambah Pengguna - Admin Dashboard" />
      
      <div className="px-6 py-8">
        <div className="mb-8">
          <Link
            href={route('admin.users.index')}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kembali ke Daftar Pengguna
          </Link>
          
          <h1 className="text-2xl font-bold text-gray-900">
            Tambah Pengguna Baru
          </h1>
          <p className="mt-1 text-gray-500">
            Buat akun pengguna atau administrator baru untuk sistem.
          </p>
        </div>
        
        <div className="max-w-3xl">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 space-y-6">
              {/* Nama */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-orange-500 focus:border-orange-500`}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-orange-500 focus:border-orange-500`}
                    placeholder="contoh@email.com"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="role"
                    value={data.role}
                    onChange={(e) => setData('role', e.target.value)}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.role ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-orange-500 focus:border-orange-500`}
                    required
                  >
                    <option value="user">User (Siswa/Calon Siswa)</option>
                    <option value="admin">Admin (Administrator)</option>
                  </select>
                </div>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  User: Akses terbatas untuk pendaftaran PPDB. Admin: Akses penuh ke dashboard admin.
                </p>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-orange-500 focus:border-orange-500`}
                    placeholder="Minimal 8 karakter"
                    required
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                  Konfirmasi Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    className={`block w-full pl-10 pr-3 py-2.5 border ${errors.password_confirmation ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-orange-500 focus:border-orange-500`}
                    placeholder="Ulangi password"
                    required
                  />
                </div>
                {errors.password_confirmation && (
                  <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
                )}
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-3">
              <Link
                href={route('admin.users.index')}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
              >
                Batal
              </Link>
              
              <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4 mr-2" />
                {processing ? 'Menyimpan...' : 'Simpan Pengguna'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

