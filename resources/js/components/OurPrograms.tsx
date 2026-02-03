import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronRight, Monitor } from 'lucide-react';

const OurPrograms: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const programs = [
    {
      id: 'pplg',
      title: 'Pengembangan Perangkat Lunak dan Gim',
      icon: <Monitor className="w-12 h-12 text-orange-500" />,
      description: 'Fokus pada pengembangan aplikasi berbasis web, mobile, desktop, dan gim dengan standar industri modern. Menggunakan bahasa pemrograman seperti Java, Kotlin, JavaScript, PHP, dan framework terkini.',
      skills: [
        'Web Development (Frontend & Backend)',
        'Mobile App Development',
        'UI/UX Design',
        'Game Development',
        'Software Engineering',
        'Quality Assurance & Testing'
      ]
    }
  ];

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden" id="program-keahlian">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />
      
      {/* Orange glow effects */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/5 blur-[100px] rounded-full -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-600/5 blur-[120px] rounded-full translate-y-1/3" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h3 className="text-orange-500 font-medium mb-4">PROGRAM KEAHLIAN</h3>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Kuasai <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Kompetensi Digital</span> Masa Depan
          </h2>
          <p className="text-gray-600 text-lg">
            SMK IT Baitul Aziz menawarkan program keahlian unggulan yang dirancang untuk mempersiapkan siswa menghadapi dunia industri teknologi informasi.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 max-w-3xl mx-auto"
        >
          {programs.map((program) => (
            <motion.div
              key={program.id}
              variants={itemVariants}
              className="bg-white shadow-md rounded-xl border border-gray-100 overflow-hidden group relative"
            >
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Program icon */}
              <div className="absolute top-6 right-6 opacity-10 transform scale-150 group-hover:scale-[2] transition-all duration-700">
                {program.icon}
              </div>
              
              <div className="p-8 relative z-10">
                <div className="bg-orange-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  {program.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4">{program.title}</h3>
                <p className="text-gray-600 mb-6">{program.description}</p>
                
                <div className="space-y-2 mb-8">
                  <h4 className="text-orange-500 font-medium mb-2">Keahlian yang Dipelajari:</h4>
                  {program.skills.map((skill, i) => (
                    <div key={i} className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-orange-500 mt-1 mr-2 shrink-0" />
                      <span className="text-gray-600">{skill}</span>
                    </div>
                  ))}
                </div>
                
                <a 
                  href={`/kompetensi/${program.id}`} 
                  className="inline-flex items-center text-gray-800 hover:text-orange-600 font-medium group/link"
                >
                  <span>Pelajari Lebih Lanjut</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
              
              {/* Bottom gradient border */}
              <div className="h-1 w-full bg-gradient-to-r from-orange-400 to-orange-600" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a 
            href="/program-keahlian" 
            className="inline-flex items-center px-8 py-3 bg-gray-100 text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-200 transition-all duration-300"
          >
            <span>Lihat Detail Jurusan</span>
            <ChevronRight className="ml-2 w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default OurPrograms; 