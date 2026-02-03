import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const AnimatedCTA: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  return (
    <section className="py-24 relative overflow-hidden bg-white" id="daftar">
      {/* Background gradient & effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-100 z-0" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Orange glow effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-200/40 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto bg-gradient-to-br from-white/90 to-orange-50/60 backdrop-blur-md rounded-2xl overflow-hidden border border-orange-100 shadow-xl shadow-orange-200/30"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left side content */}
            <div className="p-10 md:p-12">
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight"
              >
                Siap Menjadi Bagian dari <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Generasi Digital</span> Masa Depan?
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-gray-600 mb-8"
              >
                Bergabunglah dengan SMK IT Baitul Aziz dan dapatkan pendidikan teknologi berkualitas dengan nilai-nilai islami yang kuat. Pendaftaran siswa baru telah dibuka!
              </motion.p>
              
              <motion.div variants={itemVariants}>
                <a 
                  href="/pendaftaran" 
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 group"
                >
                  <span>Daftar Sekarang</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="mt-8 grid grid-cols-2 gap-4"
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
                  <span className="text-gray-700 text-sm">Pembelajaran Berbasis Proyek</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
                  <span className="text-gray-700 text-sm">Lab Komputer</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
                  <span className="text-gray-700 text-sm">Pengembangan Karakter</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
                  <span className="text-gray-700 text-sm">Kurikulum Merdeka</span>
                </div>
              </motion.div>
            </div>
            
            {/* Right side - animated elements */}
            <div className="relative bg-white/60 p-10 flex items-center justify-center overflow-hidden">
              {/* Circuit decoration overlay */}
              <div className="absolute inset-0 opacity-10 bg-[url('/images/circuit-pattern.svg')]" />
              
              {/* Main animated decoration */}
              <motion.div 
                className="relative z-10 w-full h-full flex items-center justify-center"
                variants={itemVariants}
              >
                <div className="relative">
                  {/* Digital circles */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ 
                      rotate: 360,
                    }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-52 h-52 rounded-full border-2 border-dashed border-orange-400/30" />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ 
                      rotate: -360,
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-40 h-40 rounded-full border border-orange-400/40" />
                  </motion.div>
                  
                  {/* Dots on the circle */}
                  {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    const x = Math.cos(angle) * 80;
                    const y = Math.sin(angle) * 80;
                    
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-orange-500 rounded-full"
                        style={{
                          left: "50%",
                          top: "50%",
                          x: x,
                          y: y,
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    );
                  })}
                  
                  {/* Center icon */}
                  <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 p-2 bg-white">
                    <img src="/assets/images/logo.png" alt="SMK IT Baitul Aziz" className="w-full h-full object-contain" />
                  </div>
                </div>
              </motion.div>
              
              {/* Bottom line decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/0 via-orange-500 to-orange-500/0" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedCTA; 