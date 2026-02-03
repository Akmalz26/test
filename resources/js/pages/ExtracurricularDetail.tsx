import React, { useRef } from 'react';
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
  summary?: string | null;
}

interface ExtracurricularDetailProps {
  extracurricular: Extracurricular;
  otherExtracurriculars: Extracurricular[];
}

export default function ExtracurricularDetail({ extracurricular, otherExtracurriculars }: ExtracurricularDetailProps) {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, amount: 0.2 });

  return (
    <>
      <Head title={`${extracurricular.name} - SMK IT Baitul Aziz`} />
      
      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />
        
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-28 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-white"></div>
          {extracurricular.image_url && (
            <div className="absolute inset-0 opacity-20">
              <img 
                src={extracurricular.image_url || ''}
                alt={extracurricular.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-white/90"></div>
            </div>
          )}
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-orange-500/10 blur-[100px] rounded-full"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Link 
                  href="/ekstrakurikuler"
                  className="text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  Ekstrakurikuler
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-orange-500">{extracurricular.name}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight">
                Ekstrakurikuler <span className="text-orange-500">{extracurricular.name}</span>
              </h1>
              
              {/* {extracurricular.description && (
                <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
                  {extracurricular.description}
                </p>
              )} */}
            </motion.div>
          </div>
        </section>
        
        {/* Main Content */}
        <section ref={contentRef} className="py-16 relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200"
                >
                  {/* Featured Image */}
                  {extracurricular.image_url && (
                    <div className="relative aspect-[16/9] w-full">
                      <img
                        src={extracurricular.image_url || ''}
                        alt={extracurricular.name}
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
                      <ImagePlaceholder 
                        width="100%" 
                        height="100%" 
                        text={extracurricular.name}
                        className={extracurricular.image ? 'hidden' : ''} 
                      />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">{extracurricular.name}</h1>
                    
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        {extracurricular.description}
                      </p>
                      
                      <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Tentang Ekstrakurikuler {extracurricular.name}</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Ekstrakurikuler {extracurricular.name} di SMK IT Baitul Aziz adalah kegiatan yang bertujuan untuk mengembangkan bakat dan minat siswa dalam bidang {extracurricular.name.toLowerCase()}. 
                        Program ini dirancang untuk memberikan pengalaman praktis dan pengetahuan mendalam bagi para siswa yang ingin mengasah keterampilan mereka.
                      </p>
                      
                      <p className="text-gray-700 leading-relaxed">
                        Melalui kegiatan ini, siswa akan mendapatkan berbagai manfaat seperti peningkatan keterampilan teknis, pengembangan karakter, dan kesempatan untuk berpartisipasi dalam berbagai kompetisi. 
                        Ekstrakurikuler ini juga menjadi wadah bagi siswa untuk menjalin persahabatan dan kerjasama tim.
                      </p>
                      
                      <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Kegiatan dan Program</h3>
                      <ul className="text-gray-700 leading-relaxed list-disc pl-5 space-y-2">
                        <li>Latihan rutin sesuai jadwal yang telah ditentukan</li>
                        <li>Workshop dan pelatihan dengan instruktur profesional</li>
                        <li>Persiapan dan partisipasi dalam kompetisi</li>
                        <li>Kegiatan kolaboratif dengan ekstrakurikuler lain</li>
                        <li>Pentas atau pertunjukan akhir tahun</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Prestasi</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Tim {extracurricular.name} SMK IT Baitul Aziz telah berhasil meraih berbagai prestasi baik di tingkat kota, provinsi, maupun nasional. 
                        Beberapa prestasi terbaru meliputi partisipasi dalam kompetisi tingkat provinsi dan nasional serta berbagai penghargaan atas dedikasi dan keberhasilan tim.
                      </p>
                    </div>
                    
                    {/* Info Box */}
                    <div className="bg-orange-50 rounded-xl p-6 mt-8 border border-orange-100">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Informasi Pendaftaran</h4>
                      <p className="text-gray-700 mb-4">
                        Untuk bergabung dengan ekstrakurikuler {extracurricular.name}, siswa dapat menghubungi pembina ekstrakurikuler atau mendaftar melalui wali kelas masing-masing.
                      </p>
                      <Link
                        href="/kontak"
                        className="inline-flex items-center text-orange-500 hover:text-orange-600 transition-colors"
                      >
                        <span>Informasi lebih lanjut</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-8">
                {/* Information Card */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={isContentInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Informasi Kegiatan</h3>
                  
                  <div className="space-y-4">
                    {extracurricular.schedule && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-gray-800 font-medium mb-1">Jadwal</h4>
                          <p className="text-gray-600 text-sm">{extracurricular.schedule}</p>
                        </div>
                      </div>
                    )}
                    
                    {extracurricular.coach && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-gray-800 font-medium mb-1">Pembina</h4>
                          <p className="text-gray-600 text-sm">{extracurricular.coach}</p>
                        </div>
                      </div>
                    )}
                    
                    {extracurricular.location && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-gray-800 font-medium mb-1">Lokasi</h4>
                          <p className="text-gray-600 text-sm">{extracurricular.location}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
                
                {/* Other Extracurriculars */}
                {otherExtracurriculars.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={isContentInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Ekstrakurikuler Lainnya</h3>
                    
                    <div className="space-y-4">
                      {otherExtracurriculars.map(item => (
                        <Link
                          key={item.id}
                          href={`/ekstrakurikuler/${item.slug}`}
                          className="flex gap-3 group"
                        >
                          <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                            {item.image ? (
                              <img 
                                src={item.image_url || ''} 
                                alt={item.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-100 to-gray-200">
                                {item.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="text-gray-800 group-hover:text-orange-500 transition-colors font-medium">{item.name}</h4>
                            {item.schedule && (
                              <p className="text-gray-500 text-sm">{item.schedule}</p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <Link
                        href="/ekstrakurikuler"
                        className="text-orange-500 hover:text-orange-600 transition-colors text-sm flex items-center"
                      >
                        <span>Lihat semua ekstrakurikuler</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                )}
                
                {/* CTA */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={isContentInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Tertarik Bergabung?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Jadilah bagian dari ekstrakurikuler {extracurricular.name} dan kembangkan potensimu bersama kami!
                  </p>
                  
                  <Link
                    href="/kontak"
                    className="block w-full py-3 bg-orange-500 hover:bg-orange-600 text-white text-center rounded-lg transition-colors font-medium"
                  >
                    Hubungi Kami
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
} 