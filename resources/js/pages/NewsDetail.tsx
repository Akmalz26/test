import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsDetailSection from '@/components/NewsDetailSection';

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

// Props untuk halaman NewsDetail
interface NewsDetailProps {
  news: NewsItem;
  relatedNews: NewsItem[];
}

const NewsDetail: React.FC<NewsDetailProps> = ({ news, relatedNews = [] }) => {
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
        
        <Footer />
      </div>
    </>
  );
};

export default NewsDetail; 