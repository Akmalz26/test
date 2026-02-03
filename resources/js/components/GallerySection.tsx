import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from '@inertiajs/react';
import ImagePlaceholder from './ImagePlaceholder';

interface User {
  id: number;
  name: string;
  email: string;
}

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

interface GallerySectionProps {
  featuredGallery?: GalleryItem[];
}

const GallerySection: React.FC<GallerySectionProps> = ({ featuredGallery = [] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  // Jika tidak ada data dari database, gunakan contoh galeri statis
  const galleryImages = featuredGallery.length > 0 ? featuredGallery : [
    { id: 1, title: 'Kegiatan Belajar', description: 'Kegiatan belajar siswa', image: '/images/gallery/placeholder.jpg', category: 'Kegiatan', is_featured: true, created_at: '', updated_at: '', user: { id: 1, name: 'Admin', email: '' } },
    { id: 2, title: 'Praktikum TI', description: 'Praktikum TI', image: '/images/gallery/placeholder.jpg', category: 'Praktikum', is_featured: true, created_at: '', updated_at: '', user: { id: 1, name: 'Admin', email: '' } },
    { id: 3, title: 'Kegiatan Ekstrakurikuler', description: 'Kegiatan Ekstrakurikuler', image: '/images/gallery/placeholder.jpg', category: 'Ekstrakurikuler', is_featured: true, created_at: '', updated_at: '', user: { id: 1, name: 'Admin', email: '' } },
    { id: 4, title: 'Kompetisi Siswa', description: 'Kompetisi Siswa', image: '/images/gallery/placeholder.jpg', category: 'Kompetisi', is_featured: true, created_at: '', updated_at: '', user: { id: 1, name: 'Admin', email: '' } },
    { id: 5, title: 'Fasilitas Sekolah', description: 'Fasilitas Sekolah', image: '/images/gallery/placeholder.jpg', category: 'Fasilitas', is_featured: true, created_at: '', updated_at: '', user: { id: 1, name: 'Admin', email: '' } },
    { id: 6, title: 'Workshop dan Seminar', description: 'Workshop dan Seminar', image: '/images/gallery/placeholder.jpg', category: 'Workshop', is_featured: true, created_at: '', updated_at: '', user: { id: 1, name: 'Admin', email: '' } },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  };

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5 bg-repeat z-0"></div>
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-orange-500/10 blur-[100px] rounded-full z-0"></div>
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-orange-600/5 blur-[80px] rounded-full z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Galeri <span className="text-orange-500">Kegiatan</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jelajahi aktivitas dan momen berkesan di SMK IT Baitul Aziz melalui koleksi foto-foto pilihan kami
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryImages.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-lg bg-white shadow-md border border-gray-100 aspect-video hover:shadow-lg transition-shadow duration-300"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
              
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-gray-800 font-medium text-lg">{item.title}</span>
                {item.category && (
                  <span className="text-orange-500 text-sm">{item.category}</span>
                )}
              </div>
              
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-orange-500/40 rounded-tr-lg"></div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span>Lihat Semua Galeri</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection; 