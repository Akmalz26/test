import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const MapSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.2
  });

  return (
    <section ref={ref} className="py-16 relative overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-10" />
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-orange-50 to-transparent" />
      
      {/* Orange glow */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-orange-400/10 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h3 className="text-orange-500 font-medium mb-3">LOKASI KAMI</h3>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Kunjungi <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Kampus Kami</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            SMK IT Baitul Aziz berlokasi strategis dan mudah dijangkau. Kunjungi kami untuk mengetahui lebih lanjut tentang program dan fasilitas yang kami tawarkan.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-white to-orange-50/60 backdrop-blur-sm rounded-xl border border-orange-100 p-6 h-full shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Informasi Kontak</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="text-orange-500 w-5 h-5 mt-1 mr-3 shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Alamat</h4>
                  <p className="text-gray-600">Neglasari, Kec. Majalaya, Kabupaten Bandung, Jawa Barat 40385</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-orange-500 w-5 h-5 mt-1 mr-3 shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Telepon</h4>
                  <p className="text-gray-600">0812-3456-7890</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="text-orange-500 w-5 h-5 mt-1 mr-3 shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Email</h4>
                  <p className="text-gray-600">smkitbaitulaziz@gmail.com</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-orange-100">
                <a 
                  href="https://maps.app.goo.gl/HWW3FczFqEdN79WL7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-orange-500 hover:text-orange-600 transition-colors"
                >
                  <span>Lihat di Google Maps</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 overflow-hidden rounded-xl border border-orange-100 h-[400px] bg-orange-50/40 shadow"
          >
            <div className="relative w-full h-full">
              {/* Map Overlay Gradient - Top and Left */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-orange-100/60 to-transparent z-10" />
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-orange-100/60 to-transparent z-10" />
              
              {/* Map Overlay Gradient - Bottom and Right */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-orange-100/60 to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-orange-100/60 to-transparent z-10" />
              
              {/* Border Corners Decoration */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-orange-500/30 z-20" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-orange-500/30 z-20" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-orange-500/30 z-20" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-orange-500/30 z-20" />
              
              {/* Google Maps Embed */}

              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.4613901015864!2d107.72483630019349!3d-7.081608096115856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c13516fe177f%3A0x3d23725c0d0c5d6c!2sSMK%20IT%20Baitul%20Aziz!5e0!3m2!1sid!2sid!4v1721765635920!5m2!1sid!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi SMK IT Baitul Aziz"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MapSection; 