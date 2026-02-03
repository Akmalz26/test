import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PrincipalMessage: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.3
  });

  return (
    <section className="py-20 relative overflow-hidden bg-white" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-5" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white to-transparent" />
      
      {/* Orange glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-orange-500/10 blur-[100px] rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -left-5 -top-5 w-24 h-24 border-l-2 border-t-2 border-orange-500/50" />
              <div className="absolute -right-5 -bottom-5 w-24 h-24 border-r-2 border-b-2 border-orange-500/50" />
              
              {/* Image container with gradient border */}
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-1 shadow-md">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-white">
                  {/* Placeholder for principal image, replace with actual image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img 
                    src="/assets/images/kepsek.jpg" 
                    alt="Kepala Sekolah SMK IT Baitul Aziz"
                    className="h-full w-full object-cover"
                    onError={(e) => { 
                      e.currentTarget.src = 'https://placehold.co/600x800/f5f5f5/666666?text=Kepala+Sekolah'; 
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Digital decoration */}
            <motion.div 
              className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full border border-dashed border-orange-500/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-orange-500 font-medium mb-3">SAMBUTAN</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              Kepala Sekolah <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">SMK IT Baitul Aziz</span>
            </h2>
            
            <div className="prose max-w-none">
              <blockquote className="border-l-2 border-orange-500 pl-6 italic text-gray-700 my-6">
                <p>Assalamu'alaikum Warahmatullahi Wabarakatuh,</p>
              </blockquote>
              
              <p className="text-gray-700 mb-4">
              Berbagai penelitian menjelaskan bahwa pendidikan sangat berpengaruh besar dalam mengubah sikap mental dan perilaku manusia. Dengan pendidikan perilaku-perilaku negatif yang terjadi di masyarakat dapat diminimalisir, baik pendidikan dengan jalur formal, seperti sekolah ataupun nonformal seperti pesantren atau memadukan keduanya.</p>
              
              <p className="text-gray-700 mb-4">
              Surveipun membuktikan bahwa hal yang paling efektif untuk memajukan sebuah bangsa adalah pendidikan yang menghasilkan SDM berkualitas, begitupun dunia industri yang begitu kompetitif hanya memberi kesempatan berkarya bagi manusia yang unggul.</p>
              
              <p className="text-gray-700">
              Oleh karena itu SMK IT Baitul Aziz hadir dengan kurikulum Nasional yang dipadukan dengan paradigma peradaban Robbaniyah untuk mencetak peserta didik yang siap menghadapi perkembangan zaman dengan kompetisi kejuruan yang profesional dan akhlak yang Qur'ani.</p>
              
              <div className="mt-8 flex items-start">
                <div>
                  <p className="text-gray-800 font-semibold">H.Feny Irfany Muhammad, ST., M.AP.</p>
                  <p className="text-gray-600 text-sm">Kepala Sekolah SMK IT Baitul Aziz</p>
                </div>
                <img 
                  src="/images/signature.png" 
                  alt="Tanda tangan Kepala Sekolah" 
                  className="h-16 ml-4"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalMessage; 