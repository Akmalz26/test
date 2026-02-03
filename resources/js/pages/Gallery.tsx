import React, { useState, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImagePlaceholder from '../components/ImagePlaceholder';

// Interface untuk User
interface User {
  id: number;
  name: string;
  email: string;
}

// Interface untuk GalleryItem
interface GalleryItem {
  id: number;
  title: string;
  description: string | null;
  image: string;
  category: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  user: User;
}

// Interface untuk props halaman Gallery
interface GalleryProps {
  galleries?: GalleryItem[];
  categories?: string[];
}

const Gallery: React.FC<GalleryProps> = ({ galleries = [], categories = [] }) => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('semua');
  
  // Jika tidak ada data dari database, gunakan data statis
  const galleryItems = galleries.length > 0 ? galleries : [
    {
      id: 1,
      title: 'Praktikum Lab Komputer',
      description: 'Siswa PPLG belajar praktik pengembangan aplikasi web di lab komputer',
      image: '/images/gallery/programming-lab.jpg',
      category: 'kegiatan-belajar',
      is_featured: true,
      created_at: '2023-03-15',
      updated_at: '2023-03-15',
      user: { id: 1, name: 'Admin', email: '' }
    },
    // ...data statis lainnya
  ];
  
  // Kategori-kategori yang akan ditampilkan
  const categoryOptions = [
    { id: 'semua', name: 'Semua' }
  ];
  
  // Menambahkan kategori dari data yang ada
  if (categories.length > 0) {
    categories.forEach(category => {
      categoryOptions.push({ id: category, name: capitalize(category) });
    });
  } else {
    // Kategori default jika tidak ada data
    categoryOptions.push(
      { id: 'kegiatan-belajar', name: 'Kegiatan Belajar' },
      { id: 'workshop', name: 'Workshop' },
      { id: 'kompetisi', name: 'Kompetisi' },
      { id: 'prestasi', name: 'Prestasi' },
      { id: 'event', name: 'Event' },
      { id: 'fasilitas', name: 'Fasilitas' },
      { id: 'kunjungan', name: 'Kunjungan Industri' },
      { id: 'ekstrakurikuler', name: 'Ekstrakurikuler' },
      { id: 'magang', name: 'Magang' }
    );
  }
  
  // Helper function untuk kapitalisasi string
  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
  }
  
  // Format tanggal ke format Indonesia
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  
  // Filter gallery berdasarkan kategori
  const filteredGallery = activeCategory === 'semua'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <>
      <Head title="Galeri - SMK IT Baitul Aziz" />
      
      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />
        
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-white to-white"></div>
          <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-10 bg-repeat"></div>
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-orange-500/20 blur-[100px] rounded-full"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-block px-5 py-1.5 mb-6 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-500 text-sm font-medium border border-orange-500/20">
                Momen-momen berharga
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                Galeri <span className="text-orange-500">Kegiatan</span> Sekolah
              </h1>
              
              <p className="text-gray-700 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
                Dokumentasi visual perjalanan pembelajaran dan aktivitas di SMK IT Baitul Aziz
              </p>
              
              <div className="relative w-full max-w-4xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-transparent to-orange-500/30 blur-xl opacity-50 -z-10 rounded-2xl"></div>
                
                {/* Kategori Filter */}
                <div className="flex items-center justify-center flex-wrap gap-3 py-2">
                  {categoryOptions.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2   rounded-lg text-sm transition-all duration-300 ${
                        activeCategory === category.id
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                          : 'bg-white/10 text-gray-700 hover:bg-white/20'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Gallery Grid */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            <AnimatePresence>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGallery.length > 0 ? (
                  filteredGallery.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      layout
                      className="group"
                    >
                      <div 
                        className="relative overflow-hidden rounded-xl cursor-pointer h-[250px] bg-white/5 border border-white/10"
                        onClick={() => setSelectedImage(item)}
                      >
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.title}
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
                          text={item.title}
                          className={item.image ? 'hidden' : ''} 
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 p-4 flex flex-col justify-end">
                          <h3 className="text-white text-lg font-semibold line-clamp-2 mb-1">{item.title}</h3>
                          {item.category && (
                            <span className="text-orange-500 text-sm">{capitalize(item.category)}</span>
                          )}
                          <span className="text-white/70 text-xs mt-1">{formatDate(item.created_at)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-16"
                  >
                    <div className="text-white/50 text-xl">Tidak ada galeri untuk kategori ini</div>
                  </motion.div>
                )}
              </div>
            </AnimatePresence>
          </div>
        </section>
        
        {/* Lightbox untuk melihat gambar yang dipilih */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-10" 
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="max-w-5xl w-full rounded-lg overflow-hidden bg-white/5 backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full bg-black/50 flex items-center justify-center">
                {selectedImage.image ? (
                  <img 
                    src={selectedImage.image} 
                    alt={selectedImage.title} 
                    className="max-w-full max-h-full object-contain"
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
                  text={selectedImage.title}
                  className={selectedImage.image ? 'hidden' : ''} 
                />
                
                <button 
                  className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
                  onClick={() => setSelectedImage(null)}
                  title="Tutup"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{selectedImage.title}</h3>
                  {selectedImage.category && (
                    <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-500 text-xs font-semibold rounded-full">
                      {capitalize(selectedImage.category)}
                    </span>
                  )}
                </div>
                
                {selectedImage.description && (
                  <p className="text-white/70 mb-4">{selectedImage.description}</p>
                )}
                
                <div className="flex items-center justify-between text-white/50 text-sm">
                  <span>{formatDate(selectedImage.created_at)}</span>
                  <span>Oleh: {selectedImage.user.name}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <Footer />
      </div>
    </>
  );
};

export default Gallery; 