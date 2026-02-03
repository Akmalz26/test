import React, { useState, useRef, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
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
}

// Interface untuk props halaman News
interface NewsProps {
  news?: NewsItem[];
  categories?: string[];
  featured?: NewsItem;
}

const News: React.FC<NewsProps> = ({ news = [], categories = [], featured = null }) => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('semua');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // State untuk newsletter
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  
  // Jika tidak ada data dari database, gunakan data statis
  const newsItems = news.length > 0 ? news : [
    {
      id: 1,
      title: 'SMK IT Baitul Aziz Raih Juara 1 Lomba Web Development Tingkat Nasional',
      slug: 'smk-it-baitul-aziz-juara-lomba-web-development',
      summary: 'Tim developer web SMK IT Baitul Aziz berhasil meraih juara 1 dalam kompetisi web development tingkat nasional.',
      content: 'Tim developer web SMK IT Baitul Aziz berhasil meraih juara 1 dalam kompetisi web development tingkat nasional yang diselenggarakan oleh Kementerian Pendidikan dan Kebudayaan. Kompetisi yang diikuti oleh ratusan sekolah dari seluruh Indonesia ini menguji kemampuan siswa dalam merancang dan mengembangkan aplikasi web yang inovatif dan bermanfaat bagi masyarakat.',
      image: '/images/news/web-competition.jpg',
      category: 'prestasi',
      author_id: 1,
      is_featured: true,
      created_at: '2023-05-15',
      updated_at: '2023-05-15',
      author: {
        id: 1,
        name: 'Admin',
        email: 'admin@example.com'
      }
    },
    // ...data statis lainnya
  ];
  
  // Item berita yang paling menonjol untuk hero section
  const featuredNews = featured || (newsItems.length > 0 ? newsItems.find(item => item.is_featured) || newsItems[0] : null);
  
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
      { id: 'berita-sekolah', name: 'Berita Sekolah' },
      { id: 'prestasi', name: 'Prestasi' },
      { id: 'kegiatan', name: 'Kegiatan' },
      { id: 'pengumuman', name: 'Pengumuman' },
      { id: 'artikel', name: 'Artikel' }
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
  
  // Filter berdasarkan kategori dan pencarian
  const filteredNews = newsItems
    .filter(item => {
      const matchesCategory = activeCategory === 'semua' || item.category === activeCategory;
      const matchesSearch = 
        searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.summary && item.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  
  // Pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi submit newsletter
    setEmailSubmitted(true);
    setTimeout(() => {
      setEmailSubmitted(false);
      setEmail('');
    }, 3000);
  };
  
  return (
    <>
      <Head title="Berita - SMK IT Baitul Aziz" />
      
      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />
        
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-24 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
          <div className="absolute inset-0 bg-[url('/images/tech-pattern.svg')] opacity-10 bg-repeat"></div>
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-orange-500/10 blur-[100px] rounded-full"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-block px-5 py-1.5 mb-6 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-500 text-sm font-medium border border-orange-500/20">
                Informasi terkini
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                Berita <span className="text-orange-500">dan</span> Informasi Sekolah
              </h1>
              
              <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
                Dapatkan informasi terbaru tentang kegiatan, prestasi, dan berita penting di SMK IT Baitul Aziz
              </p>
              
              <div className="relative w-full max-w-2xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-transparent to-orange-500/30 blur-xl opacity-50 -z-10 rounded-full"></div>
                
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Cari berita..."
                      className="py-3 pl-12 pr-4 block w-full rounded-full bg-white shadow-md border border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-500/20 text-gray-700 placeholder-gray-400 transition-all duration-300"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="ml-2 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full font-medium transition-colors duration-300 flex-shrink-0"
                    title="Cari"
                  >
                    Cari
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Featured News */}
        {featuredNews && (
          <section className="py-16 relative">
            <div className="container mx-auto px-6">
              <div className="relative overflow-hidden rounded-2xl bg-gray-50 shadow-lg border border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="relative h-[300px] lg:h-full overflow-hidden rounded-lg lg:rounded-r-none">
                    {featuredNews.image ? (
                      <img
                        src={featuredNews.image}
                        alt={featuredNews.title}
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
                      text={featuredNews.title}
                      className={featuredNews.image ? 'hidden' : ''} 
                    />
                  </div>
                  
                  <div className="p-8 flex flex-col justify-center">
                    {featuredNews.category && (
                      <span className="inline-block w-fit px-3 py-1 bg-orange-500/20 text-orange-500 text-xs font-semibold rounded-full mb-4">
                        {capitalize(featuredNews.category)}
                      </span>
                    )}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{featuredNews.title}</h2>
                    
                    {featuredNews.summary && (
                      <p className="text-gray-600 mb-6">{featuredNews.summary}</p>
                    )}
                    
                    <div className="flex items-center justify-between text-gray-500 text-sm mb-6">
                      <span>{formatDate(featuredNews.created_at)}</span>
                      <span>Oleh: {featuredNews.author.name}</span>
                    </div>
                    
                    <Link 
                      href={`/berita/${featuredNews.slug || featuredNews.id}`}
                      className="group rounded-lg overflow-hidden w-fit relative inline-flex items-center justify-center"
                    >
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg"></div>
                      <span className="relative z-10 block py-3 px-6 text-white font-medium transition-all duration-300 group-hover:tracking-wide">
                        Baca selengkapnya
                        <span className="absolute inset-0 -z-10 scale-x-[1.15] scale-y-[1.35] bg-black/20 blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 rounded-lg"></span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* News List with Categories */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            {/* Categories */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {categoryOptions.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setCurrentPage(1); // Reset to first page when changing category
                  }}
                  className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={category.name}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* News Grid */}
            {filteredNews.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-500 text-xl mb-4">Tidak ada berita yang ditemukan</div>
                <p className="text-gray-400">Coba gunakan kata kunci atau kategori yang berbeda</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence>
                    {paginatedNews.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        layout
                      >
                        <Link
                          href={`/berita/${item.slug || item.id}`}
                          className="block group h-full"
                        >
                          <div className="relative overflow-hidden rounded-xl bg-white shadow-md border border-gray-100 h-full transition-all duration-300 flex flex-col hover:shadow-lg">
                            <div className="relative aspect-[16/9] overflow-hidden">
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
                              
                              {item.category && (
                                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-orange-500">
                                  {capitalize(item.category)}
                                </div>
                              )}
                            </div>
                            
                            <div className="p-6 flex-grow flex flex-col">
                              <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors duration-300">
                                {item.title}
                              </h3>
                              
                              {item.summary && (
                                <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">
                                  {item.summary}
                                </p>
                              )}
                              
                              <div className="flex items-center justify-between text-gray-500 text-xs mt-auto">
                                <span>{formatDate(item.created_at)}</span>
                                <span>Oleh: {item.author.name}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-700 hover:bg-orange-500 hover:text-white transition-colors duration-300'
                        }`}
                        title="Halaman sebelumnya"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            currentPage === page
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-300'
                          }`}
                          title={`Halaman ${page}`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-700 hover:bg-orange-500 hover:text-white transition-colors duration-300'
                        }`}
                        title="Halaman berikutnya"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
        
        {/* Newsletter Subscription */}
        <section className="py-20 relative bg-gradient-to-b from-transparent to-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg border border-gray-100 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Dapatkan Berita Terbaru</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Berlangganan newsletter kami untuk mendapatkan informasi terbaru tentang kegiatan dan berita penting sekolah
                  </p>
                </div>
                
                <form onSubmit={handleSubscribe} className="max-w-xl mx-auto">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        placeholder="Alamat email Anda"
                        required
                        className="pl-12 pr-4 py-3 w-full rounded-lg bg-white border border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-500/20 text-gray-700 placeholder-gray-400 transition-all duration-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={emailSubmitted}
                      />
                    </div>
                    <button
                      type="submit"
                      className={`py-3 px-6 rounded-lg font-medium text-white transition-all duration-300 ${
                        emailSubmitted
                          ? 'bg-green-500 cursor-default'
                          : 'bg-orange-500 hover:bg-orange-600'
                      }`}
                      disabled={emailSubmitted}
                      title={emailSubmitted ? 'Berhasil berlangganan' : 'Berlangganan'}
                    >
                      {emailSubmitted ? 'Berhasil Berlangganan!' : 'Berlangganan'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default News; 