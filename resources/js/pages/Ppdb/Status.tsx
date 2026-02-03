import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  CheckCircle, AlertTriangle, Clock, FileText, 
  BookOpen, Book, BookCopy, Calendar, User, School,
  ArrowUpCircle, CheckCircleIcon, XCircle, HelpCircle
} from 'lucide-react';
import { Ppdb } from './Show';

export default function PpdbStatus({ auth, applications = [] }) {
  // Jika belum login, redirect ke halaman login
  if (!auth.user) {
    return (
      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />
        <div className="container mx-auto px-6 py-28">
          <div className="max-w-2xl mx-auto bg-gray-50 shadow-md p-8 rounded-xl border border-gray-200">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-orange-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">Login Diperlukan</h2>
            <p className="text-gray-600 text-center mb-8">
              Untuk melihat status pendaftaran PPDB, Anda perlu login terlebih dahulu.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/login" className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition-all duration-300 text-center">
                Login
              </Link>
              <Link href="/register" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-700 font-medium transition-all duration-300 text-center">
                Daftar Akun
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Jika belum memiliki pendaftaran
  if (!applications || applications.length === 0) {
    return (
      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />
        <div className="container mx-auto px-6 py-28">
          <div className="max-w-2xl mx-auto bg-gray-50 shadow-md p-8 rounded-xl border border-gray-200">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-amber-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">Belum Ada Pendaftaran</h2>
            <p className="text-gray-600 text-center mb-8">
              Anda belum melakukan pendaftaran PPDB. Silahkan daftar terlebih dahulu.
            </p>
            <div className="flex justify-center">
              <Link href="/ppdb/pendaftaran" className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition-all duration-300">
                Daftar Sekarang
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Tampilkan data pendaftaran
  const application = applications[0]; // Ambil pendaftaran terbaru
  
  const getStatusBadge = (status) => {
    const statusConfig = {
      'Menunggu': {
        color: 'bg-amber-100 text-amber-600 border border-amber-200',
        icon: <Clock className="h-3 w-3" />,
        text: 'Menunggu',
      },
      'Verifikasi': {
        color: 'bg-blue-100 text-blue-600 border border-blue-200',
        icon: <ArrowUpCircle className="h-3 w-3" />,
        text: 'Verifikasi',
      },
      'Diterima': {
        color: 'bg-green-100 text-green-600 border border-green-200',
        icon: <CheckCircleIcon className="h-3 w-3" />,
        text: 'Diterima',
      },
      'Ditolak': {
        color: 'bg-red-100 text-red-600 border border-red-200',
        icon: <XCircle className="h-3 w-3" />,
        text: 'Ditolak',
      },
      'Cadangan': {
        color: 'bg-purple-100 text-purple-600 border border-purple-200',
        icon: <HelpCircle className="h-3 w-3" />,
        text: 'Cadangan',
      },
    };
    
    const config = statusConfig[status] || statusConfig['Menunggu'];
    
    return (
      <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        <span className="ml-1.5">{config.text}</span>
      </div>
    );
  };
  
  return (
    <>
      <Head title="Status Pendaftaran PPDB - SMK IT Baitul Aziz" />
      
      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />
        
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Status Pendaftaran <span className="text-orange-500">PPDB</span>
              </h1>
              <p className="text-gray-600 max-w-xl mx-auto">
                Berikut adalah informasi status pendaftaran PPDB Anda. Anda dapat melihat detail dan mencetak formulir pendaftaran.
              </p>
            </div>
            
            {/* Status Card */}
            <div className="bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">
                      Nomor Pendaftaran: {application.nomor_pendaftaran}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Terdaftar pada {new Date(application.created_at).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  
                  <div>{getStatusBadge(application.status)}</div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Nama Lengkap</h3>
                    <p className="text-gray-800 font-medium">{application.nama_lengkap}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">NISN</h3>
                    <p className="text-gray-800 font-medium">{application.nisn}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Tempat, Tanggal Lahir</h3>
                    <p className="text-gray-800 font-medium">
                      {application.tempat_lahir}, {new Date(application.tanggal_lahir).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Asal Sekolah</h3>
                    <p className="text-gray-800 font-medium">{application.sekolah_asal}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Jurusan</h3>
                    <p className="text-gray-800 font-medium">PPLG (Program Pengembangan Perangkat Lunak dan Gim)</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">No. Telepon</h3>
                    <p className="text-gray-800 font-medium">{application.telepon_hp || '-'}</p>
                  </div>
                </div>
                
                {application.catatan && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-800 mb-2">Catatan:</h3>
                    <p className="text-gray-600">{application.catatan}</p>
                  </div>
                )}
                
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <Link 
                    href={`/ppdb/${application.id}`}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium transition-all duration-300 flex items-center justify-center"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Lihat Detail
                  </Link>
                  
                  <Link 
                    href={`/ppdb/${application.id}/cetak`}
                    className="px-4 py-2 bg-orange-100 hover:bg-orange-200 border border-orange-200 rounded-lg text-orange-600 text-sm font-medium transition-all duration-300 flex items-center justify-center"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Cetak Formulir
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Status Timeline */}
            <div className="mt-8 bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Status Pendaftaran</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  <StatusTimelineItem 
                    title="Pendaftaran" 
                    date={new Date(application.created_at).toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'long', 
                      year: 'numeric' 
                    })}
                    description="Pendaftaran PPDB Anda telah berhasil disubmit."
                    status="completed"
                  />
                  
                  <StatusTimelineItem 
                    title="Verifikasi Dokumen" 
                    date={application.status !== 'Menunggu' ? 'Selesai' : 'Menunggu'}
                    description="Verifikasi dokumen pendaftaran oleh admin."
                    status={application.status !== 'Menunggu' ? 'completed' : 'waiting'}
                  />
                  
                  <StatusTimelineItem 
                    title="Pengumuman" 
                    date={application.status === 'Diterima' || application.status === 'Ditolak' || application.status === 'Cadangan' ? 'Selesai' : 'Menunggu'}
                    description="Pengumuman hasil seleksi PPDB."
                    status={application.status === 'Diterima' || application.status === 'Ditolak' || application.status === 'Cadangan' ? 'completed' : 'waiting'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}

const StatusTimelineItem = ({ title, date, description, status }) => {
  return (
    <div className="flex">
      <div className="mr-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
        }`}>
          {status === 'completed' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <Clock className="h-5 w-5" />
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
          <h3 className={`font-medium ${
            status === 'completed' ? 'text-gray-800' : 'text-gray-500'
          }`}>{title}</h3>
          <span className={`text-xs ${
            status === 'completed' ? 'text-green-600' : 'text-gray-500'
          }`}>{date}</span>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    'Menunggu': {
      color: 'bg-amber-100 text-amber-600 border border-amber-200',
      icon: <Clock className="h-4 w-4 mr-2" />,
      text: 'Menunggu'
    },
    'Verifikasi': {
      color: 'bg-blue-100 text-blue-600 border border-blue-200',
      icon: <ArrowUpCircle className="h-4 w-4 mr-2" />,
      text: 'Verifikasi'
    },
    'Diterima': {
      color: 'bg-green-100 text-green-600 border border-green-200',
      icon: <CheckCircleIcon className="h-4 w-4 mr-2" />,
      text: 'Diterima'
    },
    'Ditolak': {
      color: 'bg-red-100 text-red-600 border border-red-200',
      icon: <XCircle className="h-4 w-4 mr-2" />,
      text: 'Ditolak'
    },
    'Cadangan': {
      color: 'bg-purple-100 text-purple-600 border border-purple-200',
      icon: <HelpCircle className="h-4 w-4 mr-2" />,
      text: 'Cadangan'
    }
  };
  
  const config = statusConfig[status] || statusConfig['Menunggu'];
  
  return (
    <div className={`px-3 py-1.5 rounded-full inline-flex items-center ${config.color}`}>
      {config.icon}
      <span className="font-medium">{config.text}</span>
    </div>
  );
}

export const getStatusBadge = (status: string) => {
  const statusConfig = {
    'Menunggu': {
      color: 'bg-amber-100 text-amber-600 border border-amber-200',
      icon: <Clock className="h-4 w-4 mr-2" />,
      text: 'Menunggu'
    },
    'Verifikasi': {
      color: 'bg-blue-100 text-blue-600 border border-blue-200',
      icon: <ArrowUpCircle className="h-4 w-4 mr-2" />,
      text: 'Verifikasi'
    },
    'Diterima': {
      color: 'bg-green-100 text-green-600 border border-green-200',
      icon: <CheckCircleIcon className="h-4 w-4 mr-2" />,
      text: 'Diterima'
    },
    'Ditolak': {
      color: 'bg-red-100 text-red-600 border border-red-200',
      icon: <XCircle className="h-4 w-4 mr-2" />,
      text: 'Ditolak'
    },
    'Cadangan': {
      color: 'bg-purple-100 text-purple-600 border border-purple-200',
      icon: <HelpCircle className="h-4 w-4 mr-2" />,
      text: 'Cadangan'
    }
  };
  
  const config = statusConfig[status] || statusConfig['Menunggu'];
  
  return (
    <div className={`px-3 py-1.5 rounded-full inline-flex items-center ${config.color}`}>
      {config.icon}
      <span className="font-medium">{config.text}</span>
    </div>
  );
};

interface TimelineProps {
  ppdb: Ppdb;
}

export function StatusTimeline({ ppdb }: TimelineProps) {
  return (
    <div className="space-y-6">
      <StatusTimelineItem 
        title="Pendaftaran" 
        date={new Date(ppdb.created_at).toLocaleDateString('id-ID', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        })}
        description="Pendaftaran PPDB Anda telah berhasil disubmit."
        status="completed"
      />
      
      <StatusTimelineItem 
        title="Verifikasi Dokumen" 
        date={ppdb.status !== 'Menunggu' ? 'Selesai' : 'Menunggu'}
        description="Verifikasi dokumen pendaftaran oleh admin."
        status={ppdb.status !== 'Menunggu' ? 'completed' : 'waiting'}
      />
      
      <StatusTimelineItem 
        title="Pengumuman" 
        date={ppdb.status === 'Diterima' || ppdb.status === 'Ditolak' || ppdb.status === 'Cadangan' ? 'Selesai' : 'Menunggu'}
        description="Pengumuman hasil seleksi PPDB."
        status={ppdb.status === 'Diterima' || ppdb.status === 'Ditolak' || ppdb.status === 'Cadangan' ? 'completed' : 'waiting'}
      />
    </div>
  );
} 