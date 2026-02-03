import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PrincipalMessage from '../components/PrincipalMessage';
import FeatureSection from '../components/FeatureSection';
import StatsSection from '../components/StatsSection';
import OurPrograms from '../components/OurPrograms';
import GallerySection from '../components/GallerySection';
import NewsSection from '../components/NewsSection';
import AnimatedCTA from '../components/AnimatedCTA';
import MapSection from '../components/MapSection';
import Footer from '../components/Footer';

// Interface untuk User
interface User {
  id: number;
  name: string;
  email: string;
}

// Interface untuk Gallery
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

// Interface untuk News
interface NewsItem {
  id: number;
  title: string;
  summary: string | null;
  content: string;
  image: string | null;
  category: string | null;
  author: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  user: User;
}

// Interface untuk props halaman Home
interface HomeProps {
  featuredGallery?: GalleryItem[];
  latestNews?: NewsItem[];
}

/**
 * Landing page SMK IT Baitul Aziz
 */
export default function Home({ featuredGallery = [], latestNews = [] }: HomeProps) {
  // Typing animation effect for the cursor
  useEffect(() => {
    const cursor = document.querySelector('.typing-cursor');
    if (!cursor) return;

    // Blinking effect
    const blink = () => {
      cursor.classList.toggle('opacity-0');
    };
    
    // Set interval for blinking effect
    const interval = setInterval(blink, 500);
    
    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head title="SMK IT Baitul Aziz" />
      
      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />
        <HeroSection />
        <PrincipalMessage />
        <FeatureSection />
        {/* <StatsSection /> */}
        <OurPrograms />
        <GallerySection featuredGallery={featuredGallery} />
        <NewsSection latestNews={latestNews} />
        <AnimatedCTA />
        <MapSection />
        <Footer />
      </div>
    </>
  );
} 