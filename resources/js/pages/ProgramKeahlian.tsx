import React, { useRef } from 'react';
import { Head } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProgramKeahlian: React.FC = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
  const overviewRef = useRef(null);
  const isOverviewInView = useInView(overviewRef, { once: false, amount: 0.3 });
  
  const kurikulumRef = useRef(null);
  const isKurikulumInView = useInView(kurikulumRef, { once: false, amount: 0.3 });
  
  const fasilitasRef = useRef(null);
  const isFasilitasInView = useInView(fasilitasRef, { once: false, amount: 0.3 });
  
  const prospekRef = useRef(null);
  const isProspekInView = useInView(prospekRef, { once: false, amount: 0.3 });
  
  // Data mata pelajaran
  const mataPelajaran = [
    {
      kategori: 'Mata Pelajaran Umum',
      items: [
        'Pendidikan Agama Islam',
        'Pendidikan Pancasila',
        'Bahasa Indonesia',
        'Matematika',
        'Bahasa Inggris',
        'Pendidikan Jasmani'
      ]
    },
    {
      kategori: 'Mata Pelajaran Kejuruan Dasar',
      items: [
        'Informatika',
        'Sistem Komputer',
        'Basis Data',
        'Pemrograman Dasar',
        'Desain Grafis'
      ]
    },
    {
      kategori: 'Mata Pelajaran Kejuruan PPLG',
      items: [
        'Pemrograman Berorientasi Objek',
        'Pemrograman Web',
        'Pemrograman Mobile',
        'Basis Data Lanjut',
        'UI/UX Design',
        'Pengembangan Game',
        'Project Management'
      ]
    }
  ];
  
  // Data fasilitas
  const fasilitas = [
    {
      id: 1,
      name: 'Lab Komputer Modern',
      description: 'Dilengkapi dengan komputer spesifikasi tinggi dan software terbaru untuk mendukung pembelajaran pemrograman dan desain.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 2,
      name: 'Software Development Studio',
      description: 'Ruang khusus dengan lingkungan yang kondusif untuk pengembangan perangkat lunak dan kolaborasi tim.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      id: 3,
      name: 'Perangkat Mobile Testing',
      description: 'Koleksi berbagai perangkat mobile untuk pengujian aplikasi lintas platform dan ukuran layar.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 4,
      name: 'Ruang Design Thinking',
      description: 'Area khusus untuk brainstorming, prototyping, dan presentasi proyek dengan peralatan interaktif.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    }
  ];
  
  // Data prospek karir
  const prospekKarir = [
    {
      title: 'Software Developer',
      description: 'Mengembangkan aplikasi dan sistem software dengan berbagai bahasa pemrograman.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: 'Mobile App Developer',
      description: 'Membuat aplikasi untuk perangkat mobile berbasis Android, iOS, atau lintas platform.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Web Developer',
      description: 'Mengembangkan aplikasi web dengan teknologi terkini seperti React, Vue, atau Angular.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
    },
    {
      title: 'Game Developer',
      description: 'Merancang dan mengembangkan game untuk berbagai platform dengan game engine seperti Unity.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      ),
    },
    {
      title: 'UI/UX Designer',
      description: 'Merancang antarmuka dan pengalaman pengguna untuk aplikasi web dan mobile.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
    },
    {
      title: 'QA Engineer',
      description: 'Melakukan pengujian dan quality assurance pada software untuk memastikan kualitas produk.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <Head title="Program Keahlian - SMK IT Baitul Aziz" />
      
      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />
        
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
          <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-10 bg-repeat"></div>
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-orange-500/10 blur-[100px] rounded-full"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-block px-5 py-1.5 mb-6 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-600 text-sm font-medium border border-orange-500/20">
                Program Keahlian Unggulan
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                Pengembangan Perangkat Lunak dan <span className="text-orange-500">Gim</span>
              </h1>
              
              <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
                Membentuk talenta digital yang handal dalam bidang pemrograman, pengembangan aplikasi, dan perancangan game
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <a 
                  href="#overview" 
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 flex items-center"
                >
                  <span>Pelajari Lebih Lanjut</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href="/pendaftaran" 
                  className="px-6 py-3 bg-gray-100 text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-200 transition-all duration-300"
                >
                  Daftar Sekarang
                </a>
              </div>
              
              {/* Tech Icons */}
              <div className="flex flex-wrap justify-center gap-8 opacity-70">
                {['html5', 'css3', 'js', 'react', 'node', 'php', 'android', 'unity'].map((tech, index) => (
                  <div 
                    key={index}
                    className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300"
                  >
                    <img 
                      src={`/assets/images/tech/${tech}.svg`} 
                      alt={tech} 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Overview Section */}
        <section ref={overviewRef} id="overview" className="py-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gray-50"></div>
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5 bg-repeat"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isOverviewInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Tentang Program <span className="text-orange-500">PPLG</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mb-8"></div>
                
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>
                    Program keahlian Pengembangan Perangkat Lunak dan Gim (PPLG) merupakan program unggulan di SMK IT Baitul Aziz yang membekali siswa dengan keterampilan dan pengetahuan di bidang pemrograman, pengembangan aplikasi, desain web, dan pengembangan game.
                  </p>
                  <p>
                    Kurikulum program PPLG dirancang dengan memadukan teori dan praktik yang sesuai dengan kebutuhan industri terkini. Siswa akan belajar dari dasar pemrograman hingga pengembangan aplikasi kompleks dan game interaktif.
                  </p>
                  <p>
                    Selama pendidikan, siswa akan mengembangkan portofolio proyek nyata dan mengikuti program magang di perusahaan teknologi, sehingga mereka siap bersaing di dunia kerja setelah lulus.
                  </p>
                </div>
                
                <div className="mt-10 flex flex-wrap gap-4">
                  {[
                    { label: 'Pemrograman', icon: 'code' },
                    { label: 'Web Development', icon: 'globe' },
                    { label: 'Mobile Apps', icon: 'smartphone' },
                    { label: 'Game Development', icon: 'gamepad' },
                    { label: 'UI/UX Design', icon: 'layout' },
                  ].map((skill, index) => (
                    <div key={index} className="px-4 py-2 bg-orange-50 border border-orange-100 rounded-lg flex items-center">
                      <span className="text-orange-600">{skill.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isOverviewInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-xl blur-xl -z-10 transform scale-95"></div>
                <div className="border border-orange-100 rounded-xl overflow-hidden">
                  <div className="aspect-video bg-orange-50 rounded-xl overflow-hidden relative">
                    {/* Fallback untuk gambar */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-purple-500/30 flex items-center justify-center">
                      <span className="text-white/70">Siswa PPLG sedang mengerjakan proyek</span>
                    </div>
                    <img 
                      src="/assets/images/background.jpg" 
                      alt="Siswa PPLG SMK IT Baitul Aziz" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
                {/* Tech decorative elements */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/40 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/40 rounded-bl-lg"></div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Kurikulum Section */}
        <section ref={kurikulumRef} id="kurikulum" className="py-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50"></div>
          <div className="absolute inset-0 bg-[url('/images/tech-pattern.svg')] opacity-5 bg-repeat"></div>
          <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-orange-500/10 blur-[100px] rounded-full"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isKurikulumInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Kurikulum <span className="text-orange-500">Pembelajaran</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Kurikulum yang dirancang sesuai kebutuhan industri dengan fokus pada praktik dan penguasaan teknologi terkini
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mataPelajaran.map((kategori, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isKurikulumInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white shadow-md border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-orange-500 mb-6">{kategori.kategori}</h3>
                  <ul className="space-y-3">
                    {kategori.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isKurikulumInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 bg-orange-50 p-6 rounded-xl border border-orange-100"
            >
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500 mr-2 flex-shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-gray-900 font-medium mb-2">Program Pengayaan</h4>
                  <p className="text-gray-600">
                    Selain mata pelajaran di atas, siswa PPLG juga akan mendapatkan program pengayaan berupa sertifikasi internasional, workshop dengan praktisi industri, dan proyek kolaboratif dengan perusahaan teknologi.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Kurikulum Merdeka */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isKurikulumInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-12 bg-white shadow-md p-6 rounded-xl border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Implementasi <span className="text-orange-500">Kurikulum Merdeka</span></h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-medium mb-1">Pembelajaran Berbasis Proyek</h4>
                      <p className="text-gray-600 text-sm">
                        Siswa mengembangkan keterampilan melalui proyek nyata yang menggabungkan beberapa mata pelajaran sekaligus, meningkatkan pemahaman kontekstual.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-medium mb-1">Kolaborasi dan Teamwork</h4>
                      <p className="text-gray-600 text-sm">
                        Penerapan pola kerja tim dalam pengembangan perangkat lunak seperti Agile dan Scrum yang umum digunakan di industri.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-medium mb-1">Personalisasi Pembelajaran</h4>
                      <p className="text-gray-600 text-sm">
                        Siswa memiliki kebebasan memilih jalur spesialisasi sesuai minat dalam bidang PPLG seperti front-end, back-end, mobile, atau game development.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-medium mb-1">Magang Industri</h4>
                      <p className="text-gray-600 text-sm">
                        Program magang yang terintegrasi dengan kurikulum, di mana siswa mendapatkan pengalaman kerja nyata di perusahaan teknologi.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-medium mb-1">Kurikulum Adaptif</h4>
                      <p className="text-gray-600 text-sm">
                        Konten pembelajaran yang diperbarui setiap tahun untuk mengikuti perkembangan teknologi terbaru di industri.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-medium mb-1">Pendekatan Problem-Based Learning</h4>
                      <p className="text-gray-600 text-sm">
                        Siswa menghadapi masalah dunia nyata yang memerlukan solusi teknologi, mengembangkan keterampilan pemecahan masalah.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
                <p className="text-gray-700">
                  SMK IT Baitul Aziz telah menerapkan <strong>Kurikulum Merdeka</strong> sejak 2022 dengan menekankan pada kebebasan belajar, fleksibilitas, 
                  pembelajaran kontekstual, dan kolaborasi dengan dunia industri untuk memastikan lulusan program PPLG memiliki keterampilan yang relevan dengan kebutuhan pasar kerja terkini.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Fasilitas Section */}
        <section ref={fasilitasRef} id="fasilitas" className="py-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gray-50"></div>
          <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-5 bg-repeat"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFasilitasInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Fasilitas <span className="text-orange-500">Penunjang</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Fasilitas modern untuk mendukung proses pembelajaran dan pengembangan keterampilan siswa jurusan PPLG
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {fasilitas.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFasilitasInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
                  className="bg-white shadow-md border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
            
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFasilitasInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 p-6 rounded-xl bg-orange-50 border border-orange-100"
            >
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Akses ke Resources Premium</h4>
              <p className="text-gray-600 mb-4">
                Siswa PPLG mendapatkan akses ke berbagai resources premium seperti:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Udemy Courses', 'GitHub Student', 'JetBrains IDEs', 'Adobe Creative Cloud'].map((resource, index) => (
                  <div key={index} className="bg-black/30 p-3 rounded-lg text-center">
                    <span className="text-white text-sm">{resource}</span>
                  </div>
                ))}
              </div>
            </motion.div> */}
          </div>
        </section>
        
        {/* Prospek Karir Section */}
        <section ref={prospekRef} id="prospek-karir" className="py-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-white to-orange-50"></div>
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5 bg-repeat"></div>
          <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-orange-500/10 blur-[100px] rounded-full"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isProspekInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Prospek <span className="text-orange-500">Karir</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Berbagai peluang karir menarik yang dapat diikuti oleh lulusan PPLG di bidang teknologi informasi
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isProspekInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {prospekKarir.map((karir, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isProspekInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
                  className="bg-white shadow-md border border-orange-100 rounded-xl p-6 hover:shadow-lg hover:bg-orange-50 transition-all duration-300"
                >
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    {karir.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{karir.title}</h3>
                  <p className="text-gray-600">{karir.description}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isProspekInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16 text-center"
            >
              <div className="bg-orange-50 shadow-md border border-orange-100 rounded-xl p-8 max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Tingkat Keterserapan Lulusan</h3>
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full border-8 border-orange-500 flex items-center justify-center text-2xl font-bold text-gray-900">
                    98%
                  </div>
                </div>
                <p className="text-gray-600">
                  Hampir seluruh lulusan PPLG SMK IT Baitul Aziz berhasil terserap oleh industri atau melanjutkan ke perguruan tinggi ternama berkat kurikulum yang adaptif dan program magang yang komprehensif.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-white to-orange-50"></div>
          <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-5 bg-repeat"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Siap Menjadi Talenta <span className="text-orange-500">Digital</span> Masa Depan?
              </h2>
              <p className="text-gray-600 mb-10 text-lg">
                Bergabunglah dengan program keahlian PPLG di SMK IT Baitul Aziz dan kembangkan potensimu untuk karir di industri teknologi.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="/pendaftaran" 
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 flex items-center group"
                >
                  <span>Daftar Sekarang</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
                <a 
                  href="/hubungi-kami" 
                  className="px-8 py-3 bg-white border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-all duration-300"
                >
                  Informasi Lebih Lanjut
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ProgramKeahlian; 