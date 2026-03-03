import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { ArrowLeft, Edit, Calendar, User, Tag, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import ImagePlaceholder from '@/components/ImagePlaceholder';

interface User {
  id: number;
  name: string;
  email: string;
}

interface News {
  id: number;
  title: string;
  summary: string | null;
  content: string;
  image: string | null;
  category: string | null;
  is_featured: boolean;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: User;
}

interface Props {
  news: News;
}

const Show: React.FC<Props> = ({ news }) => {
  return (
    <AdminLayout>
      <Head title={`${news.title} - Detail Berita - SMK IT Baitul Aziz`} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href="/admin/news" 
            className="text-orange-600 hover:text-orange-800 inline-flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke daftar berita
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{news.title}</h1>
              <Link 
                href={`/admin/news/${news.id}/edit`} 
                className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg inline-flex items-center transition-colors duration-300"
              >
                <Edit className="h-5 w-5 mr-2" />
                Edit
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
              {news.category && (
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  <span>Kategori: <span className="font-medium">{news.category}</span></span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Dipublikasikan: <span className="font-medium">
                  {new Date(news.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </span></span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Diperbarui: <span className="font-medium">
                  {new Date(news.updated_at).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </span></span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>Oleh: <span className="font-medium">{news.user.name}</span></span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                <span>Unggulan: <span className="font-medium">{news.is_featured ? 'Ya' : 'Tidak'}</span></span>
              </div>
            </div>
            
            {news.image && (
              <div className="aspect-video mb-6 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling!.style.display = 'flex';
                  }}
                />
                <ImagePlaceholder 
                  width="100%" 
                  height="100%" 
                  className="hidden" 
                />
              </div>
            )}
            
            {news.summary && (
              <div className="my-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <h2 className="text-xl font-semibold mb-2">Ringkasan</h2>
                <p className="text-gray-700 italic">{news.summary}</p>
              </div>
            )}
            
            <div className="prose max-w-none mt-6">
              <h2 className="text-xl font-semibold mb-4">Konten</h2>
              <div 
                className="text-gray-700" 
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Show; 