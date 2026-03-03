import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  User, Calendar, FileText, Phone, Mail, Home, School, GraduationCap,
  CheckCircle, XCircle, Clock, AlertCircle, BookOpen
} from 'lucide-react';

export default function PpdbShow({ ppdb, auth }) {
  // Helper untuk status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      'menunggu': {
        color: 'bg-amber-100 text-amber-700 border-amber-200',
        icon: <Clock className="h-4 w-4 mr-2" />,
        text: 'Menunggu'
      },
      'verifikasi': {
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: <AlertCircle className="h-4 w-4 mr-2" />,
        text: 'Verifikasi'
      },
      'diterima': {
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: <CheckCircle className="h-4 w-4 mr-2" />,
        text: 'Diterima'
      },
      'ditolak': {
        color: 'bg-red-100 text-red-700 border-red-200',
        icon: <XCircle className="h-4 w-4 mr-2" />,
        text: 'Ditolak'
      },
      'cadangan': {
        color: 'bg-purple-100 text-purple-700 border-purple-200',
        icon: <AlertCircle className="h-4 w-4 mr-2" />,
        text: 'Cadangan'
      }
    };

    const config = statusConfig[status] || statusConfig['menunggu'];

    return (
      <div className={`px-4 py-2 rounded-full ${config.color} border inline-flex items-center`}>
        {config.icon}
        <span className="font-medium">{config.text}</span>
      </div>
    );
  };

  return (
    <>
      <Head title={`Detail Pendaftaran - ${ppdb.nama_lengkap}`} />

      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />

        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Detail Pendaftaran
                    </h1>
                    <p className="text-gray-500 text-sm">
                      Nomor Pendaftaran: <span className="text-orange-500 font-medium">{ppdb.nomor_pendaftaran}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(ppdb.status)}

                    <Link
                      href={route('ppdb.print', ppdb.id)}
                      target="_blank"
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium transition-all duration-300 inline-flex items-center"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Cetak
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Info Status */}
                <div className={`p-4 rounded-lg mb-8 ${ppdb.status === 'Diterima' ? 'bg-green-50 border border-green-200' :
                    ppdb.status === 'Ditolak' ? 'bg-red-50 border border-red-200' :
                      'bg-amber-50 border border-amber-200'
                  }`}>
                  <div className="flex items-start">
                    {ppdb.status === 'Diterima' ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                    ) : ppdb.status === 'Ditolak' ? (
                      <XCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                    ) : (
                      <Clock className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                    )}
                    <div>
                      <h3 className={`font-medium ${ppdb.status === 'Diterima' ? 'text-green-700' :
                          ppdb.status === 'Ditolak' ? 'text-red-700' :
                            'text-amber-700'
                        }`}>
                        {ppdb.status === 'Diterima' ? 'Selamat! Anda diterima' :
                          ppdb.status === 'Ditolak' ? 'Maaf, Anda tidak diterima' :
                            'Pendaftaran Anda sedang diproses'}
                      </h3>
                      <p className="text-gray-700 text-sm mt-1">
                        {ppdb.status === 'Diterima' ? 'Silahkan cetak bukti pendaftaran dan hubungi kontak sekolah untuk informasi selanjutnya.' :
                          ppdb.status === 'Ditolak' ? 'Terima kasih telah mendaftar. Silahkan hubungi kontak sekolah untuk informasi lebih lanjut.' :
                            'Pendaftaran Anda sedang dalam proses verifikasi. Harap menunggu pemberitahuan selanjutnya.'}
                      </p>
                      {ppdb.catatan && (
                        <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                          <p className="text-sm font-medium text-gray-800 mb-1">Catatan:</p>
                          <p className="text-sm text-gray-600">{ppdb.catatan}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Data Siswa */}
                <div className="border border-gray-200 rounded-lg mb-6">
                  <div className="px-5 py-4 border-b border-gray-200 flex items-center bg-gray-50">
                    <User className="w-5 h-5 text-orange-500 mr-3" />
                    <h2 className="font-semibold text-gray-800">Data Siswa</h2>
                  </div>
                  <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Nama Lengkap</p>
                      <p className="text-gray-800">{ppdb.nama_lengkap}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">NISN</p>
                      <p className="text-gray-800">{ppdb.nisn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Tempat, Tanggal Lahir</p>
                      <p className="text-gray-800">{ppdb.tempat_lahir}, {new Date(ppdb.tanggal_lahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Jenis Kelamin</p>
                      <p className="text-gray-800">{ppdb.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500 mb-1">Alamat</p>
                      <p className="text-gray-800">{ppdb.alamat}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500 mb-1">Detail Alamat</p>
                      <p className="text-gray-800">
                        RT {ppdb.rt} / RW {ppdb.rw}, Kel. {ppdb.desa}, Kec. {ppdb.kecamatan}, {ppdb.kabupaten}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">No. Telepon</p>
                      <p className="text-gray-800">{ppdb.telepon_hp}</p>
                    </div>
                  </div>
                </div>

                {/* Data Orang Tua */}
                <div className="border border-gray-200 rounded-lg mb-6">
                  <div className="px-5 py-4 border-b border-gray-200 flex items-center bg-gray-50">
                    <User className="w-5 h-5 text-orange-500 mr-3" />
                    <h2 className="font-semibold text-gray-800">Data Orang Tua</h2>
                  </div>
                  <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Nama Ayah</p>
                      <p className="text-gray-800">{ppdb.nama_ayah || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Pekerjaan Ayah</p>
                      <p className="text-gray-800">{ppdb.pekerjaan_ayah || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Nama Ibu</p>
                      <p className="text-gray-800">{ppdb.nama_ibu || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Pekerjaan Ibu</p>
                      <p className="text-gray-800">{ppdb.pekerjaan_ibu || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Data Akademik */}
                <div className="border border-gray-200 rounded-lg mb-6">
                  <div className="px-5 py-4 border-b border-gray-200 flex items-center bg-gray-50">
                    <School className="w-5 h-5 text-orange-500 mr-3" />
                    <h2 className="font-semibold text-gray-800">Data Akademik</h2>
                  </div>
                  <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Asal Sekolah</p>
                      <p className="text-gray-800">{ppdb.sekolah_asal || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Jurusan Pilihan</p>
                      <p className="text-gray-800">{ppdb.jurusan_1 || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Dokumen */}
                <div className="border border-gray-200 rounded-lg">
                  <div className="px-5 py-4 border-b border-gray-200 flex items-center bg-gray-50">
                    <FileText className="w-5 h-5 text-orange-500 mr-3" />
                    <h2 className="font-semibold text-gray-800">Dokumen</h2>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {ppdb.foto && (
                        <a
                          href={`/storage/${ppdb.foto}`}
                          target="_blank"
                          className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 group transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-orange-100 group-hover:bg-orange-200 flex items-center justify-center mr-3 transition-colors">
                            <User className="h-5 w-5 text-orange-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-gray-800 font-medium">Pas Foto</h3>
                            <p className="text-gray-500 text-sm">Lihat Dokumen</p>
                          </div>
                        </a>
                      )}

                      {ppdb.ijazah_file && (
                        <a
                          href={`/storage/${ppdb.ijazah_file}`}
                          target="_blank"
                          className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 group transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-orange-100 group-hover:bg-orange-200 flex items-center justify-center mr-3 transition-colors">
                            <GraduationCap className="h-5 w-5 text-orange-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-gray-800 font-medium">Ijazah</h3>
                            <p className="text-gray-500 text-sm">Lihat Dokumen</p>
                          </div>
                        </a>
                      )}

                      {ppdb.kk_file && (
                        <a
                          href={`/storage/${ppdb.kk_file}`}
                          target="_blank"
                          className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 group transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-orange-100 group-hover:bg-orange-200 flex items-center justify-center mr-3 transition-colors">
                            <FileText className="h-5 w-5 text-orange-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-gray-800 font-medium">Kartu Keluarga</h3>
                            <p className="text-gray-500 text-sm">Lihat Dokumen</p>
                          </div>
                        </a>
                      )}

                      {ppdb.akta_lahir_file && (
                        <a
                          href={`/storage/${ppdb.akta_lahir_file}`}
                          target="_blank"
                          className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 group transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-orange-100 group-hover:bg-orange-200 flex items-center justify-center mr-3 transition-colors">
                            <FileText className="h-5 w-5 text-orange-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-gray-800 font-medium">Akta Kelahiran</h3>
                            <p className="text-gray-500 text-sm">Lihat Dokumen</p>
                          </div>
                        </a>
                      )}

                      {ppdb.rapor_file && (
                        <a
                          href={`/storage/${ppdb.rapor_file}`}
                          target="_blank"
                          className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 group transition-colors"
                        >
                          <div className="w-10 h-10 rounded-lg bg-orange-100 group-hover:bg-orange-200 flex items-center justify-center mr-3 transition-colors">
                            <BookOpen className="h-5 w-5 text-orange-500" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-gray-800 font-medium">Rapor</h3>
                            <p className="text-gray-500 text-sm">Lihat Dokumen</p>
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Link
                href="/spmb/status"
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-700 font-medium transition-all duration-300 flex items-center"
              >
                Kembali ke Status Pendaftaran
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
} 