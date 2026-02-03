import React, { useState, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImagePlaceholder from '@/components/ImagePlaceholder';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Extracurricular {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  image_url: string | null;
  schedule: string | null;
  coach: string | null;
  location: string | null;
  is_active: boolean;
  order: number;
  user_id: number | null;
  created_at: string;
  updated_at: string;
  user: User | null;
}

interface ExtracurricularProps {
  extracurriculars: Extracurricular[];
}

export default function Extracurricular({ extracurriculars = [] }: ExtracurricularProps) {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
  const [activeExtracurricular, setActiveExtracurricular] = useState<string | null>(null);
  
  // Jika tidak ada data, gunakan data statis
  const extracurricularItems = extracurriculars.length > 0 ? extracurriculars : [
    {
      id: 1,
      name: 'Futsal',
      slug: 'futsal',
      description: 'Ekstrakurikuler futsal SMK IT Baitul Aziz adalah kegiatan olahraga yang bertujuan untuk mengembangkan bakat dan minat siswa dalam bidang olahraga futsal. Kegiatan ini dilaksanakan secara rutin setiap minggu dengan pembimbing yang profesional dan berpengalaman.',
      image: '/images/ekstrakurikuler/futsal.jpg',
      image_url: null,
      schedule: 'Setiap Jumat, 15:00 - 17:00',
      coach: 'Coach Ahmad',
      location: 'Lapangan Futsal Sekolah',
      is_active: true,
      order: 1,
      user_id: 1,
      created_at: '2023-01-01 00:00:00',
      updated_at: '2023-01-01 00:00:00',
      user: null
    },
    {
      id: 2,
      name: 'Pencak Silat',
      slug: 'pencak-silat',
      description: 'Ekstrakurikuler pencak silat bertujuan untuk mengajarkan seni bela diri tradisional Indonesia. Siswa akan belajar teknik dasar pencak silat, filosofi, dan nilai-nilai yang terkandung dalam seni bela diri ini.',
      image: '/images/ekstrakurikuler/silat.jpg',
      image_url: null,
      schedule: 'Setiap Senin dan Rabu, 15:30 - 17:00',
      coach: 'Pelatih Rahmat',
      location: 'Aula Sekolah',
      is_active: true,
      order: 2,
      user_id: 1,
      created_at: '2023-01-01 00:00:00',
      updated_at: '2023-01-01 00:00:00',
      user: null
    },
    {
      id: 3,
      name: 'Pramuka',
      slug: 'pramuka',
      description: 'Pramuka adalah kegiatan ekstrakurikuler wajib yang mengajarkan kedisiplinan, kerjasama tim, dan kemandirian. Pramuka SMK IT Baitul Aziz telah menghasilkan banyak prestasi di tingkat kota dan provinsi.',
      image: '/images/ekstrakurikuler/pramuka.jpg',
      image_url: null,
      schedule: 'Setiap Sabtu, 08:00 - 11:00',
      coach: 'Kak Dimas',
      location: 'Lapangan Sekolah',
      is_active: true,
      order: 3,
      user_id: 1,
      created_at: '2023-01-01 00:00:00',
      updated_at: '2023-01-01 00:00:00',
      user: null
    },
    {
      id: 4,
      name: 'Paskibra',
      slug: 'paskibra',
      description: 'Pasukan Pengibar Bendera (Paskibra) SMK IT Baitul Aziz melatih siswa dalam baris-berbaris, kedisiplinan, dan kecintaan terhadap tanah air. Anggota Paskibra berkesempatan untuk bertugas dalam upacara-upacara penting.',
      image: '/images/ekstrakurikuler/paskibra.jpg',
      image_url: null,
      schedule: 'Setiap Selasa dan Kamis, 15:30 - 17:00',
      coach: 'Pembina Eko',
      location: 'Lapangan Sekolah',
      is_active: true,
      order: 4,
      user_id: 1,
      created_at: '2023-01-01 00:00:00',
      updated_at: '2023-01-01 00:00:00',
      user: null
    },
    {
      id: 5,
      name: 'Bola Voli',
      slug: 'bola-voli',
      description: 'Ekstrakurikuler bola voli bertujuan untuk mengembangkan keterampilan siswa dalam olahraga bola voli. Tim voli sekolah juga sering berpartisipasi dalam turnamen antar sekolah di kota.',
      image: '/images/ekstrakurikuler/voli.jpg',
      image_url: null,
      schedule: 'Setiap Selasa dan Jumat, 15:00 - 17:00',
      coach: 'Coach Budi',
      location: 'Lapangan Voli Sekolah',
      is_active: true,
      order: 5,
      user_id: 1,
      created_at: '2023-01-01 00:00:00',
      updated_at: '2023-01-01 00:00:00',
      user: null
    },
    {
      id: 6,
      name: 'Panahan',
      slug: 'panahan',
      description: 'Ekstrakurikuler panahan mengajarkan teknik dan keterampilan memanah yang baik dan benar. Selain sebagai olahraga, panahan juga mengajarkan konsentrasi, fokus, dan kesabaran.',
      image: '/images/ekstrakurikuler/panahan.jpg',
      image_url: null,
      schedule: 'Setiap Rabu, 15:00 - 17:00',
      coach: 'Pelatih Farhan',
      location: 'Lapangan Panahan',
      is_active: true,
      order: 6,
      user_id: 1,
      created_at: '2023-01-01 00:00:00',
      updated_at: '2023-01-01 00:00:00',
      user: null
    },
    {
      id: 7,
      name: 'Bola Basket',
      slug: 'bola-basket',
      description: 'Ekstrakurikuler bola basket memberikan kesempatan bagi siswa untuk mengembangkan keterampilan dalam olahraga basket. Tim basket sekolah rutin mengikuti turnamen antar sekolah.',
      image: '/images/ekstrakurikuler/basket.jpg',
      image_url: null,
      schedule: 'Setiap Senin dan Kamis, 15:00 - 17:00',
      coach: 'Coach Andre',
      location: 'Lapangan Basket Sekolah',
      is_active: true,
      order: 7,
      user_id: 1,
      created_at: '2023-01-01 00:00:00',
      updated_at: '2023-01-01 00:00:00',
      user: null
    }
  ];

  // Set ekstrakurikuler pertama sebagai aktif secara default jika belum ada yang dipilih
  React.useEffect(() => {
    if (extracurricularItems.length > 0 && !activeExtracurricular) {
      setActiveExtracurricular(extracurricularItems[0].slug);
    }
  }, [extracurricularItems, activeExtracurricular]);

  // Dapatkan ekstrakurikuler yang aktif saat ini
  const currentExtracurricular = extracurricularItems.find(item => item.slug === activeExtracurricular) || extracurricularItems[0];

  return (
    <>
      <Head title="Ekstrakurikuler - SMK IT Baitul Aziz" />
      
      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />
        
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-24 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
          <div className="absolute inset-0 bg-[url('/images/pattern-tech.svg')] opacity-10 bg-repeat"></div>
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-orange-500/10 blur-[100px] rounded-full"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-block px-5 py-1.5 mb-6 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/10 text-orange-600 text-sm font-medium border border-orange-500/20">
                Pengembangan Bakat
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                Kegiatan <span className="text-orange-600">Ekstrakurikuler</span>
              </h1>
              
              <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
                Kembangkan potensi dan bakat siswa melalui berbagai kegiatan ekstrakurikuler yang tersedia di SMK IT Baitul Aziz
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Ekstrakurikuler Dropdown & Content */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            {/* Dropdown Ekstrakurikuler */}
            <div className="max-w-6xl mx-auto mb-12">
              <div className="flex flex-wrap items-center justify-center gap-3">
                {extracurricularItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveExtracurricular(item.slug)}
                    className={`px-5 py-3 rounded-lg transition-all duration-300 ${
                      activeExtracurricular === item.slug
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Detail Ekstrakurikuler */}
            {currentExtracurricular && (
              <motion.div
                key={currentExtracurricular.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto"
              >
                <div className="bg-gray-50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 shadow-md">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="relative h-[300px] lg:h-auto overflow-hidden">
                      {currentExtracurricular.image ? (
                        <img
                          src={currentExtracurricular.image_url || ''}
                          alt={currentExtracurricular.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const nextElement = target.nextElementSibling as HTMLElement;
                            if (nextElement) {
                              nextElement.style.display = 'flex';
                            }
                          }}
                        />
                      ) : null}
                      <ImagePlaceholder 
                        width="100%" 
                        height="100%" 
                        text={currentExtracurricular.name}
                        className={currentExtracurricular.image ? 'hidden' : ''} 
                      />
                    </div>
                    
                    <div className="p-8 flex flex-col">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">{currentExtracurricular.name}</h2>
                      
                      <p className="text-gray-600 mb-8">
                        {currentExtracurricular.description && currentExtracurricular.description.length > 250
                          ? currentExtracurricular.description.slice(0, 250) + '...'
                          : currentExtracurricular.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-auto">
                        {currentExtracurricular.schedule && (
                          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                            <h4 className="text-orange-600 font-semibold mb-2">Jadwal</h4>
                            <p className="text-gray-700">{currentExtracurricular.schedule}</p>
                          </div>
                        )}
                        
                        {currentExtracurricular.coach && (
                          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                            <h4 className="text-orange-600 font-semibold mb-2">Pembina</h4>
                            <p className="text-gray-700">{currentExtracurricular.coach}</p>
                          </div>
                        )}
                        
                        {currentExtracurricular.location && (
                          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                            <h4 className="text-orange-600 font-semibold mb-2">Lokasi</h4>
                            <p className="text-gray-700">{currentExtracurricular.location}</p>
                          </div>
                        )}
                      </div>
                      
                      <Link 
                        href={`/ekstrakurikuler/${currentExtracurricular.slug}`}
                        className="mt-8 w-fit inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors"
                      >
                        <span>Lihat detail lengkap</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
        
        {/* Keunggulan Ekstrakurikuler */}
        <section className="py-16 bg-gray-50 relative">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5 bg-repeat"></div>
          
          <div className="container mx-auto px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Mengapa mengikuti <span className="text-orange-600">Ekstrakurikuler?</span>
              </h2>
              <p className="text-gray-600">
                Kegiatan ekstrakurikuler tidak hanya mengembangkan bakat dan minat, tetapi juga memberikan manfaat lain yang berpengaruh pada perkembangan siswa
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-orange-200">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Mengembangkan Bakat</h3>
                <p className="text-gray-600">
                  Menyediakan wadah untuk mengekspresikan dan mengembangkan bakat dan minat siswa dalam berbagai bidang
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-orange-200">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Membangun Karakter</h3>
                <p className="text-gray-600">
                  Mengajarkan nilai-nilai seperti kerja sama tim, kedisiplinan, tanggung jawab, dan kepemimpinan
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-orange-200">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Meningkatkan Kesehatan</h3>
                <p className="text-gray-600">
                  Kegiatan olahraga dan fisik membantu menjaga kesehatan tubuh dan pikiran serta mengurangi stres
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-orange-200">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Mengasah Soft Skills</h3>
                <p className="text-gray-600">
                  Mengembangkan kemampuan komunikasi, pemecahan masalah, dan keterampilan sosial yang penting untuk masa depan
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-orange-50 to-orange-100 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-orange-200 relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-orange-200 blur-[100px] rounded-full"></div>
              
              <div className="relative z-10 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Siap Mengembangkan Potensimu?</h2>
                <p className="text-gray-700 max-w-2xl mx-auto mb-8">
                  Gabung dalam kegiatan ekstrakurikuler SMK IT Baitul Aziz dan temukan potensi terpendam dalam dirimu. Konsultasikan dengan wali kelas atau pembina ekstrakurikuler untuk bergabung.
                </p>
                
                <Link
                  href="/kontak"
                  className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300"
                >
                  <span>Hubungi Kami</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
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