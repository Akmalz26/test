import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import {
  ArrowLeft, Download, FileText, Calendar, User, Mail,
  Phone, MapPin, School, GraduationCap, Clock, CheckCircle,
  AlertTriangle, Book, BookOpen, MessageSquare, Save
} from 'lucide-react';

export default function AdminPpdbShow({ auth, ppdb, documents = [] }) {
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const page = usePage();
  const urlParams = new URLSearchParams(window.location.search);
  const action = urlParams.get('action');

  // Detect action=edit from URL and open edit form automatically
  useEffect(() => {
    if (action === 'edit') {
      setIsEditingStatus(true);
    }
  }, [action]);

  const { data, setData, post, processing, errors } = useForm({
    status: ppdb?.status || 'menunggu',
    notes: ppdb?.catatan || '',
    _method: 'PUT'
  });

  const handleStatusChange = (e) => {
    setData('status', e.target.value);
  };

  const handleNotesChange = (e) => {
    setData('notes', e.target.value);
  };

  const submitStatus = (e) => {
    e.preventDefault();
    post(route('admin.ppdb.update-status', ppdb.id), {
      onSuccess: () => {
        setIsEditingStatus(false);
        setIsEditingNotes(false);
      },
      preserveScroll: true
    });
  };

  // Jika data tidak ditemukan
  if (!ppdb) {
    return (
      <AdminLayout>
        <Head title="Data Tidak Ditemukan - Admin Dashboard" />

        <div className="px-6 py-12">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-4">Data Tidak Ditemukan</h2>
            <p className="text-gray-500 text-center mb-8">
              Data pendaftaran SPMB tidak ditemukan atau telah dihapus.
            </p>
            <div className="flex justify-center">
              <Link
                href={route('admin.ppdb.index')}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition-all duration-300"
              >
                Kembali ke Daftar Pendaftar
              </Link>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Head title={`Detail Pendaftaran ${ppdb.nama_lengkap} - Admin Dashboard`} />

      <div className="px-6 py-8">
        {/* Header dengan tombol kembali */}
        <div className="mb-8">
          <Link
            href={route('admin.ppdb.index')}
            className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Kembali ke Daftar Pendaftar</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{ppdb.nama_lengkap}</h1>
              <p className="text-gray-500 mt-1">
                Nomor Pendaftaran: {ppdb.nomor_pendaftaran}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={route('admin.ppdb.print', ppdb.id)}
                target="_blank"
                className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Cetak Formulir
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Biodata Siswa */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Biodata Siswa</h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DataItem label="Nama Lengkap" value={ppdb.nama_lengkap} />
                  <DataItem label="NISN" value={ppdb.nisn} />
                  <DataItem label="Tempat Lahir" value={ppdb.tempat_lahir} />
                  <DataItem
                    label="Tanggal Lahir"
                    value={new Date(ppdb.tanggal_lahir).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  />
                  <DataItem label="Jenis Kelamin" value={ppdb.jenis_kelamin} />
                  <DataItem label="Email" value={ppdb.user?.email} icon={<Mail className="h-4 w-4 text-orange-500" />} />
                  <DataItem label="No. Telepon" value={ppdb.telepon_hp} icon={<Phone className="h-4 w-4 text-orange-500" />} />
                  <DataItem label="Alamat" value={
                    ppdb.alamat ?
                      `${ppdb.alamat || ''} ${ppdb.rt ? `RT.${ppdb.rt}` : ''} ${ppdb.rw ? `RW.${ppdb.rw}` : ''} ${ppdb.desa || ''}, ${ppdb.kecamatan || ''}, ${ppdb.kabupaten || ''} ${ppdb.kode_pos || ''}`
                      : '-'
                  } icon={<MapPin className="h-4 w-4 text-orange-500" />} span="md:col-span-2" />
                </div>
              </div>
            </div>

            {/* Data Asal Sekolah */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Data Asal Sekolah</h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DataItem label="Asal Sekolah" value={ppdb.sekolah_asal} icon={<School className="h-4 w-4 text-orange-500" />} />
                  <DataItem label="Alamat Sekolah" value={ppdb.alamat_sekolah} />
                  <DataItem label="Telepon Sekolah" value={ppdb.telepon_sekolah} />
                </div>
              </div>
            </div>

            {/* Data Orang Tua */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Data Orang Tua</h2>
              </div>

              <div className="p-6">
                <h3 className="text-md font-medium text-gray-800 mb-4">Data Ayah</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <DataItem label="Nama Ayah" value={ppdb.nama_ayah} />
                  <DataItem label="Pekerjaan Ayah" value={ppdb.pekerjaan_ayah} />
                  <DataItem label="No. Telepon" value={ppdb.telepon_rumah} icon={<Phone className="h-4 w-4 text-orange-500" />} />
                </div>

                <h3 className="text-md font-medium text-gray-800 mb-4">Data Ibu</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DataItem label="Nama Ibu" value={ppdb.nama_ibu} />
                  <DataItem label="Pekerjaan Ibu" value={ppdb.pekerjaan_ibu} />
                </div>

                <h3 className="text-md font-medium text-gray-800 mt-8 mb-4">Alamat Orang Tua</h3>
                <div className="grid grid-cols-1 gap-6">
                  <DataItem label="Alamat" value={
                    ppdb.alamat_ortu ?
                      `${ppdb.alamat_ortu || ''} ${ppdb.rt_ortu ? `RT.${ppdb.rt_ortu}` : ''} ${ppdb.rw_ortu ? `RW.${ppdb.rw_ortu}` : ''} ${ppdb.desa_ortu || ''}, ${ppdb.kecamatan_ortu || ''}, ${ppdb.kabupaten_ortu || ''} ${ppdb.kode_pos_ortu || ''}`
                      : '-'
                  } icon={<MapPin className="h-4 w-4 text-orange-500" />} />
                </div>
              </div>
            </div>

            {/* Jurusan */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Jurusan</h2>
              </div>

              <div className="p-6">
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <div className="flex items-center mb-2">
                    <GraduationCap className="h-5 w-5 text-orange-500 mr-2" />
                    <h3 className="text-gray-900 font-medium">PPLG (Program Pengembangan Perangkat Lunak dan Gim)</h3>
                  </div>
                  <p className="text-gray-800">Jurusan yang berfokus pada pengembangan aplikasi, website, dan permainan digital.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            {/* Status Pendaftaran */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Status Pendaftaran</h2>

                <button
                  type="button"
                  onClick={() => setIsEditingStatus(!isEditingStatus)}
                  className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                >
                  {isEditingStatus ? 'Batal' : 'Ubah'}
                </button>
              </div>

              <div className="p-6">
                {isEditingStatus ? (
                  <form onSubmit={submitStatus}>
                    <div className="mb-4">
                      <label htmlFor="status-select" className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        id="status-select"
                        name="status"
                        value={data.status}
                        onChange={handleStatusChange}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                        aria-label="Pilih status pendaftaran"
                      >
                        <option value="Menunggu">Menunggu Verifikasi</option>
                        <option value="Verifikasi">Verifikasi Dokumen</option>
                        <option value="Diterima">Diterima</option>
                        <option value="Ditolak">Ditolak</option>
                        <option value="Cadangan">Cadangan</option>
                      </select>
                      {errors.status && (
                        <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors disabled:bg-orange-300 flex items-center"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Simpan Perubahan
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
                      <div className="flex items-center mb-1">
                        <Clock className="h-4 w-4 text-gray-500 mr-2" />
                        <h3 className="text-gray-800 font-medium">Tanggal Daftar</h3>
                      </div>
                      <p className="text-gray-600">
                        {new Date(ppdb.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-800 font-medium">Status Saat Ini</span>
                      <StatusBadge status={ppdb.status} />
                    </div>

                    {ppdb.status === 'diterima' && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-lg">
                        <p className="text-green-700 text-sm">
                          Pendaftar telah diterima. Silahkan hubungi untuk melakukan daftar ulang.
                        </p>
                      </div>
                    )}

                    {ppdb.status === 'ditolak' && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg">
                        <p className="text-red-700 text-sm">
                          Pendaftar tidak lolos seleksi SPMB. Mohon tambahkan catatan alasan penolakan.
                        </p>
                      </div>
                    )}

                    {ppdb.status === 'cadangan' && (
                      <div className="mt-4 p-3 bg-purple-50 border border-purple-100 rounded-lg">
                        <p className="text-purple-700 text-sm">
                          Pendaftar masuk dalam daftar cadangan. Akan diterima jika ada pendaftar yang mengundurkan diri.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Catatan */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Catatan</h2>

                <button
                  type="button"
                  onClick={() => setIsEditingNotes(!isEditingNotes)}
                  className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                >
                  {isEditingNotes ? 'Batal' : 'Ubah'}
                </button>
              </div>

              <div className="p-6">
                {isEditingNotes ? (
                  <form onSubmit={submitStatus}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Catatan untuk Pendaftar
                      </label>
                      <textarea
                        name="notes"
                        value={data.notes}
                        onChange={handleNotesChange}
                        rows={4}
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                        placeholder="Tambahkan catatan untuk pendaftar..."
                      ></textarea>
                      <p className="mt-1 text-xs text-gray-500">
                        Catatan ini akan terlihat oleh pendaftar pada halaman status pendaftaran.
                      </p>
                      {errors.notes && (
                        <p className="mt-1 text-sm text-red-600">{errors.notes}</p>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors disabled:bg-orange-300 flex items-center"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Simpan Catatan
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    {ppdb.catatan ? (
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex items-start mb-2">
                          <MessageSquare className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                          <p className="text-gray-800">{ppdb.catatan}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <MessageSquare className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                        <p>Belum ada catatan</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Dokumen */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Dokumen</h2>
              </div>

              <div className="divide-y divide-gray-200">
                <DocumentItem
                  label="Foto"
                  file={ppdb.foto}
                  ppdbId={ppdb.id}
                  type="foto"
                />
                <DocumentItem
                  label="Kartu Keluarga"
                  file={ppdb.kk_file}
                  ppdbId={ppdb.id}
                  type="kk"
                />
                <DocumentItem
                  label="Akta Kelahiran"
                  file={ppdb.akta_lahir_file}
                  ppdbId={ppdb.id}
                  type="akta"
                />
                <DocumentItem
                  label="Ijazah"
                  file={ppdb.ijazah_file}
                  ppdbId={ppdb.id}
                  type="ijazah"
                />
                <DocumentItem
                  label="Rapor"
                  file={ppdb.rapor_file}
                  ppdbId={ppdb.id}
                  type="rapor"
                />
                <DocumentItem
                  label="SKHUN"
                  file={ppdb.skhun_file}
                  ppdbId={ppdb.id}
                  type="skhun"
                />
                <DocumentItem
                  label="KTP Orang Tua"
                  file={ppdb.ktp_ortu_file}
                  ppdbId={ppdb.id}
                  type="ktp_ortu"
                />
                <DocumentItem
                  label="KIP/KKS/KPS"
                  file={ppdb.kip_kks_kps_file}
                  ppdbId={ppdb.id}
                  type="kip"
                />
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
    'Menunggu': {
      color: 'bg-amber-100 text-amber-700 border-amber-200',
      icon: <Clock className="h-4 w-4" />,
      text: 'Menunggu Verifikasi'
    },
    'Verifikasi': {
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      icon: <BookOpen className="h-4 w-4" />,
      text: 'Verifikasi Dokumen'
    },
    'Diterima': {
      color: 'bg-green-100 text-green-700 border-green-200',
      icon: <CheckCircle className="h-4 w-4" />,
      text: 'Diterima'
    },
    'Ditolak': {
      color: 'bg-red-100 text-red-700 border-red-200',
      icon: <AlertTriangle className="h-4 w-4" />,
      text: 'Ditolak'
    },
    'Cadangan': {
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      icon: <Book className="h-4 w-4" />,
      text: 'Cadangan'
    }
  };

  const config = statusConfig[status] || statusConfig['Menunggu'];

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full ${config.color} border text-xs font-medium`}>
      {config.icon}
      <span className="ml-1.5">{config.text}</span>
    </div>
  );
};

// Component untuk menampilkan data item
const DataItem = ({ label, value, icon, span = '' }) => {
  return (
    <div className={span}>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{label}</h3>
      <div className="flex items-center">
        {icon && <div className="mr-2">{icon}</div>}
        <p className="text-gray-900 font-medium">{value || '-'}</p>
      </div>
    </div>
  );
};

// Component untuk menampilkan dokumen dengan tombol download
const DocumentItem = ({ label, file, ppdbId, type }) => {
  const downloadUrl = file ? `/admin/spmb/${ppdbId}/download/${type}` : null;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <FileText className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
          <h3 className="text-gray-800 font-medium">{label}</h3>
        </div>

        {file ? (
          <div className="flex gap-2">
            <a
              href={`/storage/${file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-xs font-medium transition-all duration-300 inline-flex items-center"
            >
              <FileText className="h-3 w-3 mr-1" />
              Lihat
            </a>
            <a
              href={downloadUrl}
              className="px-3 py-1 bg-orange-100 hover:bg-orange-200 rounded-lg text-orange-700 text-xs font-medium transition-all duration-300 inline-flex items-center"
            >
              <Download className="h-3 w-3 mr-1" />
              Download
            </a>
          </div>
        ) : (
          <span className="text-gray-400 text-xs">Belum diunggah</span>
        )}
      </div>
    </div>
  );
}; 