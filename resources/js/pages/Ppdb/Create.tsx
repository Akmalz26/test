import React, { useState, useEffect } from 'react';
import { Head, useForm, Link, router } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  User, Home, BookOpen, Calendar, FileText, Upload, Phone, Mail,
  Camera, GraduationCap, AlertCircle, CheckCircle, Info, AlertTriangle, Check
} from 'lucide-react';
import FormSection from './Components/FormSection';
import FormField from './Components/FormField';
import UploadField from './Components/UploadField';

// Tipe untuk info file
interface FileInfo {
  name: string;
  preview?: string;
  isExisting?: boolean;
}

// Form data interface
interface PpdbFormData {
  nama_lengkap: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  nik: string;
  nisn: string;
  agama: string;
  email: string;
  no_hp: string;
  alamat: string;
  rt: string;
  rw: string;
  kelurahan: string;
  kecamatan: string;
  kota: string;
  provinsi: string;
  kode_pos: string;
  asal_sekolah: string;
  alamat_sekolah: string;
  telepon_sekolah: string;
  tahun_lulus: number;
  is_pesantren: string;

  // Data Orang Tua
  nama_ayah: string;
  pekerjaan_ayah: string;
  penghasilan_ayah: string;
  pendidikan_ayah: string;
  no_hp_ayah: string;

  nama_ibu: string;
  pekerjaan_ibu: string;
  penghasilan_ibu: string;
  pendidikan_ibu: string;
  no_hp_ibu: string;

  // Alamat Orang Tua
  alamat_ortu: string;
  rt_ortu: string;
  rw_ortu: string;
  kelurahan_ortu: string;
  kecamatan_ortu: string;
  kota_ortu: string;
  provinsi_ortu: string;
  kode_pos_ortu: string;

  // Data Wali (opsional)
  nama_wali: string;
  pekerjaan_wali: string;
  penghasilan_wali: string;
  pendidikan_wali: string;
  no_hp_wali: string;
  hubungan_wali: string;

  // Dokumen
  pas_foto: File | null;
  kartu_keluarga: File | null;
  akta_kelahiran: File | null;
  ijazah: File | null;
  rapor: File | null;

  // Informasi file yang sudah diupload sebelumnya
  pas_foto_info: FileInfo | null;
  kartu_keluarga_info: FileInfo | null;
  akta_kelahiran_info: FileInfo | null;
  ijazah_info: FileInfo | null;
  rapor_info: FileInfo | null;
}

