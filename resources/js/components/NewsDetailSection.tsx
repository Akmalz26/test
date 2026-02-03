import React, { useRef } from 'react';
import { Link } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import { Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import ImagePlaceholder from './ImagePlaceholder';

interface User {
  id: number;
  name: string;
  email: string;
}

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

interface NewsDetailSectionProps {
  news: NewsItem;
  relatedNews?: NewsItem[];
}

const NewsDetailSection: React.FC<NewsDetailSectionProps> = ({ news, relatedNews = [] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Format tanggal ke format Indonesia
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Helper function untuk kapitalisasi string
  function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
  }

  // Fungsi untuk berbagi berita
  const shareNews = (platform: string) => {
    const url = window.location.href;
    const title = news.title;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <section ref={ref} className="py-12 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200"
            >
              {/* Featured Image */}
              {news.image && (
                <div className="relative aspect-[16/9] w-full">
                  <img
                    src={news.image}
                    alt={news.title}
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
                    text={news.title}
                    className={news.image ? 'hidden' : ''} 
                  />
                </div>
              )}
              
              {/* Content */}
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{news.title}</h1>
                
                {/* Meta Information */}
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                  {news.category && (
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-1" />
                      <span>Kategori: <span className="text-orange-600">{news.category}</span></span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Dipublikasikan: {formatDate(news.created_at)}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>Oleh: <span className="text-orange-600">{news.author.name}</span></span>
                  </div>
                </div>

                {/* Summary */}
                {news.summary && (
                  <div className="text-lg text-gray-700 mb-8">
                    {news.summary}
                  </div>
                )}

                {/* Main Content */}
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />

                {/* Share Buttons */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <Share2 className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-600">Bagikan:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => shareNews('facebook')}
                        className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        title="Bagikan di Facebook"
                      >
                        <Facebook className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => shareNews('twitter')}
                        className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                        title="Bagikan di Twitter"
                      >
                        <Twitter className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => shareNews('linkedin')}
                        className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                        title="Bagikan di LinkedIn"
                      >
                        <Linkedin className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => shareNews('email')}
                        className="p-2 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                        title="Bagikan melalui Email"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Author Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-orange-600">
                    {news.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{news.author.name}</h3>
                  <p className="text-sm text-gray-600">{news.author.email}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Penulis artikel ini adalah anggota tim SMK IT Baitul Aziz yang berdedikasi untuk memberikan informasi terbaru dan terpercaya kepada masyarakat.
              </p>
            </motion.div>

            {/* Related News */}
            {relatedNews.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Berita Terkait</h3>
                <div className="space-y-4">
                  {relatedNews.map((item) => (
                    <Link
                      key={item.id}
                      href={`/berita/${item.slug || item.id}`}
                      className="block group"
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
                        </div>
                        <div>
                          <h4 className="text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {formatDate(item.created_at)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Categories */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Kategori</h3>
              <div className="flex flex-wrap gap-2">
                {['Berita Sekolah', 'Prestasi', 'Kegiatan', 'Pengumuman', 'Artikel'].map((category) => (
                  <Link
                    key={category}
                    href={`/berita?category=${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-orange-500 hover:text-white transition-colors text-sm"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsDetailSection; 