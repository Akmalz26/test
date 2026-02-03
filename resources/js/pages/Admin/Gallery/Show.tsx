import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { ArrowLeft, Edit, Calendar, User, Tag, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import ImagePlaceholder from '@/components/ImagePlaceholder';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Gallery {
  id: number;
  title: string;
  description: string | null;
  image: string;
  category: string | null;
  is_featured: boolean;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: User;
}

interface Props {
  gallery: Gallery;
}

const Show: React.FC<Props> = ({ gallery }) => {
  return (
    <AdminLayout>
      <Head title={`${gallery.title} - Detail Galeri - SMK IT Baitul Aziz`} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href="/admin/gallery" 
            className="text-blue-600 hover:text-blue-800 inline-flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke daftar galeri
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{gallery.title}</h1>
              <Link 
                href={`/admin/gallery/${gallery.id}/edit`} 
                className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg inline-flex items-center transition-colors duration-300"
              >
                <Edit className="h-5 w-5 mr-2" />
                Edit
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
              {gallery.category && (
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  <span>Kategori: <span className="font-medium">{gallery.category}</span></span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Ditambahkan: <span className="font-medium">
                  {new Date(gallery.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </span></span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>Oleh: <span className="font-medium">{gallery.user.name}</span></span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                <span>Unggulan: <span className="font-medium">{gallery.is_featured ? 'Ya' : 'Tidak'}</span></span>
              </div>
            </div>
            
            <div className="aspect-video mb-6 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
              {gallery.image ? (
                <img 
                  src={gallery.image} 
                  alt={gallery.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling!.style.display = 'flex';
                  }}
                />
              ) : null}
              <ImagePlaceholder 
                width="100%" 
                height="100%" 
                className={gallery.image ? 'hidden' : ''} 
              />
            </div>
            
            {gallery.description && (
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-2">Deskripsi</h2>
                <p className="text-gray-700">{gallery.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Show; 