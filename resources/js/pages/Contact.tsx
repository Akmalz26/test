import React, { useState, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Phone, Mail, Clock, Send, User, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isFormInView = useInView(formRef, { once: true, amount: 0.3 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    
    // Simulasi pengiriman form
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset status setelah beberapa detik
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };

  // FAQ data
  const faqs = [
    {
      question: 'Bagaimana cara mendaftar di SMK IT Baitul Aziz?',
      answer: 'Pendaftaran dapat dilakukan secara online melalui website kami atau datang langsung ke sekolah. Periode pendaftaran biasanya dibuka pada bulan Januari hingga Juni setiap tahunnya.'
    },
    {
      question: 'Apakah ada beasiswa untuk siswa berprestasi?',
      answer: 'Ya, SMK IT Baitul Aziz menyediakan beasiswa untuk siswa berprestasi baik di bidang akademik maupun non-akademik. Informasi lebih lanjut dapat ditanyakan melalui bagian administrasi sekolah.'
    },
    {
      question: 'Berapa biaya pendidikan di SMK IT Baitul Aziz?',
      answer: 'Biaya pendidikan bervariasi tergantung program keahlian. Silakan hubungi bagian keuangan untuk informasi rinci mengenai biaya pendidikan terbaru.'
    },
    {
      question: 'Apa saja fasilitas yang tersedia di SMK IT Baitul Aziz?',
      answer: 'Sekolah kami dilengkapi dengan fasilitas modern seperti laboratorium komputer, ruang praktik kejuruan yang lengkap, perpustakaan digital, masjid, kantin, dan area olahraga.'
    },
    {
      question: 'Apakah ada program magang untuk siswa?',
      answer: 'Ya, SMK IT Baitul Aziz memiliki program magang industri wajib untuk siswa kelas XI. Kami bekerja sama dengan berbagai perusahaan teknologi terkemuka untuk memberikan pengalaman kerja nyata.'
    }
  ];

  return (
    <>
      <Head title="Kontak - SMK IT Baitul Aziz" />
      
      <div className="min-h-screen bg-white text-gray-800">
        <Navbar />
        
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
          <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-5 bg-repeat"></div>
          <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-orange-500/10 blur-[100px] rounded-full"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-block px-5 py-1.5 mb-6 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/10 text-orange-600 text-sm font-medium border border-orange-500/20">
                Hubungi Kami
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                Kontak <span className="text-orange-600">SMK IT Baitul Aziz</span>
              </h1>
              
              <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
                Ada pertanyaan atau ingin mengetahui informasi lebih lanjut? Jangan ragu untuk menghubungi kami
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Contact Info Cards */}
        <section className="py-12 relative">
          <div className="absolute right-0 top-1/4 w-60 h-60 bg-orange-500/5 rounded-full blur-[100px] -z-10"></div>
          <div className="absolute left-0 bottom-1/4 w-60 h-60 bg-orange-500/5 rounded-full blur-[100px] -z-10"></div>
          
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Alamat */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white shadow-lg border border-gray-100 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Alamat</h3>
                <p className="text-gray-600 mb-2">Jl. Neglasari</p>
                <p className="text-gray-600 mb-2">Kecamatan Majalaya</p>
                <p className="text-gray-600">Kabupaten Bandung, Jawa Barat 40385</p>
              </motion.div>
              
              {/* Telepon */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white shadow-lg border border-gray-100 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Telepon</h3>
                <p className="text-gray-600 mb-2">+62 21 1234 5678</p>
                <p className="text-gray-600">+62 812 3456 7890 (WhatsApp)</p>
              </motion.div>
              
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white shadow-lg border border-gray-100 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Email</h3>
                <p className="text-gray-600 mb-2">info@smkitbaitulaziz.sch.id</p>
                <p className="text-gray-600">admin@smkitbaitulaziz.sch.id</p>
              </motion.div>
              
              {/* Jam Operasional */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white shadow-lg border border-gray-100 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Jam Operasional</h3>
                <p className="text-gray-600 mb-2">Senin - Jumat: 07:00 - 16:00</p>
                <p className="text-gray-600">Sabtu: 08:00 - 12:00</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Contact Form and Map Section */}
        <section ref={formRef} className="py-16 relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Map with Contact Info */}
              <div className="order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white shadow-lg border border-gray-100 rounded-xl overflow-hidden"
                >
                  <div className="relative h-72 overflow-hidden border-b border-gray-100">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.4613901015864!2d107.72483630019349!3d-7.081608096115856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c13516fe177f%3A0x3d23725c0d0c5d6c!2sSMK%20IT%20Baitul%20Aziz!5e0!3m2!1sid!2sid!4v1721765635920!5m2!1sid!2sid"
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen={false} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="transition-all duration-300"
                      title="Lokasi SMK IT Baitul Aziz"
                    ></iframe>
                    <div className="absolute inset-0 border-4 border-orange-500/20 pointer-events-none"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">SMK IT Baitul Aziz</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-600">
                        Jl. Neglasari, Kec. Majalaya, Kabupaten Bandung, Jawa Barat 40385
                        </p>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                        <p className="text-gray-600">+62 21 1234 5678</p>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                        <p className="text-gray-600">info@smkitbaitulaziz.sch.id</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <a 
                        href="https://maps.app.goo.gl/HWW3FczFqEdN79WL7" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300"
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Lihat di Google Maps
                      </a>
                    </div>
                  </div>
                </motion.div>
                
                {/* FAQ Section */}
                {/* <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-10"
                >
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">
                    <span className="text-orange-600">FAQ</span> - Pertanyaan Umum
                  </h3>
                  
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div 
                        key={index} 
                        className="bg-white shadow-md border border-gray-100 rounded-xl overflow-hidden"
                      >
                        <details className="group">
                          <summary className="flex items-center justify-between cursor-pointer p-5">
                            <h4 className="text-lg font-medium text-gray-900">{faq.question}</h4>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-orange-500 group-open:rotate-180 transition-transform duration-300"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </summary>
                          <div className="p-5 pt-0 border-t border-gray-100">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        </details>
                      </div>
                    ))}
                  </div>
                </motion.div> */}
              </div>
              
              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2"
              >
                <div className="bg-white shadow-lg border border-gray-100 rounded-xl p-8 relative overflow-hidden">
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-orange-500/10 rounded-full blur-[50px]"></div>
                  <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-orange-500/5 rounded-full blur-[50px]"></div>
                  
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Kirim Pesan</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-gray-600 text-sm">
                        Nama Lengkap
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full py-3 px-5 pl-12 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-gray-800 placeholder:text-gray-400"
                          placeholder="Masukkan nama lengkap"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block mb-2 text-gray-600 text-sm">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full py-3 px-5 pl-12 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-gray-800 placeholder:text-gray-400"
                          placeholder="Masukkan alamat email"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block mb-2 text-gray-600 text-sm">
                        Subjek
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full py-3 px-5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-gray-800 placeholder:text-gray-400 appearance-none"
                      >
                        <option value="" disabled className="bg-white">Pilih subjek</option>
                        <option value="Informasi Pendaftaran" className="bg-white">Informasi Pendaftaran</option>
                        <option value="Informasi Biaya" className="bg-white">Informasi Biaya</option>
                        <option value="Kerjasama" className="bg-white">Kerjasama</option>
                        <option value="Karir" className="bg-white">Karir & Lowongan Kerja</option>
                        <option value="Lainnya" className="bg-white">Lainnya</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block mb-2 text-gray-600 text-sm">
                        Pesan
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                          <MessageSquare className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="w-full py-3 px-5 pl-12 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-gray-800 placeholder:text-gray-400"
                          placeholder="Masukkan pesan Anda"
                        ></textarea>
                      </div>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        disabled={formStatus === 'loading'}
                        className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center"
                      >
                        {formStatus === 'loading' ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Kirim Pesan
                          </>
                        )}
                      </button>
                      
                      {formStatus === 'success' && (
                        <div className="mt-4 py-3 px-4 bg-green-100 border border-green-200 rounded-lg text-green-700 text-sm">
                          Pesan Anda berhasil terkirim. Terima kasih telah menghubungi kami.
                        </div>
                      )}
                      
                      {formStatus === 'error' && (
                        <div className="mt-4 py-3 px-4 bg-red-100 border border-red-200 rounded-lg text-red-700 text-sm">
                          Terjadi kesalahan. Silakan coba lagi atau hubungi kami melalui email/telepon.
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default Contact; 