import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import {
  Users, UserCheck, AlertTriangle, Clock, CheckCircle,
  BookOpen, Book, GraduationCap, ScrollText, Clock8,
  Download
} from 'lucide-react';

export default function AdminPpdbDashboard({
  auth,
  stats = {
    total: 0,
    menunggu: 0,
    verifikasi: 0,
    diterima: 0,
    ditolak: 0,
    cadangan: 0
  },
  jurusan = [],
  recent = []
}) {
  return (
    <AdminLayout>
      <Head title="Dashboard SPMB - Admin Dashboard" />

      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Dashboard SPMB
          </h1>
          <p className="mt-1 sm:mt-2 text-blue-100 text-sm sm:text-base lg:text-lg">
            Ringkasan dan statistik pendaftaran peserta didik baru.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Total Pendaftar</p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-1 sm:mt-2 tracking-tight">{stats.total}</h3>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-500" />
              </div>
            </div>
            <div className="px-4 py-2 sm:px-6 bg-gray-50 border-t border-gray-200">
              <Link href={route('admin.ppdb.index')} className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                Lihat semua pendaftar
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Pendaftar Diterima</p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mt-1 sm:mt-2 tracking-tight">{stats.diterima}</h3>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-green-50 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
              </div>
            </div>
            <div className="px-4 py-2 sm:px-6 bg-gray-50 border-t border-gray-200">
              <Link href={`${route('admin.ppdb.index')}?status=diterima`} className="text-xs sm:text-sm text-green-600 hover:text-green-800 font-medium">
                Lihat pendaftar diterima
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-4 sm:px-6 sm:py-5 flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Menunggu Verifikasi</p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-600 mt-1 sm:mt-2 tracking-tight">{stats.menunggu}</h3>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-amber-50 flex items-center justify-center">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" />
              </div>
            </div>
            <div className="px-4 py-2 sm:px-6 bg-gray-50 border-t border-gray-200">
              <Link href={`${route('admin.ppdb.index')}?status=menunggu`} className="text-xs sm:text-sm text-amber-600 hover:text-amber-800 font-medium">
                Lihat pendaftar menunggu
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            {/* Status Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 sm:mb-8">
              <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Status Pendaftaran</h2>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  <StatusCard
                    title="Menunggu Verifikasi"
                    count={stats.menunggu}
                    color="amber"
                    icon={<Clock className="h-5 w-5" />}
                    route={`${route('admin.ppdb.index')}?status=menunggu`}
                  />

                  <StatusCard
                    title="Verifikasi Dokumen"
                    count={stats.verifikasi}
                    color="blue"
                    icon={<BookOpen className="h-5 w-5" />}
                    route={`${route('admin.ppdb.index')}?status=verifikasi`}
                  />

                  <StatusCard
                    title="Diterima"
                    count={stats.diterima}
                    color="green"
                    icon={<CheckCircle className="h-5 w-5" />}
                    route={`${route('admin.ppdb.index')}?status=diterima`}
                  />

                  <StatusCard
                    title="Ditolak"
                    count={stats.ditolak}
                    color="red"
                    icon={<AlertTriangle className="h-6 w-6" />}
                    route={`${route('admin.ppdb.index')}?status=ditolak`}
                  />

                  <StatusCard
                    title="Cadangan"
                    count={stats.cadangan}
                    color="purple"
                    icon={<Book className="h-6 w-6" />}
                    route={`${route('admin.ppdb.index')}?status=cadangan`}
                  />

                  <StatusCard
                    title="Total Pendaftar"
                    count={stats.total}
                    color="indigo"
                    icon={<Users className="h-6 w-6" />}
                    route={route('admin.ppdb.index')}
                  />
                </div>
              </div>
            </div>

            {/* Pendaftar Per Jurusan */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Pendaftar per Jurusan</h2>
              </div>

              <div className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {jurusan.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg border border-gray-200 p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-50 flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0`}>
                            <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-gray-900 font-semibold text-base sm:text-lg truncate">{item.nama}</h3>
                            <p className="text-gray-500 text-xs sm:text-sm">
                              {item.total} pendaftar
                              {item.kuota && ` (Kuota: ${item.kuota})`}
                            </p>
                          </div>
                        </div>

                        <Link
                          href={`${route('admin.ppdb.index')}?jurusan=${encodeURIComponent(item.nama)}`}
                          className="text-xs sm:text-sm text-orange-600 hover:text-orange-800 font-medium flex-shrink-0 self-start sm:self-auto"
                        >
                          Lihat
                        </Link>
                      </div>

                      {/* Progress bar */}
                      {item.kuota && (
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-orange-500 h-2.5 rounded-full"
                              style={{ width: `${Math.min(100, (item.total / item.kuota) * 100)}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <p className="text-xs text-gray-500">
                              {Math.round((item.total / item.kuota) * 100)}% Terisi
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.total}/{item.kuota}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            {/* Pendaftar Terbaru */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 sm:mb-8">
              <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Pendaftar Terbaru</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {recent.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <ScrollText className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p>Belum ada pendaftar</p>
                  </div>
                ) : (
                  recent.map((app, index) => (
                    <div key={index} className="p-3 sm:p-4 hover:bg-gray-50">
                      <Link href={route('admin.ppdb.show', app.id)}>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-gray-900 font-semibold text-sm sm:text-base truncate">{app.nama_lengkap}</h3>
                            <p className="text-gray-500 text-xs sm:text-sm truncate">
                              {app.registration_number} • {app.jurusan_1}
                            </p>
                            <div className="flex items-center mt-1">
                              <Clock8 className="h-3.5 w-3.5 text-gray-400 mr-1" />
                              <p className="text-gray-500 text-xs">
                                {new Date(app.created_at).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>

                          <StatusBadge status={app.status} />
                        </div>
                      </Link>
                    </div>
                  ))
                )}
              </div>

              <div className="px-4 py-3 sm:px-6 sm:py-4 bg-gray-50 border-t border-gray-200">
                <Link
                  href={route('admin.ppdb.index')}
                  className="text-xs sm:text-sm text-orange-600 hover:text-orange-800 font-medium"
                >
                  Lihat semua pendaftar
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Aksi Cepat</h2>
              </div>

              <div className="p-4 sm:p-6">
                <div className="space-y-2 sm:space-y-3">
                  <Link
                    href={route('admin.ppdb.index')}
                    className="flex items-center p-2.5 sm:p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 group transition-colors"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center mr-2.5 sm:mr-3 flex-shrink-0 transition-colors">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 text-xs sm:text-sm font-medium">Lihat Semua Pendaftar</h3>
                      <p className="text-gray-500 text-[10px] sm:text-xs hidden sm:block">Kelola dan lihat semua data pendaftar SPMB</p>
                    </div>
                  </Link>

                  <Link
                    href={route('admin.ppdb.export')}
                    className="flex items-center p-2.5 sm:p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 group transition-colors"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-50 group-hover:bg-green-100 flex items-center justify-center mr-2.5 sm:mr-3 flex-shrink-0 transition-colors">
                      <Download className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 text-xs sm:text-sm font-medium">Export Data Pendaftar</h3>
                      <p className="text-gray-500 text-[10px] sm:text-xs hidden sm:block">Unduh data pendaftar dalam format Excel</p>
                    </div>
                  </Link>

                  <Link
                    href={`${route('admin.ppdb.index')}?status=diterima`}
                    className="flex items-center p-2.5 sm:p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 group transition-colors"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-50 group-hover:bg-green-100 flex items-center justify-center mr-2.5 sm:mr-3 flex-shrink-0 transition-colors">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 text-xs sm:text-sm font-medium">Pendaftar Diterima</h3>
                      <p className="text-gray-500 text-[10px] sm:text-xs hidden sm:block">Lihat pendaftar yang sudah diterima</p>
                    </div>
                  </Link>

                  <Link
                    href={`${route('admin.ppdb.index')}?status=menunggu`}
                    className="flex items-center p-2.5 sm:p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 group transition-colors"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center mr-2.5 sm:mr-3 flex-shrink-0 transition-colors">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 text-xs sm:text-sm font-medium">Pendaftar Menunggu</h3>
                      <p className="text-gray-500 text-[10px] sm:text-xs hidden sm:block">Lihat pendaftar yang menunggu verifikasi</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// Component untuk menampilkan status pendaftaran
const StatusBadge = ({ status }) => {
  const statusConfig = {
    'menunggu': {
      color: 'bg-amber-100 text-amber-700 border-amber-200',
      text: 'Menunggu'
    },
    'verifikasi': {
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      text: 'Verifikasi'
    },
    'diterima': {
      color: 'bg-green-100 text-green-700 border-green-200',
      text: 'Diterima'
    },
    'ditolak': {
      color: 'bg-red-100 text-red-700 border-red-200',
      text: 'Ditolak'
    },
    'cadangan': {
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      text: 'Cadangan'
    }
  };

  const config = statusConfig[status] || statusConfig['menunggu'];

  return (
    <div className={`px-2.5 py-1 rounded-full ${config.color} border text-xs font-medium`}>
      {config.text}
    </div>
  );
};

// Component untuk menampilkan status card
const StatusCard = ({ title, count, color, icon, route }) => {
  const colorConfig = {
    'amber': {
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      text: 'text-amber-700',
      count: 'text-amber-600',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-500',
      hover: 'hover:bg-amber-100',
      link: 'text-amber-600 hover:text-amber-800'
    },
    'blue': {
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      text: 'text-blue-700',
      count: 'text-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-500',
      hover: 'hover:bg-blue-100',
      link: 'text-blue-600 hover:text-blue-800'
    },
    'green': {
      bg: 'bg-green-50',
      border: 'border-green-100',
      text: 'text-green-700',
      count: 'text-green-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-500',
      hover: 'hover:bg-green-100',
      link: 'text-green-600 hover:text-green-800'
    },
    'red': {
      bg: 'bg-red-50',
      border: 'border-red-100',
      text: 'text-red-700',
      count: 'text-red-600',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-500',
      hover: 'hover:bg-red-100',
      link: 'text-red-600 hover:text-red-800'
    },
    'purple': {
      bg: 'bg-purple-50',
      border: 'border-purple-100',
      text: 'text-purple-700',
      count: 'text-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-500',
      hover: 'hover:bg-purple-100',
      link: 'text-purple-600 hover:text-purple-800'
    },
    'indigo': {
      bg: 'bg-indigo-50',
      border: 'border-indigo-100',
      text: 'text-indigo-700',
      count: 'text-indigo-600',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-500',
      hover: 'hover:bg-indigo-100',
      link: 'text-indigo-600 hover:text-indigo-800'
    }
  };

  const config = colorConfig[color] || colorConfig['blue'];

  return (
    <div className={`${config.bg} ${config.hover} rounded-xl border ${config.border} p-3 sm:p-5 transition-all duration-300 hover:shadow-md`}>
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${config.iconBg} flex items-center justify-center`}>
          <div className={config.iconColor}>
            {icon}
          </div>
        </div>
        <p className={`${config.count} text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight`}>{count}</p>
      </div>
      <div>
        <h3 className={`${config.text} font-semibold text-sm sm:text-base lg:text-lg mb-1`}>{title}</h3>
        <Link href={route} className={`text-sm font-medium ${config.link} inline-flex items-center group`}>
          Lihat detail
          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}; 