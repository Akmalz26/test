import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, LogOut, User } from 'lucide-react';

type NavItem = {
  text: string;
  href: string;
  dropdown?: boolean;
  items?: { text: string; href: string }[];
  hasChildren?: boolean;
  isChild?: boolean;
};

interface SharedData {
  auth: {
    user: {
      name: string;
      email: string;
      role?: string;
    } | null;
  };
  [key: string]: any; // Menambahkan index signature
}

const Navbar = () => {
  const { auth } = usePage<SharedData>().props;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil Sekolah', href: '/profil-sekolah' },
    { name: 'Program Keahlian', href: '/program-keahlian' },
    { name: 'Ekstrakurikuler', href: '/ekstrakurikuler' },
    { name: 'Galeri', href: '/galeri' },
    { name: 'Berita', href: '/berita' },
    { name: 'PPDB', href: '/ppdb' },
    { name: 'Kontak', href: '/kontak' },
  ];

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-3 px-6 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-orange-500/20 shadow-lg shadow-orange-500/10'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <div className="font-bold text-2xl text-orange-600 tracking-wide flex items-center">
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">SMK IT</span>
              <span className="ml-1 relative">
                Baitul Aziz
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-orange-600"></span>
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1 text-sm">
          {[
            { text: 'Home', href: '/' },
            { text: 'Profil Sekolah', href: '/profil-sekolah' },
            { text: 'Kompetensi Keahlian', href: '/program-keahlian' },
            { text: 'Ekstrakurikuler', href: '/ekstrakurikuler' },
            // { text: 'Struktur Organisasi', href: '/struktur-organisasi' },
            { text: 'Gallery', href: '/gallery' },
            { text: 'Berita', href: '/berita' },
            { text: 'PPDB', href: '/ppdb' },
            { text: 'Kontak', href: '/kontak' },
          ].map((item: NavItem, i) => {
            const isActive = (typeof window !== 'undefined' && window.location.pathname === item.href) || (usePage && usePage().url === item.href);
            return item.dropdown ? (
              <div key={i} className="relative">
                <motion.div
                  custom={i}
                  variants={itemVariants}
                  className="group"
                >
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="px-3 py-1.5 rounded-lg transition-all flex items-center text-gray-700 hover:text-orange-600 group-hover:bg-orange-500/10"
                  >
                    <span>{item.text}</span>
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </button>

                  <div className={`absolute top-full left-0 mt-1 py-2 w-56 bg-white/95 backdrop-blur-md border border-orange-500/20 rounded-lg shadow-lg shadow-orange-500/10 transition-all duration-300 ${dropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    {item.items?.map((subItem, j) => (
                      <Link
                        key={j}
                        href={subItem.href}
                        className="block px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-500/10 transition-all"
                      >
                        {subItem.text}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            ) : (
              <motion.div
                key={i}
                custom={i}
                variants={itemVariants}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'px-3 py-1.5 rounded-lg transition-all text-gray-700 hover:text-orange-600 hover:bg-orange-500/10',
                    isActive && 'bg-orange-500 text-white shadow-md pointer-events-none'
                  )}
                >
                  {item.text}
                </Link>
              </motion.div>
            )
          })}

          {auth.user ? (
            <div className="relative">
              <motion.div
                variants={itemVariants}
                className="group"
              >
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="px-3 py-1.5 bg-orange-500 rounded-lg transition-all flex items-center text-white hover:bg-orange-600"
                >
                  <span>{auth.user.name.split(' ')[0]}</span>
                  <ChevronDown className="ml-1 h-3 w-3" />
                </button>

                <div className={`absolute top-full right-0 mt-1 py-2 w-48 bg-white/95 backdrop-blur-md border border-orange-500/20 rounded-lg shadow-lg shadow-orange-500/10 transition-all duration-300 ${userDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  {auth.user.role === 'admin' && (
                    <Link
                      href="/admin/dashboard"
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-500/10 transition-all"
                    >
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        <span>Admin Dashboard</span>
                      </div>
                    </Link>
                  )}
                  <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-500/10 transition-all"
                  >
                    <div className="flex items-center">
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Logout</span>
                    </div>
                  </Link>
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              variants={itemVariants}
            >
              <Link
                href="/login"
                className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 transition-all text-white"
              >
                Login
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile Navigation Button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-orange-600 p-2 rounded-lg hover:bg-orange-500/10 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
        className={`lg:hidden overflow-hidden bg-white/95 backdrop-blur-md mt-4 rounded-lg border border-orange-500/20`}
      >
        <div className="px-4 py-4 space-y-2">
          {/* Tampilkan menu utama yang sama dengan desktop */}
          {[
            { text: 'Home', href: '/' },
            { text: 'Profil Sekolah', href: '/profil-sekolah' },
            { text: 'Kompetensi Keahlian', href: '/program-keahlian' },
            { text: 'Ekstrakurikuler', href: '/ekstrakurikuler' },
            { text: 'Struktur Organisasi', href: '/struktur-organisasi' },
            { text: 'Gallery', href: '/gallery' },
            { text: 'Berita', href: '/berita' },
            { text: 'PPDB', href: '/ppdb' },
            { text: 'Kontak', href: '/kontak' },
          ].map((item, i) => {
            const isActive = (typeof window !== 'undefined' && window.location.pathname === item.href) || (usePage && usePage().url === item.href);
            return (
              <div key={i}>
                <Link
                  href={item.href}
                  className={cn(
                    'block py-2.5 px-3 rounded-lg transition-all text-gray-700 hover:text-orange-600 hover:bg-orange-500/10',
                    isActive && 'bg-orange-500 text-white shadow-md pointer-events-none'
                  )}
                >
                  {item.text}
                </Link>
              </div>
            );
          })}

          {/* Area login/user */}
          <div className="pt-4 mt-4 border-t border-orange-500/20">
            {auth.user ? (
              <>
                <div className="bg-white/30 rounded-lg px-3 py-3 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-500/30 flex items-center justify-center mr-3">
                    <span className="text-orange-600 font-bold">{auth.user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-orange-600 font-medium">
                      {auth.user.name}
                    </div>
                    <div className="text-gray-700 text-xs">
                      {auth.user.email}
                    </div>
                  </div>
                </div>

                <Link
                  href="/logout"
                  method="post"
                  as="button"
                  className="mt-3 flex w-full items-center justify-center text-center py-2.5 px-3 rounded-lg bg-orange-500 hover:bg-orange-600 transition-all text-white"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="block py-2.5 px-3 text-center rounded-lg bg-orange-500 hover:bg-orange-600 transition-all text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;