export default function PpdbCreate({ auth, existingApplication = null }: { auth: any, existingApplication?: any }) {
  const { data, setData, post, processing: isProcessing, errors, reset, progress } = useForm<PpdbFormData>('ppdb_form', {
    // Data Siswa
    nama_lengkap: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    nik: '',
    nisn: '',
    agama: 'Islam',
    email: '',
    no_hp: '',
    alamat: '',
    rt: '',
    rw: '',
    kelurahan: '',
    kecamatan: '',
    kota: '',
    provinsi: '',
    kode_pos: '',
    asal_sekolah: '',
    alamat_sekolah: '',
    telepon_sekolah: '',
    tahun_lulus: new Date().getFullYear(),
    is_pesantren: 'Tidak',

    // Data Orang Tua
    nama_ayah: '',
    pekerjaan_ayah: '',
    penghasilan_ayah: '',
    pendidikan_ayah: '',
    no_hp_ayah: '',

    nama_ibu: '',
    pekerjaan_ibu: '',
    penghasilan_ibu: '',
    pendidikan_ibu: '',
    no_hp_ibu: '',

    // Alamat Orang Tua
    alamat_ortu: '',
    rt_ortu: '',
    rw_ortu: '',
    kelurahan_ortu: '',
    kecamatan_ortu: '',
    kota_ortu: '',
    provinsi_ortu: '',
    kode_pos_ortu: '',

    // Data Wali (opsional)
    nama_wali: '',
    pekerjaan_wali: '',
    penghasilan_wali: '',
    pendidikan_wali: '',
    no_hp_wali: '',
    hubungan_wali: '',

    // Dokumen
    pas_foto: null,
    kartu_keluarga: null,
    akta_kelahiran: null,
    ijazah: null,
    rapor: null,

    // Informasi file yang sudah diupload sebelumnya
    pas_foto_info: null,
    kartu_keluarga_info: null,
    akta_kelahiran_info: null,
    ijazah_info: null,
    rapor_info: null,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  const STORAGE_KEY = 'ppdb_form_draft';
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Terjadi kesalahan saat mengirim pendaftaran. Mohon periksa kembali data Anda.');
  const [processing, setProcessing] = useState(false);

  // Load saved form data from localStorage atau existing application
  useEffect(() => {
    // Jika ada existingApplication, set form ke mode edit
    if (existingApplication) {
      setIsEditMode(true);
      populateFormFromExistingData(existingApplication);
    } else {
      // Jika tidak ada existing application, coba load dari localStorage
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          const parsedData = JSON.parse(savedData);

          // Extract data without file objects (which can't be stored in localStorage)
          const { pas_foto, kartu_keluarga, akta_kelahiran, ijazah, rapor, ...storedFormData } = parsedData;

          // Load saved step
          if (parsedData.currentStep) {
            setCurrentStep(parsedData.currentStep);
          }

          // Merge saved data with initial state
          setData(prevData => ({
            ...prevData,
            ...storedFormData
          }));
        }
      } catch (error) {
        console.error('Error loading form data:', error);
      }
    }

    setIsFormLoaded(true);
  }, [existingApplication]);

  // Fungsi untuk mengisi form dengan data yang sudah ada
  const populateFormFromExistingData = (existingData: any) => {
    console.log('Loading existing data:', existingData);

    // Fungsi untuk mendapatkan file info dari URL
    const getFileInfoFromUrl = (url: string | null) => {
      if (!url) return null;
      const filename = url.split('/').pop();
      return {
        name: filename || 'Dokumen sudah diupload',
        preview: url,
        isExisting: true
      };
    };

    // Update form data dengan data yang sudah ada
    setData({
      // Data Siswa
      nama_lengkap: existingData.nama_lengkap || '',
      tempat_lahir: existingData.tempat_lahir || '',
      tanggal_lahir: existingData.tanggal_lahir || '',
      jenis_kelamin: existingData.jenis_kelamin || '',
      nik: existingData.nik || '',
      nisn: existingData.nisn || '',
      agama: existingData.agama || 'Islam',
      email: existingData.user?.email || '',
      no_hp: existingData.telepon_hp || '',
      alamat: existingData.alamat || '',
      rt: existingData.rt || '',
      rw: existingData.rw || '',
      kelurahan: existingData.desa || '',
      kecamatan: existingData.kecamatan || '',
      kota: existingData.kabupaten || '',
      provinsi: existingData.provinsi || '',
      kode_pos: existingData.kode_pos || '',
      asal_sekolah: existingData.sekolah_asal || '',
      alamat_sekolah: existingData.alamat_sekolah || '',
      telepon_sekolah: existingData.telepon_sekolah || '',
      tahun_lulus: existingData.tahun_lulus || new Date().getFullYear(),
      is_pesantren: existingData.is_pesantren ? 'Ya' : 'Tidak',

      // Data Orang Tua
      nama_ayah: existingData.nama_ayah || '',
      pekerjaan_ayah: existingData.pekerjaan_ayah || '',
      penghasilan_ayah: existingData.penghasilan_ayah || '',
      pendidikan_ayah: existingData.pendidikan_ayah || '',
      no_hp_ayah: existingData.no_hp_ayah || '',

      nama_ibu: existingData.nama_ibu || '',
      pekerjaan_ibu: existingData.pekerjaan_ibu || '',
      penghasilan_ibu: existingData.penghasilan_ibu || '',
      pendidikan_ibu: existingData.pendidikan_ibu || '',
      no_hp_ibu: existingData.no_hp_ibu || '',

      // Alamat Orang Tua
      alamat_ortu: existingData.alamat_ortu || '',
      rt_ortu: existingData.rt_ortu || '',
      rw_ortu: existingData.rw_ortu || '',
      kelurahan_ortu: existingData.desa_ortu || '',
      kecamatan_ortu: existingData.kecamatan_ortu || '',
      kota_ortu: existingData.kabupaten_ortu || '',
      provinsi_ortu: existingData.provinsi_ortu || '',
      kode_pos_ortu: existingData.kode_pos_ortu || '',

      // Data Wali
      nama_wali: existingData.nama_wali || '',
      pekerjaan_wali: existingData.pekerjaan_wali || '',
      penghasilan_wali: existingData.penghasilan_wali || '',
      pendidikan_wali: existingData.pendidikan_wali || '',
      no_hp_wali: existingData.no_hp_wali || '',
      hubungan_wali: existingData.hubungan_wali || '',

      // Informasi dokumen yang sudah diupload
      pas_foto: null,
      pas_foto_info: getFileInfoFromUrl(existingData.foto_url),

      kartu_keluarga: null,
      kartu_keluarga_info: getFileInfoFromUrl(existingData.kk_file_url),

      akta_kelahiran: null,
      akta_kelahiran_info: getFileInfoFromUrl(existingData.akta_lahir_file_url),

      ijazah: null,
      ijazah_info: getFileInfoFromUrl(existingData.ijazah_file_url),

      rapor: null,
      rapor_info: getFileInfoFromUrl(existingData.rapor_file_url),
    });

    // Log hasil pengisian form
    console.log('Form populated with existing data');
  };

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (!isFormLoaded) return;

    try {
      // Create a copy of the form data without file objects
      const { pas_foto, kartu_keluarga, akta_kelahiran, ijazah, rapor, ...dataToStore } = data;

      // Add current step
      const storageData = {
        ...dataToStore,
        currentStep
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  }, [data, currentStep, isFormLoaded]);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Logging untuk debug
    console.log('Submitting form data:', data);

    const endpoint = isEditMode
      ? route('ppdb.update', existingApplication?.id)
      : route('ppdb.store');

    // Validasi data client-side
    const requiredFields = [
      'nama_lengkap', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin',
      'nik', 'nisn', 'agama', 'alamat', 'rt', 'rw', 'kelurahan',
      'kecamatan', 'kota', 'provinsi', 'kode_pos', 'asal_sekolah'
    ];

    const fieldErrors: Record<string, string> = {};
    requiredFields.forEach(field => {
      if (!data[field as keyof typeof data]) {
        fieldErrors[field] = `Field ${field.replace('_', ' ')} harus diisi`;
      }
    });

    // Validasi file yang diperlukan
    if (!data.pas_foto && !data.pas_foto_info) {
      fieldErrors['pas_foto'] = 'Pas foto harus diupload';
    }

    if (!data.kartu_keluarga && !data.kartu_keluarga_info) {
      fieldErrors['kartu_keluarga'] = 'Kartu keluarga harus diupload';
    }

    if (!data.akta_kelahiran && !data.akta_kelahiran_info) {
      fieldErrors['akta_kelahiran'] = 'Akta kelahiran harus diupload';
    }

    if (Object.keys(fieldErrors).length > 0) {
      let errorHtml = '<ul class="text-left list-disc pl-5">';
      for (const [field, message] of Object.entries(fieldErrors)) {
        console.error(`Error pada field ${field}:`, message);
        errorHtml += `<li><strong>${field.replace('_', ' ')}</strong>: ${message}</li>`;
      }
      errorHtml += '</ul>';

      setProcessing(false);
      setErrorMessage(errorHtml);
      setShowErrorModal(true);
      return;
    }

    // Persiapkan data untuk dikirim
    const formData = {
      // Data siswa
      nama_lengkap: data.nama_lengkap,
      tempat_lahir: data.tempat_lahir,
      tanggal_lahir: data.tanggal_lahir,
      jenis_kelamin: data.jenis_kelamin,
      nik: data.nik,
      nisn: data.nisn,
      alamat: data.alamat,
      rt: data.rt,
      rw: data.rw,
      desa: data.kelurahan,
      kecamatan: data.kecamatan,
      kabupaten: data.kota,
      kode_pos: data.kode_pos,
      sekolah_asal: data.asal_sekolah,
      alamat_sekolah: data.alamat_sekolah,
      telepon_sekolah: data.telepon_sekolah,
      tahun_pelajaran: `${new Date().getFullYear()} - ${new Date().getFullYear() + 1}`,
      is_pesantren: data.is_pesantren === 'Ya',
      telepon_hp: data.no_hp,

      // Data orang tua
      nama_ayah: data.nama_ayah,
      nama_ibu: data.nama_ibu,
      pekerjaan_ayah: data.pekerjaan_ayah,
      pekerjaan_ibu: data.pekerjaan_ibu,

      // Alamat orang tua
      alamat_ortu: data.alamat_ortu,
      rt_ortu: data.rt_ortu,
      rw_ortu: data.rw_ortu,
      desa_ortu: data.kelurahan_ortu,
      kecamatan_ortu: data.kecamatan_ortu,
      kabupaten_ortu: data.kota_ortu,
      kode_pos_ortu: data.kode_pos_ortu,

      // File uploads - tambahkan flag untuk dokumen yang sudah ada sebelumnya
      ...(data.pas_foto ? { foto: data.pas_foto } : {}),
      ...(data.pas_foto_info && !data.pas_foto ? { foto_exists: true } : {}),

      ...(data.kartu_keluarga ? { kk_file: data.kartu_keluarga } : {}),
      ...(data.kartu_keluarga_info && !data.kartu_keluarga ? { kk_file_exists: true } : {}),

      ...(data.akta_kelahiran ? { akta_lahir_file: data.akta_kelahiran } : {}),
      ...(data.akta_kelahiran_info && !data.akta_kelahiran ? { akta_lahir_file_exists: true } : {}),

      ...(data.ijazah ? { ijazah_file: data.ijazah } : {}),
      ...(data.ijazah_info && !data.ijazah ? { ijazah_file_exists: true } : {}),

      ...(data.rapor ? { rapor_file: data.rapor } : {}),
      ...(data.rapor_info && !data.rapor ? { rapor_file_exists: true } : {}),

      // Gunakan ijazah untuk SKHUN jika tidak ada file terpisah
      ...(data.ijazah ? { skhun_file: data.ijazah } : {}),
      ...(data.ijazah_info && !data.ijazah ? { skhun_file_exists: true } : {}),

      // Gunakan KK untuk KTP ortu jika tidak ada file terpisah
      ...(data.kartu_keluarga ? { ktp_ortu_file: data.kartu_keluarga } : {}),
      ...(data.kartu_keluarga_info && !data.kartu_keluarga ? { ktp_ortu_file_exists: true } : {})
    };

    // Kirim data ke server
    router.post(endpoint, formData, {
      forceFormData: true,
      onSuccess: () => {
        // Hapus data draft
        localStorage.removeItem(STORAGE_KEY);

        setShowSuccessModal(true);
        setProcessing(false);
        setTimeout(() => {
          router.visit(route('ppdb.status'));
        }, 3000);
      },
      onError: (errors) => {
        console.error('Error submitting form:', errors);

        let errorHtml = '<ul class="text-left list-disc pl-5">';
        // Cek apakah ada objek errors untuk ditampilkan
        if (Object.keys(errors).length > 0) {
          for (const [field, message] of Object.entries(errors)) {
            console.error(`Error pada field ${field}:`, message);
            errorHtml += `<li><strong>${field.replace('_', ' ')}</strong>: ${message}</li>`;
          }
        } else {
          // Jika tidak ada detail error spesifik
          errorHtml += '<li>Terjadi kesalahan saat mengirim data. Silakan coba lagi.</li>';
        }
        errorHtml += '</ul>';

        setProcessing(false);
        setErrorMessage(errorHtml);
        setShowErrorModal(true);

        // Tetap di halaman terakhir (dokumen)
        setCurrentStep(3);
      },
      onFinish: () => {
        setProcessing(false);
      }
    });
  };

  // Perbaikan untuk File Input errors
  const handleFileChange = (field: 'pas_foto' | 'kartu_keluarga' | 'akta_kelahiran' | 'ijazah' | 'rapor', files: FileList | null) => {
    if (files && files[0]) {
      setData(field, files[0]);
    }
  };

  const stepTitles = [
    'Data Siswa',
    'Data Orang Tua',
    'Upload Dokumen'
  ];

  // Opsi untuk dropdown
  const options = {
    agama: ['Islam'],
    gender: ['Laki-laki', 'Perempuan'],
    pesantren: ['Ya', 'Tidak'],
    pendidikan: ['SD/Sederajat', 'SMP/Sederajat', 'SMA/Sederajat', 'D1', 'D2', 'D3', 'D4/S1', 'S2', 'S3'],
    pekerjaan: ['Tidak Bekerja', 'PNS', 'TNI/Polri', 'Karyawan Swasta', 'Wiraswasta', 'Buruh', 'Petani/Nelayan', 'Pensiunan', 'Lainnya'],
    penghasilan: ['< Rp. 1.000.000', 'Rp. 1.000.000 - Rp. 3.000.000', 'Rp. 3.000.000 - Rp. 5.000.000', 'Rp. 5.000.000 - Rp. 10.000.000', '> Rp. 10.000.000']
  };

  // Jika sudah ada aplikasi yang disubmit dan bukan mode edit, tampilkan pesan
  if (existingApplication && !isEditMode) {
    return (
      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />
        <div className="container mx-auto px-6 py-28">
          <div className="max-w-2xl mx-auto bg-gray-50 shadow-md p-8 rounded-xl border border-gray-200">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-orange-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">Anda Sudah Terdaftar</h2>
            <p className="text-gray-600 text-center mb-8">
              Anda sudah memiliki pendaftaran aktif pada sistem kami. Silahkan cek status pendaftaran Anda atau edit data pendaftaran.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/spmb/status" className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition-all duration-300 text-center">
                Cek Status Pendaftaran
              </Link>
              <button
                onClick={() => setIsEditMode(true)}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-700 font-medium transition-all duration-300 text-center"
              >
                Edit Pendaftaran
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Jika belum login, redirect ke halaman login
  if (!auth.user) {
    return (
      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />
        <div className="container mx-auto px-6 py-28">
          <div className="max-w-2xl mx-auto bg-gray-50 shadow-md p-8 rounded-xl border border-gray-200">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Info className="h-8 w-8 text-orange-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">Login Diperlukan</h2>
            <p className="text-gray-600 text-center mb-8">
              Untuk melakukan pendaftaran SPMB, Anda perlu login atau daftar akun terlebih dahulu.
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

  return (
    <>
      <Head title={isEditMode ? 'Edit Formulir Pendaftaran SPMB - SMK IT Baitul Aziz' : 'Formulir Pendaftaran SPMB - SMK IT Baitul Aziz'} />

      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />

        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {isEditMode ? 'Edit Formulir' : 'Formulir Pendaftaran'} <span className="text-orange-500">SPMB</span>
              </h1>
              <p className="text-gray-600 max-w-xl mx-auto mb-4">
                {isEditMode
                  ? 'Silahkan edit data pendaftaran Anda sesuai kebutuhan. Pastikan data yang diubah sudah benar.'
                  : 'Silahkan isi formulir pendaftaran dengan data yang sesuai dan benar. Data yang Anda berikan akan digunakan untuk proses seleksi.'
                }
              </p>

              {existingApplication && (
                <div className="mt-6 flex justify-center">
                  {isEditMode ? (
                    <div className="px-4 py-2 bg-orange-100 border border-orange-200 rounded-lg">
                      <span className="text-orange-600 font-medium">Mode Edit Aktif</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditMode(true)}
                      className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition-all duration-300 flex items-center"
                    >
                      <FileText className="h-5 w-5 mr-2" /> Edit Formulir Pendaftaran
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {stepTitles.map((title, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => index + 1 <= currentStep && setCurrentStep(index + 1)}
                    className={`text-xs sm:text-sm font-medium ${index + 1 <= currentStep ? 'text-orange-500' : 'text-gray-400'
                      } ${index + 1 === currentStep ? 'font-bold' : ''}`}
                    disabled={index + 1 > currentStep}
                  >
                    {index + 1}. {title}
                  </button>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden">
              {/* Step 1: Data Siswa */}
              {currentStep === 1 && (
                <div>
                  <FormSection
                    title="Data Diri Siswa"
                    description="Masukkan data diri calon siswa sesuai dengan dokumen resmi."
                    icon={<User className="h-5 w-5" />}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        label="Nama Lengkap"
                        name="nama_lengkap"
                        value={String(data.nama_lengkap || '')}
                        onChange={(e) => setData('nama_lengkap', e.target.value)}
                        error={errors.nama_lengkap}
                        required
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          label="Tempat Lahir"
                          name="tempat_lahir"
                          value={String(data.tempat_lahir || '')}
                          onChange={(e) => setData('tempat_lahir', e.target.value)}
                          error={errors.tempat_lahir}
                          required
                        />

                        <FormField
                          label="Tanggal Lahir"
                          name="tanggal_lahir"
                          type="date"
                          value={String(data.tanggal_lahir || '')}
                          onChange={(e) => setData('tanggal_lahir', e.target.value)}
                          error={errors.tanggal_lahir}
                          required
                        />
                      </div>

                      <FormField
                        label="Jenis Kelamin"
                        name="jenis_kelamin"
                        type="select"
                        value={String(data.jenis_kelamin || '')}
                        onChange={(e) => setData('jenis_kelamin', e.target.value)}
                        error={errors.jenis_kelamin}
                        options={options.gender}
                        required
                      />

                      <FormField
                        label="NIK"
                        name="nik"
                        value={String(data.nik || '')}
                        onChange={(e) => setData('nik', e.target.value)}
                        error={errors.nik}
                        required
                      />

                      <FormField
                        label="NISN"
                        name="nisn"
                        value={String(data.nisn || '')}
                        onChange={(e) => setData('nisn', e.target.value)}
                        error={errors.nisn}
                        required
                      />

                      <FormField
                        label="Agama"
                        name="agama"
                        type="select"
                        value={String(data.agama || '')}
                        onChange={(e) => setData('agama', e.target.value)}
                        error={errors.agama}
                        options={options.agama}
                        required
                      />

                      <FormField
                        label="Pesantren"
                        name="is_pesantren"
                        type="select"
                        value={String(data.is_pesantren || '')}
                        onChange={(e) => setData('is_pesantren', e.target.value)}
                        error={errors.is_pesantren}
                        options={options.pesantren}
                        required
                      />
                    </div>
                  </FormSection>

                  <FormSection
                    title="Kontak"
                    description="Informasi kontak yang dapat dihubungi."
                    icon={<Phone className="h-5 w-5" />}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        label="Email"
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        error={errors.email}
                        required
                      />

                      <FormField
                        label="Nomor HP"
                        name="no_hp"
                        value={data.no_hp}
                        onChange={(e) => setData('no_hp', e.target.value)}
                        error={errors.no_hp}
                        required
                      />
                    </div>
                  </FormSection>

                  <FormSection
                    title="Alamat"
                    description="Alamat tempat tinggal sesuai KTP/Kartu Keluarga."
                    icon={<Home className="h-5 w-5" />}
                  >
                    <div className="grid grid-cols-1 gap-6">
                      <FormField
                        label="Alamat Lengkap"
                        name="alamat"
                        type="textarea"
                        value={data.alamat}
                        onChange={(e) => setData('alamat', e.target.value)}
                        error={errors.alamat}
                        required
                      />

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <FormField
                          label="RT"
                          name="rt"
                          value={data.rt}
                          onChange={(e) => setData('rt', e.target.value)}
                          error={errors.rt}
                          required
                        />

                        <FormField
                          label="RW"
                          name="rw"
                          value={data.rw}
                          onChange={(e) => setData('rw', e.target.value)}
                          error={errors.rw}
                          required
                        />

                        <FormField
                          label="Kelurahan"
                          name="kelurahan"
                          value={data.kelurahan}
                          onChange={(e) => setData('kelurahan', e.target.value)}
                          error={errors.kelurahan}
                          required
                        />

                        <FormField
                          label="Kecamatan"
                          name="kecamatan"
                          value={data.kecamatan}
                          onChange={(e) => setData('kecamatan', e.target.value)}
                          error={errors.kecamatan}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          label="Kota/Kabupaten"
                          name="kota"
                          value={data.kota}
                          onChange={(e) => setData('kota', e.target.value)}
                          error={errors.kota}
                          required
                        />

                        <FormField
                          label="Provinsi"
                          name="provinsi"
                          value={data.provinsi}
                          onChange={(e) => setData('provinsi', e.target.value)}
                          error={errors.provinsi}
                          required
                        />

                        <FormField
                          label="Kode Pos"
                          name="kode_pos"
                          value={data.kode_pos}
                          onChange={(e) => setData('kode_pos', e.target.value)}
                          error={errors.kode_pos}
                          required
                        />
                      </div>
                    </div>
                  </FormSection>

                  <FormSection
                    title="Pendidikan"
                    description="Data pendidikan sebelumnya"
                    icon={<BookOpen className="h-5 w-5" />}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        label="Asal Sekolah"
                        name="asal_sekolah"
                        value={String(data.asal_sekolah || '')}
                        onChange={(e) => setData('asal_sekolah', e.target.value)}
                        error={errors.asal_sekolah}
                        required
                      />

                      <FormField
                        label="Tahun Lulus"
                        name="tahun_lulus"
                        type="number"
                        value={String(data.tahun_lulus || '')}
                        onChange={(e) => setData('tahun_lulus', e.target.value)}
                        error={errors.tahun_lulus}
                        required
                      />

                      <FormField
                        label="Alamat Sekolah"
                        name="alamat_sekolah"
                        value={String(data.alamat_sekolah || '')}
                        onChange={(e) => setData('alamat_sekolah', e.target.value)}
                        error={errors.alamat_sekolah}
                        required
                      />

                      <FormField
                        label="Telepon Sekolah"
                        name="telepon_sekolah"
                        value={String(data.telepon_sekolah || '')}
                        onChange={(e) => setData('telepon_sekolah', e.target.value)}
                        error={errors.telepon_sekolah}
                        required
                      />
                    </div>
                  </FormSection>
                </div>
              )}

              {/* Step 2: Data Orang Tua */}
              {currentStep === 2 && (
                <div>
                  <FormSection
                    title="Data Ayah"
                    description="Isi data ayah kandung sesuai dengan dokumen resmi."
                    icon={<User className="h-5 w-5" />}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        label="Nama Lengkap Ayah"
                        name="nama_ayah"
                        value={data.nama_ayah}
                        onChange={(e) => setData('nama_ayah', e.target.value)}
                        error={errors.nama_ayah}
                        required
                      />

                      <FormField
                        label="Nomor HP Ayah"
                        name="no_hp_ayah"
                        value={data.no_hp_ayah}
                        onChange={(e) => setData('no_hp_ayah', e.target.value)}
                        error={errors.no_hp_ayah}
                        required
                      />

                      <FormField
                        label="Pendidikan Terakhir"
                        name="pendidikan_ayah"
                        type="select"
                        value={data.pendidikan_ayah}
                        onChange={(e) => setData('pendidikan_ayah', e.target.value)}
                        error={errors.pendidikan_ayah}
                        options={options.pendidikan}
                        required
                      />

                      <FormField
                        label="Pekerjaan"
                        name="pekerjaan_ayah"
                        type="select"
                        value={data.pekerjaan_ayah}
                        onChange={(e) => setData('pekerjaan_ayah', e.target.value)}
                        error={errors.pekerjaan_ayah}
                        options={options.pekerjaan}
                        required
                      />

                      <FormField
                        label="Penghasilan per Bulan"
                        name="penghasilan_ayah"
                        type="select"
                        value={data.penghasilan_ayah}
                        onChange={(e) => setData('penghasilan_ayah', e.target.value)}
                        error={errors.penghasilan_ayah}
                        options={options.penghasilan}
                        required
                      />
                    </div>
                  </FormSection>

                  <FormSection
                    title="Data Ibu"
                    description="Isi data ibu kandung sesuai dengan dokumen resmi."
                    icon={<User className="h-5 w-5" />}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        label="Nama Lengkap Ibu"
                        name="nama_ibu"
                        value={data.nama_ibu}
                        onChange={(e) => setData('nama_ibu', e.target.value)}
                        error={errors.nama_ibu}
                        required
                      />

                      <FormField
                        label="Nomor HP Ibu"
                        name="no_hp_ibu"
                        value={data.no_hp_ibu}
                        onChange={(e) => setData('no_hp_ibu', e.target.value)}
                        error={errors.no_hp_ibu}
                        required
                      />

                      <FormField
                        label="Pendidikan Terakhir"
                        name="pendidikan_ibu"
                        type="select"
                        value={data.pendidikan_ibu}
                        onChange={(e) => setData('pendidikan_ibu', e.target.value)}
                        error={errors.pendidikan_ibu}
                        options={options.pendidikan}
                        required
                      />

                      <FormField
                        label="Pekerjaan"
                        name="pekerjaan_ibu"
                        type="select"
                        value={data.pekerjaan_ibu}
                        onChange={(e) => setData('pekerjaan_ibu', e.target.value)}
                        error={errors.pekerjaan_ibu}
                        options={options.pekerjaan}
                        required
                      />

                      <FormField
                        label="Penghasilan per Bulan"
                        name="penghasilan_ibu"
                        type="select"
                        value={data.penghasilan_ibu}
                        onChange={(e) => setData('penghasilan_ibu', e.target.value)}
                        error={errors.penghasilan_ibu}
                        options={options.penghasilan}
                        required
                      />
                    </div>
                  </FormSection>

                  <FormSection
                    title="Alamat Orang Tua"
                    description="Alamat tempat tinggal orang tua sesuai KTP/Kartu Keluarga."
                    icon={<Home className="h-5 w-5" />}
                  >
                    <div className="grid grid-cols-1 gap-6">
                      <FormField
                        label="Alamat Lengkap"
                        name="alamat_ortu"
                        type="textarea"
                        value={data.alamat_ortu}
                        onChange={(e) => setData('alamat_ortu', e.target.value)}
                        error={errors.alamat_ortu}
                        required
                      />

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <FormField
                          label="RT"
                          name="rt_ortu"
                          value={data.rt_ortu}
                          onChange={(e) => setData('rt_ortu', e.target.value)}
                          error={errors.rt_ortu}
                          required
                        />

                        <FormField
                          label="RW"
                          name="rw_ortu"
                          value={data.rw_ortu}
                          onChange={(e) => setData('rw_ortu', e.target.value)}
                          error={errors.rw_ortu}
                          required
                        />

                        <FormField
                          label="Kelurahan"
                          name="kelurahan_ortu"
                          value={data.kelurahan_ortu}
                          onChange={(e) => setData('kelurahan_ortu', e.target.value)}
                          error={errors.kelurahan_ortu}
                          required
                        />

                        <FormField
                          label="Kecamatan"
                          name="kecamatan_ortu"
                          value={data.kecamatan_ortu}
                          onChange={(e) => setData('kecamatan_ortu', e.target.value)}
                          error={errors.kecamatan_ortu}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          label="Kota/Kabupaten"
                          name="kota_ortu"
                          value={data.kota_ortu}
                          onChange={(e) => setData('kota_ortu', e.target.value)}
                          error={errors.kota_ortu}
                          required
                        />

                        <FormField
                          label="Provinsi"
                          name="provinsi_ortu"
                          value={data.provinsi_ortu}
                          onChange={(e) => setData('provinsi_ortu', e.target.value)}
                          error={errors.provinsi_ortu}
                          required
                        />

                        <FormField
                          label="Kode Pos"
                          name="kode_pos_ortu"
                          value={data.kode_pos_ortu}
                          onChange={(e) => setData('kode_pos_ortu', e.target.value)}
                          error={errors.kode_pos_ortu}
                          required
                        />
                      </div>
                    </div>
                  </FormSection>
                </div>
              )}

              {/* Step 3: Upload Dokumen */}
              {currentStep === 3 && (
                <div>
                  <FormSection
                    title="Dokumen Pendaftaran"
                    description="Upload dokumen-dokumen berikut dalam format JPG/PNG (ukuran maks. 2MB)"
                    icon={<Upload className="h-5 w-5" />}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <UploadField
                        label="Pas Foto 4x6"
                        name="pas_foto"
                        accept="image/*"
                        onChange={(e) => setData('pas_foto', e.target.files?.[0] || null)}
                        error={errors.pas_foto}
                        fileInfo={data.pas_foto_info as FileInfo | null}
                        required
                      />

                      <UploadField
                        label="Kartu Keluarga"
                        name="kartu_keluarga"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setData('kartu_keluarga', e.target.files?.[0] || null)}
                        error={errors.kartu_keluarga}
                        fileInfo={data.kartu_keluarga_info as FileInfo | null}
                        required
                      />

                      <UploadField
                        label="Akta Kelahiran"
                        name="akta_kelahiran"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setData('akta_kelahiran', e.target.files?.[0] || null)}
                        error={errors.akta_kelahiran}
                        fileInfo={data.akta_kelahiran_info as FileInfo | null}
                        required
                      />

                      <UploadField
                        label="Ijazah"
                        name="ijazah"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setData('ijazah', e.target.files?.[0] || null)}
                        error={errors.ijazah}
                        fileInfo={data.ijazah_info as FileInfo | null}
                        required={false}
                      />

                      <UploadField
                        label="Rapor"
                        name="rapor"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setData('rapor', e.target.files?.[0] || null)}
                        error={errors.rapor}
                        fileInfo={data.rapor_info as FileInfo | null}
                        required={false}
                      />
                    </div>
                  </FormSection>
                </div>
              )}

              {/* Navigation with cancel button in edit mode */}
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-5 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-700 font-medium transition-all duration-300"
                  >
                    Sebelumnya
                  </button>
                ) : (
                  isEditMode ? (
                    <Link
                      href="/spmb/status"
                      className="px-5 py-2 bg-red-100 hover:bg-red-200 border border-red-300 rounded-lg text-red-700 font-medium transition-all duration-300"
                    >
                      Batal
                    </Link>
                  ) : (
                    <div></div>
                  )
                )}

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-5 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition-all duration-300"
                  >
                    Selanjutnya
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={processing}
                    className="px-5 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {processing ? 'Memproses...' : isEditMode ? 'Simpan Perubahan' : 'Kirim Pendaftaran'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <Footer />
      </div>

      {/* Modal Sukses */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
              {isEditMode ? 'Pembaruan Berhasil!' : 'Pendaftaran Berhasil!'}
            </h3>
            <p className="text-center text-gray-700 mb-6">
              {isEditMode
                ? 'Data pendaftaran Anda berhasil diperbarui. Anda akan dialihkan ke halaman status dalam beberapa detik.'
                : 'Selamat! Pendaftaran Anda berhasil dikirim. Anda akan dialihkan ke halaman status pendaftaran dalam beberapa detik.'}
            </p>
          </div>
        </div>
      )}

      {/* Modal Error */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
              Pendaftaran Gagal
            </h3>
            <div
              className="text-center text-gray-700 mb-6"
              dangerouslySetInnerHTML={{ __html: errorMessage }}
            />
            <div className="flex justify-center">
              <button
                onClick={() => setShowErrorModal(false)}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-medium transition-all duration-300"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 