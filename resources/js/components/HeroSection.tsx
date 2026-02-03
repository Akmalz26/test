import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const HeroSection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, {
    amount: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
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

  const floatingAnimation = {
    y: [0, -12, 0],
    rotate: [0, 1, 0, -1, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center" ref={ref}>
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(/assets/images/background.jpg)',
          filter: 'blur(3px) brightness(0.9)',
          transform: 'scale(1)',
          marginLeft: '20px'
        }}
      />
      
      {/* Digital Circuit Overlay */}
      <div className="absolute inset-0 z-0 bg-[url('/images/circuit-pattern.svg')] opacity-20 bg-repeat" />
      
      {/* Light Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-white via-white to-orange-100/30" />
      <div className="absolute bottom-0 left-0 z-0 w-[40%] h-[40%] bg-orange-500/10 blur-[100px] rounded-full" />
      <div className="absolute top-[20%] right-[10%] z-0 w-[25%] h-[25%] bg-orange-600/5 blur-[80px] rounded-full" />
      
      {/* Digital particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-500/30 rounded-full"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              opacity: 0.3 + Math.random() * 0.5
            }}
            animate={{ 
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ 
              duration: 5 + Math.random() * 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 py-24 relative z-10 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Left side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="max-w-xl"
          >
            <motion.div variants={itemVariants} className="mb-2">
              <div className="inline-block px-4 py-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-sm font-medium text-white mb-6 shadow-lg shadow-orange-500/20">
                Sekolah Program Keunggulan
              </div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold mb-6 text-gray-800 leading-tight"
            >
              <span className="block">SMK IT</span> 
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">Baitul Aziz</span>
              <span className="typing-cursor">_</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl"
            >
              Membentuk Generasi Unggul yang Berakhlak Mulia dan Terampil di Bidang Teknologi Informasi
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <a 
                href="ppdb/pendaftaran" 
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 flex items-center group"
              >
                <span>Daftar Sekarang</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
              <a 
                href="/kompetensi" 
                className="px-8 py-3 bg-gray-100 text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-200 transition-all duration-300"
              >
                Program Keahlian
              </a>
            </motion.div>
            
            {/* <motion.div 
              variants={itemVariants}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { number: '5+', text: 'Tahun Pengalaman' },
                { number: '3', text: 'Program Keahlian' },
                { number: '100%', text: 'Lulusan Terserap' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md p-6 rounded-lg border border-white/10">
                  <div className="text-3xl font-bold text-orange-500 mb-1">{stat.number}</div>
                  <div className="text-white/80">{stat.text}</div>
                </div>
              ))}
            </motion.div> */}
          </motion.div>
          
          {/* Right side - Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center items-center relative"
          >
            {/* Main circular frame */}
            <div className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px] flex items-center justify-center">
              {/* Outer decorative circles */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-orange-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.div
                className="absolute inset-[15px] rounded-full border border-orange-500/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Dots on orbit */}
              {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const x = Math.cos(angle) * 120;
                const y = Math.sin(angle) * 120;
                
                return (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full"
                    style={{ marginLeft: x, marginTop: y }}
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
              
              {/* Logo container with floating animation */}
              <motion.div
                className="relative z-10"
                animate={floatingAnimation}
              >
                {/* Glowing backdrop */}
                <div className="absolute -inset-6 bg-gradient-to-br from-orange-500/30 to-orange-600/10 rounded-full blur-xl -z-10" />
                
                {/* Logo circular frame */}
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-full p-[2px] bg-gradient-to-br from-orange-300/30 to-orange-600/30 shadow-lg shadow-orange-500/20">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-white to-white/90 p-4 border border-white/10 overflow-hidden flex items-center justify-center">
                    {/* Actual logo */}
                    <img 
                      src="/assets/images/logo.png" 
                      alt="SMK IT Baitul Aziz Logo"
                      className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]"
                      onError={(e) => {
                        // Fallback if image doesn't load
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/logo.svg';
                      }}
                    />
                  </div>
                </div>
                
                {/* Light rays effect behind logo */}
                <div className="absolute inset-0 -z-10 -translate-y-27">
                  {[...Array(12)].map((_, i) => {
                    const rotate = `rotate(${i * 30}deg)`;
                    return (
                      <motion.div 
                        key={i} 
                        className="absolute top-1/2 left-1/2 w-0.5 h-24 md:h-28 bg-gradient-to-t from-orange-500/30 to-transparent -translate-x-1/2 origin-bottom"
                        style={{ transform: `${rotate} translateY(-100%)` }}
                        animate={{ opacity: [0.4, 0.7, 0.4] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          delay: i * 0.2,
                          ease: "easeInOut" 
                        }}
                      />
                    );
                  })}
                </div>
              </motion.div>
              
              {/* Tech decorative elements */}
              <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-orange-500/40 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-orange-500/40 rounded-bl-lg" />
              <div className="absolute top-0 left-1/4 w-2 h-2 bg-orange-500/60 rounded-full shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
              <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-orange-500/60 rounded-full shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Animated Scroll Down Indicator */}
      {/* <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <p className="text-sm mb-2">Scroll untuk menjelajahi</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-orange-500 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div> */}
    </div>
  );
};

export default HeroSection; 