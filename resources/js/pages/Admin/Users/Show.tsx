import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { User, Mail, Shield, Calendar, ArrowLeft, Edit, FileText } from 'lucide-react';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  ppdb?: any;
}

export default function UserShow({ user }: { user: UserData }) {
  const getRoleBadge = (role: string) => {
    if (role === 'admin') {
      return (
        <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 text-sm font-medium">
          <Shield className="h-4 w-4 mr-1.5" />
          <span>Administrator</span>
        </div>
      );
    }
    
    return (
      <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200 text-sm font-medium">
        <User className="h-4 w-4 mr-1.5" />
        <span>User</span>
      </div>
    );
  };

  return (
    <AdminLayout>
      <Head title={`Detail Pengguna: ${user.name} - Admin Dashboard`} />
      
      <div className="px-6 py-8">
        <div className="mb-8">
          <Link
            href={route('admin.users.index')}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kembali ke Daftar Pengguna
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Detail Pengguna
              </h1>
              <p className="mt-1 text-gray-500">
                Informasi lengkap tentang pengguna ini.
              </p>
            </div>
            
            <Link
              href={route('admin.users.edit', user.id)}
              className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Pengguna
            </Link>
          </div>
        </div>
        
        <div className="max-w-3xl space-y-6">
          {/* User Information Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600">
              <h2 className="text-lg font-semibold text-white">Informasi Pengguna</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Nama Lengkap
                  </label>
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-2" />
                    <p className="text-base font-medium text-gray-900">{user.name}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Email
                  </label>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    <p className="text-base font-medium text-gray-900">{user.email}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Role
                  </label>
                  <div>
                    {getRoleBadge(user.role)}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Terdaftar Sejak
                  </label>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <p className="text-base font-medium text-gray-900">
                      {new Date(user.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* PPDB Information if exists */}
          {user.ppdb && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600">
                <h2 className="text-lg font-semibold text-white">Informasi PPDB</h2>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Nomor Pendaftaran</p>
                    <p className="text-lg font-semibold text-gray-900">{user.ppdb.nomor_pendaftaran}</p>
                  </div>
                  
                  <Link
                    href={route('admin.ppdb.show', user.ppdb.id)}
                    className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Lihat Detail PPDB
                  </Link>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Status Pendaftaran</p>
                    <p className="text-base font-medium text-gray-900">{user.ppdb.status || 'Menunggu'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Tanggal Daftar</p>
                    <p className="text-base font-medium text-gray-900">
                      {new Date(user.ppdb.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* No PPDB Message */}
          {!user.ppdb && user.role === 'user' && (
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
              <div className="text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">
                  Pengguna ini belum melakukan pendaftaran PPDB.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

