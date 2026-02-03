import React, { useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, Clock, CalendarCheck, CheckCircle, Users, School, Medal, BookOpen, Briefcase, XCircle } from 'lucide-react';

interface PpdbSettings {
  isOpen: boolean;
  openDate: string | null;
  closeDate: string | null;
  academicYear: string | null;
  messageClosed: string | null;
}

interface PpdbIndexProps {
  hasRegistered?: boolean;
  ppdbSettings?: PpdbSettings | null;
}

export default function PpdbIndex({ hasRegistered = false, ppdbSettings }: PpdbIndexProps) {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const infoRef = useRef(null);
  const isInfoInView = useInView(infoRef, { once: true, amount: 0.3 });

  const timelineRef = useRef(null);
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.3 });

  const isOpen = ppdbSettings?.isOpen ?? false;

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const timeline = [
    {
      title: 'Pendaftaran Tahap 1',
      date: 'Februari - April 2025',
      description: 'Pendaftaran dapat dilakukan secara online melalui website resmi SMK IT Baitul Aziz',
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: 'Pendaftaran Tahap 2',
      date: 'Mei - Juli 2025',
      description: 'Pendaftaran tahap kedua untuk calon peserta didik baru SMK IT Baitul Aziz',
      icon: <CheckCircle className="h-6 w-6" />
    },
    {
      title: 'Pengumuman Hasil',
      date: '10 Juni 2025',
      description: 'Pengumuman hasil seleksi PPDB melalui website dan Whatsapp',
      icon: <CalendarCheck className="h-6 w-6" />
    },
    {
      title: 'Daftar Ulang',
      date: 'Juni - Juli 2025',
      description: 'Proses daftar ulang bagi calon peserta didik yang diterima',
      icon: <Clock className="h-6 w-6" />
    }
  ];

  return (
    <>
      <Head title="PPDB SMK IT Baitul Aziz" />

      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />

        {/* Hero Section */}
        <section ref={heroRef} className="relative py-28 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
          <div className="absolute inset-0 bg-[url('/images/pattern-tech.svg')] opacity-10 bg-repeat"></div>
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-orange-100 blur-[100px] rounded-full"></div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className={`inline-block px-5 py-1.5 mb-6 rounded-full text-sm font-medium border ${isOpen
                ? 'bg-green-100 text-green-600 border-green-200'
                : 'bg-red-100 text-red-600 border-red-200'
                }`}>
                {isOpen ? `Pendaftaran Dibuka - Tahun Ajaran ${ppdbSettings?.academicYear || '2025/2026'}` : 'Pendaftaran Ditutup'}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                Sistem Penerimaan Murid <span className="text-orange-500">Baru</span>
              </h1>

              <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
                SMK Islam Terpadu Baitul Aziz membuka pendaftaran siswa baru untuk tahun ajaran {ppdbSettings?.academicYear || '2025/2026'}. Bergabunglah dengan kami dan jadilah generasi unggul dan berakhlakul karimah.
              </p>

              {/* PPDB Closed Message */}
              {!isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-8 p-6 bg-red-50 border border-red-200 rounded-xl max-w-2xl mx-auto"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-100 rounded-full">
                      <XCircle className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-red-800 mb-2">Pendaftaran PPDB Ditutup</h3>
                      <p className="text-red-700 text-sm">
                        {ppdbSettings?.messageClosed || 'Pendaftaran PPDB saat ini sedang ditutup. Silakan hubungi pihak sekolah untuk informasi lebih lanjut.'}
                      </p>
                      {(ppdbSettings?.openDate || ppdbSettings?.closeDate) && (
                        <div className="mt-3 text-xs text-red-600">
                          {ppdbSettings?.openDate && <span>Pembukaan: {formatDate(ppdbSettings.openDate)}</span>}
                          {ppdbSettings?.openDate && ppdbSettings?.closeDate && <span className="mx-2">•</span>}
                          {ppdbSettings?.closeDate && <span>Penutupan: {formatDate(ppdbSettings.closeDate)}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {hasRegistered ? (
                  <Link
                    href="/ppdb/status"
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition-all duration-300 w-full sm:w-auto text-center"
                  >
                    Cek Status Pendaftaran
                  </Link>
                ) : isOpen ? (
                  <Link
                    href="/ppdb/pendaftaran"
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition-all duration-300 w-full sm:w-auto text-center"
                  >
                    Daftar Sekarang
                  </Link>
                ) : (
                  <button
                    disabled
                    className="px-6 py-3 bg-gray-300 rounded-lg text-gray-500 font-medium cursor-not-allowed w-full sm:w-auto text-center"
                  >
                    Pendaftaran Ditutup
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Info Section */}
        <section ref={infoRef} className="py-16 bg-gray-50 relative">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5 bg-repeat"></div>

          <div className="container mx-auto px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Informasi <span className="text-orange-500">PPDB</span>
              </h2>
              <p className="text-gray-600">
                Berikut adalah informasi penting terkait Penerimaan Peserta Didik Baru SMK IT Baitul Aziz tahun ajaran 2025/2026
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-orange-200 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-all">
                  <FileText className="text-orange-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Persyaratan Pendaftaran</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>FC akta kelahiran</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>FC kartu keluarga</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>Pas foto anak</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>Surat Keterangan Lulus</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>FC KTP Orang Tua</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>FC KIP (Jika Ada)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>FC Rapor (Jika sudah ada)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>FC Ijazah SMP (Jika sudah ada)</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-orange-200 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-all">
                  <School className="text-orange-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Program Keahlian</h3>
                <div className="text-gray-600 space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-800">Program Keahlian</h4>
                    <p className="text-gray-600">Pengembangan Perangkat Lunak dan Gim</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800">Konsentrasi Keahlian (Kelas 11)</h4>
                    <ul className="space-y-1 mt-1">
                      <li className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                        <span>Rekayasa Perangkat Lunak</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                        <span>Pemrograman Gim (Baru)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-2">Prestasi Tingkat Kabupaten</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                      <span>2024 - Juara 1 LKS Bidang Web Technologies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                      <span>2023 - Juara 2 LKS Bidang Web Technologies</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-orange-200 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-all">
                  <Medal className="text-orange-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Keunggulan SMK IT Baitul Aziz</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>Beasiswa KIP, prestasi, yatim, kurang mampu</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>Berpeluang bisa bekerja</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>Alumni tersebar kuliah di kampus UIN, UPI, Unisa Univ.Muhammadiyah, STMIK IM, Univ.Wanita International</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>Bisa lanjut kuliah KIP</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>Program Tahfidz Qur'an</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>Pembelajaran berbasis industri</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>Pendidikan berkarakter</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>Magang di perusahaan 3-4 bulan</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section ref={timelineRef} className="py-16 bg-white relative">
          <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-5 bg-repeat"></div>

          <div className="container mx-auto px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Jadwal <span className="text-orange-500">PPDB</span>
              </h2>
              <p className="text-gray-600">
                Berikut adalah jadwal penting terkait Penerimaan Peserta Didik Baru SMK IT Baitul Aziz tahun ajaran 2025/2026
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col space-y-10">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="flex"
                  >
                    <div className="flex flex-col items-center mr-6">
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                        {item.icon}
                      </div>
                      {index !== timeline.length - 1 && (
                        <div className="w-0.5 bg-orange-200 flex-1 my-2"></div>
                      )}
                    </div>
                    <div className="pt-1.5">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-orange-500 font-medium mb-2">{item.date}</p>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-50 relative">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5 bg-repeat"></div>

          <div className="container mx-auto px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Hubungi <span className="text-orange-500">Kami</span>
              </h2>
              <p className="text-gray-600">
                Untuk informasi lebih lanjut tentang PPDB SMK IT Baitul Aziz
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-orange-200 hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Kontak</h3>
                <ul className="text-gray-600 space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>085721493526 (Qony)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>081224027615 (Nuri)</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-orange-200 hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Media Sosial</h3>
                <ul className="text-gray-600 space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>Website: <a href="https://www.smkitbaitulaziz.sch.id" className="text-orange-400 hover:text-orange-300 transition-colors" target="_blank" rel="noopener noreferrer">www.smkitbaitulaziz.sch.id</a></span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2"></span>
                    <span>Instagram: baitulaziz.id</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-orange-200 hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Alamat</h3>
                <p className="text-gray-600">
                  Pesantren Baitul Aziz No.44, Kp.Sukahaji RT/RW 1/8 Desa Neglasari Kec.Majalaya
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-orange-50 relative">
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-orange-100 p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Siap Menjadi Bagian dari Keluarga Besar SMK IT Baitul Aziz?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Jangan lewatkan kesempatan untuk bergabung dengan SMK IT Baitul Aziz. Daftarkan diri Anda sekarang dan jadilah bagian dari generasi unggul yang siap bersaing di era digital.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {hasRegistered ? (
                  <Link
                    href="/ppdb/status"
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition-all duration-300"
                  >
                    Cek Status Pendaftaran
                  </Link>
                ) : isOpen ? (
                  <Link
                    href="/ppdb/pendaftaran"
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition-all duration-300"
                  >
                    Daftar Sekarang
                  </Link>
                ) : (
                  <button
                    disabled
                    className="px-6 py-3 bg-gray-300 rounded-lg text-gray-500 font-medium cursor-not-allowed"
                  >
                    Pendaftaran Ditutup
                  </button>
                )}
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-700 font-medium transition-all duration-300"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
} 