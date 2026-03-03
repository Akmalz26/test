import React, { useState, useEffect, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsDetailSection from '@/components/NewsDetailSection';

// Interface untuk User
interface User {
  id: number;
  name: string;
  email: string;
}

// Interface untuk GalleryPhoto
interface GalleryPhoto {
  id: number;
  image: string;
  caption: string | null;
  sort_order: number;
}

// Interface untuk NewsItem
interface NewsItem {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  image: string | null;
  category: string | null;
  author_id: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  author: User;
  gallery_photos?: GalleryPhoto[];
}

// Props untuk halaman NewsDetail
interface NewsDetailProps {
  news: NewsItem;
  relatedNews: NewsItem[];
}

const NewsDetail: React.FC<NewsDetailProps> = ({ news, relatedNews = [] }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const galleryPhotos = news.gallery_photos || [];

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const goToPrevious = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(selectedPhotoIndex === 0 ? galleryPhotos.length - 1 : selectedPhotoIndex - 1);
  }, [selectedPhotoIndex, galleryPhotos.length]);

  const goToNext = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex(selectedPhotoIndex === galleryPhotos.length - 1 ? 0 : selectedPhotoIndex + 1);
  }, [selectedPhotoIndex, galleryPhotos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, goToPrevious, goToNext]);

  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedPhotoIndex]);

  return (
    <>
      <Head title={`${news.title} - SMK IT Baitul Aziz`} />

      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />

        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gray-50"></div>
          <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-10 bg-repeat"></div>
          <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-orange-500/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-orange-600/5 blur-[80px] rounded-full"></div>

          {/* Content */}
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                {news.title}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-4 text-gray-600">
                <span>{new Date(news.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
                {news.category && (
                  <>
                    <span>•</span>
                    <span>{news.category}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* News Detail Section */}
        <NewsDetailSection news={news} relatedNews={relatedNews} />

        {/* Gallery Photos Section */}
        {galleryPhotos.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      Galeri <span className="text-orange-500">Foto</span>
                    </h2>
                    <p className="text-gray-500 mt-1">{galleryPhotos.length} foto dalam galeri ini</p>
                  </div>
                  <Link
                    href={`/gallery/${news.slug}`}
                    className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1 transition-colors"
                  >
                    Lihat Semua
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {galleryPhotos.slice(0, 8).map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group cursor-pointer"
                      onClick={() => openLightbox(index)}
                    >
                      <div className="relative overflow-hidden rounded-xl h-[180px] bg-gray-200 shadow-sm hover:shadow-md transition-all">
                        <img
                          src={photo.image}
                          alt={photo.caption || `Foto ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                        {photo.caption && (
                          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-xs truncate">{photo.caption}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Show more indicator */}
                  {galleryPhotos.length > 8 && (
                    <Link
                      href={`/gallery/${news.slug}`}
                      className="relative overflow-hidden rounded-xl h-[180px] bg-gray-800 shadow-sm hover:shadow-md transition-all flex items-center justify-center group"
                    >
                      <div className="text-center text-white">
                        <p className="text-3xl font-bold">+{galleryPhotos.length - 8}</p>
                        <p className="text-sm text-white/70 mt-1">Foto Lainnya</p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedPhotoIndex !== null && galleryPhotos[selectedPhotoIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
              onClick={closeLightbox}
            >
              <button
                className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-colors"
                onClick={closeLightbox}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 text-white/70 text-sm font-medium bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full">
                {selectedPhotoIndex + 1} / {galleryPhotos.length}
              </div>

              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <motion.div
                key={selectedPhotoIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="max-w-5xl w-full mx-4 flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={galleryPhotos[selectedPhotoIndex].image}
                  alt={galleryPhotos[selectedPhotoIndex].caption || `Foto ${selectedPhotoIndex + 1}`}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg"
                />
                {galleryPhotos[selectedPhotoIndex].caption && (
                  <p className="text-white/80 text-center mt-4 text-lg">
                    {galleryPhotos[selectedPhotoIndex].caption}
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
};

export default NewsDetail;