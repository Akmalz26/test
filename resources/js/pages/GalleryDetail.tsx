import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Author {
    id: number;
    name: string;
    email: string;
}

interface Photo {
    id: number;
    image: string;
    caption: string | null;
    sort_order: number;
}

interface Album {
    id: number;
    title: string;
    slug: string;
    summary: string | null;
    image: string | null;
    category: string | null;
    created_at: string;
    author: Author;
}

interface GalleryDetailProps {
    album: Album;
    photos: Photo[];
}

const GalleryDetail: React.FC<GalleryDetailProps> = ({ album, photos = [] }) => {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const openLightbox = (index: number) => {
        setSelectedIndex(index);
    };

    const closeLightbox = () => {
        setSelectedIndex(null);
    };

    const goToPrevious = useCallback(() => {
        if (selectedIndex === null) return;
        setSelectedIndex(selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1);
    }, [selectedIndex, photos.length]);

    const goToNext = useCallback(() => {
        if (selectedIndex === null) return;
        setSelectedIndex(selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1);
    }, [selectedIndex, photos.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'ArrowRight') goToNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, goToPrevious, goToNext]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        if (selectedIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedIndex]);

    return (
        <>
            <Head title={`${album.title} - Galeri SMK IT Baitul Aziz`} />

            <div className="min-h-screen bg-white text-gray-800">
                <Navbar />

                {/* Hero Section */}
                <section ref={heroRef} className="relative py-28 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"></div>
                    {album.image && (
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-30"
                            style={{ backgroundImage: `url(${album.image})` }}
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-gray-900/70"></div>

                    <div className="container mx-auto px-6 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl mx-auto"
                        >
                            {/* Back Button */}
                            <Link
                                href="/gallery"
                                className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Kembali ke Galeri
                            </Link>

                            <div className="text-center">
                                {album.category && (
                                    <span className="inline-block px-4 py-1 mb-4 rounded-full bg-orange-500/20 text-orange-400 text-sm font-medium border border-orange-500/30">
                                        {album.category}
                                    </span>
                                )}

                                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white leading-tight">
                                    {album.title}
                                </h1>

                                {album.summary && (
                                    <p className="text-white/70 text-lg mb-6 max-w-2xl mx-auto">
                                        {album.summary}
                                    </p>
                                )}

                                <div className="flex items-center justify-center gap-6 text-white/60 text-sm">
                                    <span className="flex items-center gap-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {formatDate(album.created_at)}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {photos.length} Foto
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        {album.author.name}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Photo Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-6">
                        {photos.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {photos.map((photo, index) => (
                                    <motion.div
                                        key={photo.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        className="group cursor-pointer"
                                        onClick={() => openLightbox(index)}
                                    >
                                        <div className="relative overflow-hidden rounded-xl h-[240px] bg-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                                            <img
                                                src={photo.image}
                                                alt={photo.caption || `Foto ${index + 1}`}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm p-3 rounded-full">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Caption overlay */}
                                            {photo.caption && (
                                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <p className="text-white text-sm truncate">{photo.caption}</p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-lg">Belum ada foto dalam album ini</p>
                            </div>
                        )}

                        {/* Link to News Article */}
                        <div className="mt-12 text-center">
                            <Link
                                href={`/berita/${album.slug}`}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                                Baca Berita Lengkap
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Lightbox */}
                <AnimatePresence>
                    {selectedIndex !== null && photos[selectedIndex] && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
                            onClick={closeLightbox}
                        >
                            {/* Close Button */}
                            <button
                                className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-colors"
                                onClick={closeLightbox}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Counter */}
                            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 text-white/70 text-sm font-medium bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full">
                                {selectedIndex + 1} / {photos.length}
                            </div>

                            {/* Previous Button */}
                            <button
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Next Button */}
                            <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Image */}
                            <motion.div
                                key={selectedIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="max-w-6xl w-full mx-4 flex flex-col items-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={photos[selectedIndex].image}
                                    alt={photos[selectedIndex].caption || `Foto ${selectedIndex + 1}`}
                                    className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg"
                                />
                                {photos[selectedIndex].caption && (
                                    <p className="text-white/80 text-center mt-4 text-lg max-w-2xl">
                                        {photos[selectedIndex].caption}
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

export default GalleryDetail;
