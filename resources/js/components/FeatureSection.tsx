import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Globe, Code, BookOpen, Users, Award } from 'lucide-react';

const FeatureSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features = [
    {
      icon: <Cpu className="h-10 w-10 text-orange-500" />,
      title: 'Kurikulum Merdeka',
      description: 'Pembelajaran lebih fleksibel, berfokus pada pengembangan karakter dan kompetensi, serta menyesuaikan kebutuhan siswa. Merdeka belajar, kreatif berkarya!',
    },
    {
      icon: <Globe className="h-10 w-10 text-orange-500" />,
      title: 'Jaringan Industri Luas',
      description: 'Kerjasama dengan perusahaan teknologi terkemuka untuk magang dan penempatan kerja.',
    },
    {
      icon: <Code className="h-10 w-10 text-orange-500" />,
      title: 'Pembelajaran Coding Intensif',
      description: 'Fokus pada pengembangan skill coding dan algoritma untuk persiapan dunia kerja.',
    },
    {
      icon: <BookOpen className="h-10 w-10 text-orange-500" />,
      title: 'Pendidikan Karakter Islami',
      description: 'Integrasi nilai-nilai islami dalam pembelajaran untuk membentuk pribadi berakhlak.',
    },
    {
      icon: <Users className="h-10 w-10 text-orange-500" />,
      title: 'Komunitas Tech Aktif',
      description: 'Ekosistem belajar yang didukung oleh komunitas teknologi dan kegiatan ekstrakurikuler.',
    },
    {
      icon: <Award className="h-10 w-10 text-orange-500" />,
      title: 'Pengembangan Karakter',
      description: 'Pengembangan karakter yang komprehensif melalui pengalaman praktik dan kegiatan ekstrakurikuler.',
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
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden" id="keunggulan">
      {/* Tech Pattern Background */}
      <div className="absolute inset-0 bg-[url('/images/tech-pattern.svg')] opacity-5" />
      
      {/* Gradient Overlay */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white to-transparent" />
      
      {/* Orange Glow */}
      <div className="absolute -left-32 top-1/4 w-96 h-96 bg-orange-500/10 blur-[100px] rounded-full" />
      <div className="absolute -right-32 bottom-1/4 w-96 h-96 bg-orange-600/5 blur-[100px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h3 
            className="text-orange-500 font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            KEUNGGULAN KAMI
          </motion.h3>
          
          <motion.h2 
            className="text-4xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Pendidikan dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Visi Islami</span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            SMK IT Baitul Aziz menggabungkan kurikulum Nasional dengan nilai-nilai islami untuk menghasilkan lulusan yang kompeten dan berakhlak mulia.
          </motion.p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200 hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 group"
            >
              <div className="p-4 bg-orange-50 inline-flex rounded-xl mb-5 group-hover:bg-orange-100 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection; 