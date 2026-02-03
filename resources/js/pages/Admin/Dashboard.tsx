import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
  Image as ImageIcon,
  Newspaper,
  Users,
  Activity,
  GraduationCap,
  ArrowUp,
  ArrowDown,
  Clock,
  MoreVertical,
  Plus
} from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import { motion } from 'framer-motion';

interface DashboardProps {
  stats?: {
    totalGalleries: number;
    totalNews: number;
    totalExtracurriculars: number;
    totalTeachers: number;
    totalPpdb: number;
    ppdbPending: number;
    ppdbVerified: number;
    ppdbAccepted: number;
    ppdbRejected: number;
  };
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const stats = props.stats || {
    totalGalleries: 0,
    totalNews: 0,
    totalExtracurriculars: 0,
    totalTeachers: 0,
    totalPpdb: 0,
    ppdbPending: 0,
    ppdbVerified: 0,
    ppdbAccepted: 0,
    ppdbRejected: 0
  };

  // Card component for stats (Argon style)
  const StatCard = ({ title, value, icon, color, footer }: any) => (
    <div className="relative flex flex-col min-w-0 break-words bg-white rounded-2xl mb-6 xl:mb-0 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap">
          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase text-slate-400">
              {title}
            </p>
            <h5 className="mb-0 font-bold text-slate-700 text-xl">
              {value}
            </h5>
          </div>
          <div className="relative w-auto pl-4 flex-initial">
            <div className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-xl ${color}`}>
              {icon}
            </div>
          </div>
        </div>
        {footer && (
          <p className="mb-0 text-slate-400 mt-4 text-sm">
            {footer}
          </p>
        )}
      </div>
    </div>
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      }
    })
  };

  // Menu cepat untuk dashboard
  const quickMenus = [
    {
      title: 'Kelola Galeri',
      description: 'Manajemen foto kegiatan sekolah',
      icon: <ImageIcon className="w-6 h-6 text-white" />,
      link: '/admin/gallery',
      bg: 'bg-gradient-to-tr from-blue-500 to-blue-700'
    },
    {
      title: 'Kelola Berita',
      description: 'Publikasi artikel & pengumuman',
      icon: <Newspaper className="w-6 h-6 text-white" />,
      link: '/admin/news',
      bg: 'bg-gradient-to-tr from-emerald-500 to-emerald-700'
    },
    {
      title: 'Data PPDB',
      description: 'Verifikasi pendaftar baru',
      icon: <Users className="w-6 h-6 text-white" />,
      link: '/admin/ppdb',
      bg: 'bg-gradient-to-tr from-orange-500 to-orange-700'
    },
    {
      title: 'Guru & Staff',
      description: 'Data tenaga pendidik',
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      link: '/admin/teachers',
      bg: 'bg-gradient-to-tr from-indigo-500 to-indigo-700'
    }
  ];

  return (
    <AdminLayout>
      <Head title="Dashboard Admin" />

      {/* Card stats - positioned to overlap on the orange header from AdminLayout */}
      <div className="-mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants}>
            <StatCard
              title="TOTAL GALERI"
              value={stats.totalGalleries}
              icon={<ImageIcon className="w-5 h-5" />}
              color="bg-gradient-to-tl from-blue-500 to-violet-500"
              footer={<span className="text-emerald-500 font-bold text-xs"><ArrowUp className="w-3 h-3 inline mr-1" />Data Terbaru</span>}
            />
          </motion.div>
          <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants}>
            <StatCard
              title="TOTAL BERITA"
              value={stats.totalNews}
              icon={<Newspaper className="w-5 h-5" />}
              color="bg-gradient-to-tl from-red-600 to-orange-600"
              footer={<span className="text-gray-500 text-xs">Artikel Terpublikasi</span>}
            />
          </motion.div>
          <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants}>
            <StatCard
              title="PENDAFTAR PPDB"
              value={stats.totalPpdb}
              icon={<Users className="w-5 h-5" />}
              color="bg-gradient-to-tl from-emerald-500 to-teal-400"
              footer={
                <span className="text-xs">
                  <span className="text-orange-500 font-bold">{stats.ppdbPending}</span> Menunggu Verifikasi
                </span>
              }
            />
          </motion.div>
          <motion.div custom={3} initial="hidden" animate="visible" variants={cardVariants}>
            <StatCard
              title="TOTAL GURU"
              value={stats.totalTeachers}
              icon={<GraduationCap className="w-5 h-5" />}
              color="bg-gradient-to-tl from-orange-500 to-yellow-500"
              footer={<span className="text-xs text-gray-500">Tenaga Pendidik Aktif</span>}
            />
          </motion.div>
        </div>
      </div>

      {/* Page Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Main Card (Action & Info) */}
        <div className="xl:col-span-2">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-gray-700">
                    Aksi Cepat
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button className="bg-orange-500 text-white active:bg-orange-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    Lihat Semua
                  </button>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickMenus.map((menu, i) => (
                  <Link
                    key={i}
                    href={menu.link}
                    className="group flex flex-col relative overflow-hidden bg-white border border-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`absolute top-0 right-0 p-3 rounded-bl-xl opacity-20 group-hover:opacity-100 transition-opacity duration-300 ${menu.bg.replace('bg-gradient-to-tr', 'text').replace('from-', 'text-').split(' ')[1]}`}>
                      <Users className="w-16 h-16 -mr-4 -mt-4 opacity-20" />
                    </div>
                    <div className={`w-12 h-12 rounded-lg ${menu.bg} flex items-center justify-center shadow-md mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      {menu.icon}
                    </div>
                    <h4 className="font-bold text-gray-700">{menu.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{menu.description}</p>
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="font-semibold text-gray-700 mb-4 px-2">Shortcut Tambah Data</h4>
                <div className="flex flex-wrap gap-3">
                  <Link href="/admin/news/create" className="inline-flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 border border-gray-200 hover:border-orange-200 transition-all">
                    <Plus className="w-4 h-4 mr-2" /> Penulis Berita
                  </Link>
                  <Link href="/admin/gallery/create" className="inline-flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 border border-gray-200 hover:border-orange-200 transition-all">
                    <Plus className="w-4 h-4 mr-2" /> Upload Galeri
                  </Link>
                  <Link href="/admin/teachers/create" className="inline-flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 border border-gray-200 hover:border-orange-200 transition-all">
                    <Plus className="w-4 h-4 mr-2" /> Data Guru
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Logs (Side) */}
        <div className="xl:col-span-1">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-gray-700">
                    Ringkasan PPDB
                  </h3>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="relative h-full">
                <div className="border-l-2 border-gray-100 ml-3 space-y-6 pb-4">
                  <div className="relative pl-8">
                    <div className="absolute left-0 -ml-1.5 mt-1.5 w-3 h-3 bg-amber-500 rounded-full border-2 border-white shadow-sm"></div>
                    <h5 className="font-semibold text-gray-800 text-sm">Menunggu Verifikasi</h5>
                    <p className="text-gray-500 text-xs mt-1">Siswa baru mendaftar</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-amber-50 text-amber-600 text-xs rounded-md font-bold">
                      {stats.ppdbPending} Siswa
                    </span>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 -ml-1.5 mt-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
                    <h5 className="font-semibold text-gray-800 text-sm">Terverifikasi</h5>
                    <p className="text-gray-500 text-xs mt-1">Berkas lengkap</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md font-bold">
                      {stats.ppdbVerified} Siswa
                    </span>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 -ml-1.5 mt-1.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                    <h5 className="font-semibold text-gray-800 text-sm">Diterima</h5>
                    <p className="text-gray-500 text-xs mt-1">Lulus seleksi</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded-md font-bold">
                      {stats.ppdbAccepted} Siswa
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                  <Link href="/admin/ppdb" className="text-orange-500 text-sm font-semibold hover:text-orange-600">
                    Lihat Semua Pendaftar &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <h3 className="font-semibold text-base text-gray-700 px-2">
                Info Sistem
              </h3>
            </div>
            <div className="p-4 px-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Versi</span>
                <span className="text-sm font-semibold text-gray-700">v2.0.0</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Status</span>
                <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-600 rounded-full font-semibold">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Last Update</span>
                <span className="text-sm text-gray-700">26 Jan 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-gray-200" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-gray-500 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()} <span className="text-orange-500">SMK IT Baitul Aziz</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </AdminLayout>
  );
};

export default Dashboard;
