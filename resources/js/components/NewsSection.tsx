import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from '@inertiajs/react';
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
  author: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  user: User;
}

interface NewsSectionProps {
  latestNews?: NewsItem[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ latestNews = [] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  // Jika tidak ada data dari database, gunakan contoh data statis
  const newsItems = latestNews.length > 0 ? latestNews : [
    {
      id: 1,
      title: 'Pendaftaran Tahun Ajaran 2023/2024 Telah Dibuka',
      slug: 'pendaftaran-tahun-ajaran-2023-2024-telah-dibuka',
      summary: 'SMK IT Baitul Aziz membuka pendaftaran siswa baru untuk tahun ajaran 2023/2024. Dapatkan kesempatan beasiswa untuk siswa berprestasi.',
      content: '',
      image: '/images/news/placeholder.jpg',
      category: 'Pengumuman',
      author: 'Admin',
      is_featured: true,
      created_at: '2023-01-15 00:00:00',
      updated_at: '2023-01-15 00:00:00',
      user: { id: 1, name: 'Admin', email: '' }
    },
    {
      id: 2,
      title: 'Siswa Kami Raih Juara 1 Lomba Web Design Tingkat Nasional',
      slug: 'siswa-kami-raih-juara-1-lomba-web-design-tingkat-nasional',
      summary: 'Tim web design SMK IT Baitul Aziz berhasil meraih juara 1 dalam Kompetisi Web Design Tingkat Nasional yang diselenggarakan oleh Kementerian Pendidikan.',
      content: '',
      image: '/images/news/placeholder.jpg',
      category: 'Prestasi',
      author: 'Admin',
      is_featured: true,
      created_at: '2023-02-28 00:00:00',
      updated_at: '2023-02-28 00:00:00',
      user: { id: 1, name: 'Admin', email: '' }
    },
    {
      id: 3,
      title: 'Workshop Artificial Intelligence dan Machine Learning',
      slug: 'workshop-artificial-intelligence-dan-machine-learning',
      summary: 'SMK IT Baitul Aziz menyelenggarakan workshop AI dan Machine Learning dengan menghadirkan praktisi industri dari perusahaan teknologi terkemuka.',
      content: '',
      image: '/images/news/placeholder.jpg',
      category: 'Event',
      author: 'Admin',
      is_featured: true,
      created_at: '2023-03-10 00:00:00',
      updated_at: '2023-03-10 00:00:00',
      user: { id: 1, name: 'Admin', email: '' }
    },
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

  // Format tanggal ke format Indonesia
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-gray-50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-5 bg-repeat z-0"></div>
      <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-orange-500/10 blur-[100px] rounded-full z-0"></div>
      <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-orange-600/5 blur-[80px] rounded-full z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Berita <span className="text-orange-500">Terbaru</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ikuti perkembangan terkini dan informasi seputar kegiatan di SMK IT Baitul Aziz
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {newsItems.map((news) => (
            <motion.div
              key={news.id}
              variants={itemVariants}
              className="group bg-white rounded-lg overflow-hidden border shadow-sm border-gray-100 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                {news.image ? (
                  <img
                    src={news.image}
                    alt={news.title}
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
                  text={news.title}
                  className={news.image ? 'hidden' : ''}
                />

                {news.category && (
                  <div className="absolute top-0 left-0 m-3">
                    <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                      {news.category}
                    </span>
                  </div>
                )}

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-orange-500/40 rounded-tr-lg"></div>
              </div>

              <div className="p-6">
                <div className="text-orange-500/80 text-sm mb-2">{formatDate(news.created_at)}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-500 transition-colors duration-300">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {news.summary}
                </p>
                <Link
                  href={`/berita/${news.slug}`}
                  className="inline-flex items-center text-orange-500 hover:text-orange-600 transition-colors duration-300"
                >
                  <span>Baca selengkapnya</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
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
            href="/berita"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300"
          >
            <span>Lihat Semua Berita</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection; 