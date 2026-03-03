import React, { useRef } from 'react';
import { Head } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProfileSekolah: React.FC = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
  const sejarahRef = useRef(null);
  const isSejarahInView = useInView(sejarahRef, { once: false, amount: 0.3 });
  
  const visiMisiRef = useRef(null);
  const isVisiMisiInView = useInView(visiMisiRef, { once: false, amount: 0.3 });
  
  const strukturRef = useRef(null);
  const isStrukturInView = useInView(strukturRef, { once: false, amount: 0.3 });
  
  const fasilitasRef = useRef(null);
  const isFasilitasInView = useInView(fasilitasRef, { once: false, amount: 0.3 });
  
  // Data fasilitas
  const fasilitas = [
    {
      id: 1,
      name: 'Laboratorium Komputer',
      description: 'Dilengkapi dengan 30 unit komputer terbaru dengan spesifikasi tinggi untuk mendukung pembelajaran pemrograman dan desain.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 2,
      name: 'Ruang Kelas Modern',
      description: 'Ruang kelas dilengkapi dengan AC, proyektor, dan koneksi internet cepat untuk menciptakan lingkungan belajar yang nyaman.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 8l-7 5-7-5m14 6h2a2 2 0 012 2v1a2 2 0 01-2 2h-2v-5z" />
        </svg>
      ),
    },
    // {
    //   id: 3,
    //   name: 'Studio Multimedia',
    //   description: 'Studio yang dilengkapi dengan peralatan audio visual profesional untuk mendukung pembelajaran multimedia dan konten digital.',
    //   icon: (
    //     <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    //     </svg>
    //   ),
    // },
    {
      id: 4,
      name: 'Perpustakaan Digital',
      description: 'Koleksi buku fisik dan digital yang komprehensif, dilengkapi dengan area belajar yang nyaman.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      id: 5,
      name: 'Jaringan Internet Cepat',
      description: 'Koneksi fiber optik berkecepatan tinggi yang mencakup seluruh area sekolah untuk mendukung pembelajaran berbasis teknologi.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      ),
    },
    {
      id: 6,
      name: 'Masjid',
      description: 'Tempat ibadah yang nyaman dengan kapasitas yang memadai untuk kegiatan spiritual dan pendidikan agama.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <Head title="Profil Sekolah - SMK IT Baitul Aziz" />
      
      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />
        
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-white to-orange-50"></div>
          <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-10 bg-repeat"></div>
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-orange-100 blur-[100px] rounded-full"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Profil <span className="text-orange-500">Sekolah</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Mengenal lebih dekat SMK IT Baitul Aziz, sekolah menengah kejuruan berbasis teknologi informasi yang unggul.
              </p>
            </motion.div>
            
            {/* Quick Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mt-12"
            >
              {['Sejarah', 'Visi & Misi', 'Struktur Organisasi', 'Fasilitas'].map((item, index) => (
                <a 
                  key={index}
                  href={`#${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className="px-5 py-3 bg-orange-50/80 backdrop-blur-sm border border-orange-200 rounded-lg hover:bg-orange-100 transition-all duration-300 text-orange-700"
                >
                  {item}
                </a>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Sejarah Section */}
        <section ref={sejarahRef} id="sejarah" className="py-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-white/90"></div>
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5 bg-repeat"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isSejarahInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Sejarah <span className="text-orange-500">Pendirian</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mb-8"></div>
                
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    SMK IT Baitul Aziz didirikan pada tahun 2017 oleh Yayasan Pendidikan Islam Baitul Aziz dengan visi menyediakan pendidikan kejuruan berbasis teknologi informasi yang berkualitas dan terjangkau bagi masyarakat.
                  </p>
                  <p>
                    Berawal dari sebuah gedung sederhana dengan 3 ruang kelas dan laboratorium komputer terbatas, sekolah kami telah berkembang menjadi institusi pendidikan yang dilengkapi dengan fasilitas modern dan tim pengajar profesional.
                  </p>
                  <p>
                    Komitmen kami pada nilai-nilai keislaman dan keunggulan di bidang teknologi informasi telah menghasilkan lulusan berkualitas yang mampu bersaing di dunia kerja dan pendidikan tinggi. Setiap tahun, SMK IT Baitul Aziz terus meningkatkan kualitas pendidikan dan fasilitas untuk memberikan pengalaman belajar terbaik bagi siswa.
                  </p>
                </div>
                
                {/* <div className="mt-10 pt-10 border-t border-orange-100">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <p className="text-3xl font-bold text-orange-500">5+</p>
                      <p className="text-gray-500">Tahun Pengalaman</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-orange-500">500+</p>
                      <p className="text-gray-500">Alumni Sukses</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-orange-500">25+</p>
                      <p className="text-gray-500">Tenaga Pengajar</p>
                    </div>
                  </div>
                </div> */}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isSejarahInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-100/60 to-orange-200/60 rounded-xl blur-xl -z-10 transform scale-95"></div>
                <div className="border border-orange-100 rounded-xl overflow-hidden">
                  <div className="aspect-video bg-orange-50 rounded-xl overflow-hidden relative">
                    {/* Fallback untuk gambar */}
                    <div className="absolute inset-0 bg-gradient-to-br flex items-center justify-center">
                      {/* <span className="text-orange-400">Foto Sekolah</span> */}
                    </div>
                    <img 
                      src="/assets/images/background.jpg" 
                      alt="Sejarah SMK IT Baitul Aziz" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
                {/* Tech decorative elements */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-200 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-200 rounded-bl-lg"></div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Visi & Misi Section */}
        <section ref={visiMisiRef} id="visi---misi" className="py-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-white to-orange-50"></div>
          <div className="absolute inset-0 bg-[url('/images/tech-pattern.svg')] opacity-5 bg-repeat"></div>
          <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-orange-100 blur-[100px] rounded-full"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisiMisiInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Visi & <span className="text-orange-500">Misi</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Landasan dan arah pengembangan SMK IT Baitul Aziz dalam memajukan pendidikan kejuruan berbasis teknologi
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Visi */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isVisiMisiInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-orange-50/80 shadow-sm backdrop-blur-sm border border-orange-100 rounded-xl p-8 hover:bg-orange-100 transition-all duration-300"
              >
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Visi</h3>
                <div className="text-gray-700 space-y-4">
                  <p className="text-lg italic">
                    "Menjadi lembaga pendidikan kejuruan teknologi informasi terdepan yang menghasilkan lulusan beriman, berakhlak mulia, terampil, dan mampu bersaing di era digital global."
                  </p>
                </div>
              </motion.div>
              
              {/* Misi */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isVisiMisiInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-orange-50/80 shadow-sm backdrop-blur-sm border border-orange-100 rounded-xl p-8 hover:bg-orange-100 transition-all duration-300"
              >
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Misi</h3>
                <div className="text-gray-700 space-y-3">
                  <p>
                    1. Menyelenggarakan pendidikan berbasis teknologi informasi yang terintegrasi dengan nilai-nilai Islam.
                  </p>
                  <p>
                    2. Membentuk karakter siswa yang berakhlak mulia, disiplin, dan bertanggung jawab.
                  </p>
                  <p>
                    3. Mengembangkan kurikulum pembelajaran yang adaptif terhadap perkembangan teknologi dan kebutuhan industri.
                  </p>
                  <p>
                    4. Menyediakan sarana dan prasarana pendidikan yang memadai untuk mengoptimalkan proses pembelajaran.
                  </p>
                  <p>
                    5. Membangun kerjasama dengan dunia usaha dan industri untuk meningkatkan relevansi pendidikan.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Struktur Organisasi Section */}
        <section ref={strukturRef} id="struktur-organisasi" className="py-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-white/95"></div>
          <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-5 bg-repeat"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isStrukturInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Struktur <span className="text-orange-500">Organisasi</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Tim profesional yang berdedikasi dalam pengembangan pendidikan di SMK IT Baitul Aziz
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isStrukturInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-orange-50/80 backdrop-blur-sm border border-orange-100 rounded-xl p-8 hover:bg-orange-100 transition-all duration-300"
            >
              {/* <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center mb-12">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-orange-500">
                    <div className="w-full h-full bg-gradient-to-br from-orange-100/60 to-orange-200/60 flex items-center justify-center">
                      <span className="text-orange-500">Foto</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Bapak Ahmad Fauzi, S.Pd., M.T.</h3>
                  <p className="text-orange-500">Kepala Sekolah</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"> */}
                  {/* Wakil Kepala Sekolah */}
                  {/* {['Waka Kurikulum', 'Waka Kesiswaan', 'Waka Sarana Prasarana'].map((position, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border border-orange-200">
                        <div className="w-full h-full bg-gradient-to-br from-orange-100/40 to-orange-200/40 flex items-center justify-center">
                          <span className="text-orange-400 text-xs">Foto</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">{`Bapak/Ibu ${String.fromCharCode(65 + index)}`}</h4>
                      <p className="text-orange-500/80 text-sm">{position}</p>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6"> */}
                  {/* Ketua Program Keahlian */}
                  {/* {['Teknik Komputer Jaringan', 'Rekayasa Perangkat Lunak', 'Multimedia', 'Administrasi'].map((position, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mb-2 border border-orange-100">
                        <div className="w-full h-full bg-gradient-to-br from-orange-100/20 to-orange-200/20 flex items-center justify-center">
                          <span className="text-orange-400 text-xs">Foto</span>
                        </div>
                      </div>
                      <h4 className="text-base font-medium text-gray-900 text-center">{`Ketua ${position}`}</h4>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 text-center">
                  <a 
                    href="/struktur-lengkap" 
                    className="inline-flex items-center px-5 py-2 bg-orange-50/80 backdrop-blur-sm text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-100 transition-all duration-300"
                  >
                    <span>Lihat Struktur Lengkap</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div> */}
            </motion.div>
          </div>
        </section>
        
        {/* Fasilitas Section */}
        <section ref={fasilitasRef} id="fasilitas" className="py-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-white"></div>
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5 bg-repeat"></div>
          <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-orange-100 blur-[100px] rounded-full"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFasilitasInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Fasilitas <span className="text-orange-500">Sekolah</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Fasilitas modern untuk mendukung proses pembelajaran berkualitas di SMK IT Baitul Aziz
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFasilitasInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {fasilitas.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFasilitasInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
                  className="bg-orange-50/80 backdrop-blur-sm border shadow-sm border-orange-100 rounded-xl p-6 hover:bg-orange-100 transition-all duration-300"
                >
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.name}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isFasilitasInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16 text-center"
            >
              <a 
                href="/galeri#fasilitas" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300"
              >
                <span>Lihat Galeri Fasilitas</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ProfileSekolah; 