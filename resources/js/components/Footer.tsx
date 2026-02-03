import React from 'react';
import { Link } from '@inertiajs/react';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 relative pt-16 pb-8 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] opacity-5" />
      
      {/* Gradient overlay */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white to-transparent" />
      
      {/* Orange glow */}
      <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-orange-500/5 blur-[100px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1 - About */}
          <div>
            <div className="mb-6">
              <Link href="/">
                <div className="font-bold text-2xl text-gray-800 tracking-wide flex items-center">
                  <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">SMK IT</span>
                  <span className="ml-1 relative">
                    Baitul Aziz
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-orange-600"></span>
                  </span>
                </div>
              </Link>
            </div>
            <p className="text-gray-600 mb-6">
            Membentuk Generasi Unggul yang Berakhlak Mulia dan Terampil di Bidang Teknologi Informasi            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/baitulaziz.indonesia/" className="text-gray-500 hover:text-orange-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.youtube.com/channel/UCmhFZ8RI85ZTVAQTDW2TFtg" className="text-gray-500 hover:text-orange-500 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="https://www.instagram.com/baitulaziz.id" className="text-gray-500 hover:text-orange-500 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-gray-800 font-semibold text-lg mb-6">Link Cepat</h3>
            <ul className="space-y-3">
              {[
                { text: 'Beranda', href: '/' },
                { text: 'Tentang Kami', href: '/profil' },
                { text: 'Program Keahlian', href: '/kompetensi' },
                { text: 'Fasilitas', href: '/fasilitas' },
                { text: 'Galeri', href: '/gallery' },
                { text: 'Kontak', href: '/kontak' },
              ].map((link, i) => (
                <li key={i}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-orange-400 hover:translate-x-1 transition-all inline-flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Programs */}
          <div>
            <h3 className="text-gray-800 font-semibold text-lg mb-6">Program Keahlian</h3>
            <ul className="space-y-4">
              {[
                { text: 'PPLG', href: '/kompetensi/pplg' },
              ].map((program, i) => (
                <li key={i}>
                  <a 
                    href={program.href}
                    className="text-gray-600 hover:text-orange-400 transition-colors group flex items-start"
                  >
                    <div className="w-5 h-0.5 bg-orange-500 mt-2 mr-2 group-hover:w-6 transition-all"></div>
                    <span>{program.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-gray-800 font-semibold text-lg mb-6">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-orange-500 mt-1 mr-3 shrink-0" size={18} />
                <span className="text-gray-600">Jl. Contoh No. 123, Kecamatan, Kota, Provinsi, Indonesia</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-orange-500 mr-3 shrink-0" size={18} />
                <span className="text-gray-600">(021) 1234-5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-orange-500 mr-3 shrink-0" size={18} />
                <span className="text-gray-600">info@smkitbaitulaziz.sch.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} SMK IT Baitul Aziz. Hak Cipta Dilindungi.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-800 text-sm transition-colors">Kebijakan Privasi</a>
              <a href="#" className="text-gray-500 hover:text-gray-800 text-sm transition-colors">Syarat & Ketentuan</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 