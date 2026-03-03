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
  brochure?: {
    file: string;
    title: string | null;
    description: string | null;
    extension: string;
  } | null;
}

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  description: string;
  icon: string;
}

interface InfoCardItem {
  id: number;
  title: string;
  icon: string;
  content: string;
  order: number;
  is_active: boolean;
  card_type: string;
}

interface PpdbIndexProps {
  hasRegistered?: boolean;
  ppdbSettings?: PpdbSettings | null;
  timelines?: TimelineItem[];
  infoCards?: InfoCardItem[];
}

export default function PpdbIndex({ hasRegistered = false, ppdbSettings, timelines = [], infoCards = [] }: PpdbIndexProps) {
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

  const getIcon = (iconName: string) => {
    const iconProps = { className: "h-6 w-6" };
    switch (iconName) {
      case 'file-text': return <FileText {...iconProps} />;
      case 'check-circle': return <CheckCircle {...iconProps} />;
      case 'calendar-check': return <CalendarCheck {...iconProps} />;
      case 'clock': return <Clock {...iconProps} />;
      case 'users': return <Users {...iconProps} />;
      case 'school': return <School {...iconProps} />;
      default: return <CheckCircle {...iconProps} />;
    }
  };

  const getIconForCard = (iconName: string) => {
    const iconProps = { className: "h-6 w-6" };
    switch (iconName) {
      case 'file-text': return <FileText {...iconProps} />;
      case 'school': return <School {...iconProps} />;
      case 'award': return <Medal {...iconProps} />;
      case 'book-open': return <BookOpen {...iconProps} />;
      case 'briefcase': return <Briefcase {...iconProps} />;
      default: return <FileText {...iconProps} />;
    }
  };

  return (
    <>
      <Head title="SPMB SMK IT Baitul Aziz" />

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
                      <h3 className="font-semibold text-red-800 mb-2">Pendaftaran SPMB Ditutup</h3>
                      <p className="text-red-700 text-sm">
                        {ppdbSettings?.messageClosed || 'Pendaftaran SPMB saat ini sedang ditutup. Silakan hubungi pihak sekolah untuk informasi lebih lanjut.'}
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
                    href="/spmb/status"
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition-all duration-300 w-full sm:w-auto text-center"
                  >
                    Cek Status Pendaftaran
                  </Link>
                ) : isOpen ? (
                  <Link
                    href="/spmb/pendaftaran"
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
                Informasi <span className="text-orange-500">SPMB</span>
              </h2>
              <p className="text-gray-600">
                Berikut adalah informasi penting terkait Penerimaan Peserta Didik Baru SMK IT Baitul Aziz tahun ajaran 2025/2026
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {infoCards.length > 0 ? (
                infoCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-orange-200 hover:shadow-md transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-all">
                      <div className="text-orange-500">{getIconForCard(card.icon)}</div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{card.title}</h3>
                    <div
                      className="text-gray-600 prose prose-sm max-w-none
                        [&>ul]:space-y-2 
                        [&>ul]:list-none
                        [&>ul>li]:flex
                        [&>ul>li]:items-start
                        [&>ul>li]:before:content-[''] 
                        [&>ul>li]:before:inline-block 
                        [&>ul>li]:before:w-1.5 
                        [&>ul>li]:before:h-1.5 
                        [&>ul>li]:before:rounded-full 
                        [&>ul>li]:before:bg-orange-500 
                        [&>ul>li]:before:mt-1.5 
                        [&>ul>li]:before:mr-2
                        [&>h4]:font-medium
                        [&>h4]:text-gray-800
                        [&>h4]:mb-2
                        [&>p]:text-gray-600
                        [&>hr]:border-gray-200
                        [&>hr]:my-4"
                      dangerouslySetInnerHTML={{ __html: card.content }}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-gray-500">
                  <p>Belum ada informasi yang ditambahkan.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Brochure Section */}
        {ppdbSettings?.brochure && (
          <section className="py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  {/* Image Preview for image files */}
                  {['jpg', 'jpeg', 'png'].includes(ppdbSettings.brochure.extension.toLowerCase()) && (
                    <div className="relative h-auto md:h-auto bg-gray-100 overflow-hidden">
                      <img
                        src={ppdbSettings.brochure.file}
                        alt={ppdbSettings.brochure.title || 'Brosur SPMB'}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-orange-600 text-white text-xs font-semibold rounded-full">
                        {ppdbSettings.brochure.extension.toUpperCase()}
                      </div>
                    </div>
                  )}

                  <div className="p-8 md:p-12">
                    <div className="flex items-center mb-6">
                      {/* Show icon only for PDF */}
                      {ppdbSettings.brochure.extension === 'pdf' && (
                        <div className="p-4 bg-orange-100 rounded-xl mr-4">
                          <svg className="w-10 h-10 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                          {ppdbSettings.brochure.title || 'Brosur SPMB'}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {ppdbSettings.brochure.extension === 'pdf' ? 'Dokumen PDF' : 'Gambar Brosur'}
                        </p>
                      </div>
                    </div>

                    {ppdbSettings.brochure.description && (
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {ppdbSettings.brochure.description}
                      </p>
                    )}

                    <div className="flex gap-4">
                      <a
                        href={ppdbSettings.brochure.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Lihat Brosur
                      </a>
                      <a
                        href={route('ppdb.brochure.download')}
                        className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/30"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Brosur
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Timeline Section */}
        <section ref={timelineRef} className="py-16 bg-white relative">
          <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-5 bg-repeat"></div>

          <div className="container mx-auto px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Jadwal <span className="text-orange-500">SPMB</span>
              </h2>
              <p className="text-gray-600">
                Berikut adalah jadwal penting terkait Penerimaan Peserta Didik Baru SMK IT Baitul Aziz tahun ajaran 2025/2026
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col space-y-10">
                <div className="flex flex-col space-y-10">
                  {timelines.length > 0 ? (
                    timelines.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="flex"
                      >
                        <div className="flex flex-col items-center mr-6">
                          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                            {getIcon(item.icon)}
                          </div>
                          {index !== timelines.length - 1 && (
                            <div className="w-0.5 bg-orange-200 flex-1 my-2"></div>
                          )}
                        </div>
                        <div className="pt-1.5">
                          <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.title}</h3>
                          <p className="text-orange-500 font-medium mb-2">{item.date}</p>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      <p>Jadwal belum tersedia saat ini.</p>
                    </div>
                  )}
                </div>
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
                Untuk informasi lebih lanjut tentang SPMB SMK IT Baitul Aziz
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
                    href="/spmb/status"
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition-all duration-300"
                  >
                    Cek Status Pendaftaran
                  </Link>
                ) : isOpen ? (
                  <Link
                    href="/spmb/pendaftaran"
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