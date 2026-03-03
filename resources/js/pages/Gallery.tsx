import React, { useState, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImagePlaceholder from '../components/ImagePlaceholder';

interface Author {
  id: number;
  name: string;
  email: string;
}

interface Album {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  image: string | null;
  cover_photo: string | null;
  category: string | null;
  photo_count: number;
  created_at: string;
  updated_at: string;
  author: Author;
}

interface GalleryProps {
  albums?: Album[];
  categories?: string[];
}

const Gallery: React.FC<GalleryProps> = ({ albums = [], categories = [] }) => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [activeCategory, setActiveCategory] = useState<string>('semua');

  const categoryOptions = [
    { id: 'semua', name: 'Semua' }
  ];

  if (categories.length > 0) {
    categories.forEach(category => {
      categoryOptions.push({ id: category, name: capitalize(category) });
    });
  }

  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const filteredAlbums = activeCategory === 'semua'
    ? albums
    : albums.filter(item => item.category === activeCategory);

  return (
    <>
      <Head title="Galeri - SMK IT Baitul Aziz" />

      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />

        {/* Hero Section */}
        <section ref={heroRef} className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
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
                Album Foto Kegiatan
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                Galeri <span className="text-orange-500">Album</span> Sekolah
              </h1>

              <p className="text-gray-700 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
                Kumpulan album foto dokumentasi kegiatan dan momen berharga di SMK IT Baitul Aziz
              </p>

              {/* Category Filter */}
              {categoryOptions.length > 1 && (
                <div className="flex items-center justify-center flex-wrap gap-3 py-2">
                  {categoryOptions.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${activeCategory === category.id
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                          : 'bg-white/80 text-gray-700 hover:bg-orange-50 border border-gray-200'
                        }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Album Grid */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            <AnimatePresence>
              {filteredAlbums.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredAlbums.map((album, index) => (
                    <motion.div
                      key={album.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      layout
                    >
                      <Link
                        href={`/gallery/${album.slug}`}
                        className="group block"
                      >
                        <div className="relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100">
                          {/* Album Cover */}
                          <div className="relative h-[260px] overflow-hidden">
                            {album.image ? (
                              <img
                                src={album.image}
                                alt={album.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
                              text={album.title}
                              className={album.image ? 'hidden' : ''}
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Photo Count Badge */}
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {album.photo_count} Foto
                            </div>

                            {/* Album Info at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                              <h3 className="text-white text-xl font-bold leading-tight line-clamp-2 group-hover:text-orange-300 transition-colors">
                                {album.title}
                              </h3>
                              {album.category && (
                                <span className="inline-block mt-2 px-2.5 py-0.5 bg-orange-500/30 backdrop-blur-sm text-orange-200 text-xs font-medium rounded-full">
                                  {capitalize(album.category)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Album Footer */}
                          <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDate(album.created_at)}
                            </div>
                            <div className="text-orange-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                              Lihat Album
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="max-w-sm mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Album</h3>
                    <p className="text-gray-500">
                      {activeCategory !== 'semua'
                        ? 'Tidak ada album untuk kategori ini'
                        : 'Album galeri foto akan segera ditambahkan'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Gallery;