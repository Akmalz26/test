import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, LogOut, User, Settings } from 'lucide-react';

interface SharedData {
  auth: {
    user: {
      name: string;
      email: string;
      role?: string;
    } | null;
  };
  [key: string]: any;
}

const Navbar = () => {
  const { props, url } = usePage<SharedData>();
  const { auth } = props;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  interface NavItem {
    text: string;
    href: string;
    dropdown?: boolean;
    items?: { text: string; href: string }[];
  }

  const navItems: NavItem[] = [
    { text: 'Home', href: '/' },
    { text: 'Profil Sekolah', href: '/profil-sekolah' },
    // {
    //   text: 'Profil',
    //   href: '#',
    //   dropdown: true,
    //   items: [
    //     { text: 'Profil Sekolah', href: '/profil-sekolah' },
    //     { text: 'Struktur Organisasi', href: '/struktur-organisasi' },
    //     { text: 'Visi Misi', href: '/visi-misi' },
    //   ]
    // },
    { text: 'Program Keahlian', href: '/program-keahlian' },
    { text: 'Ekstrakurikuler', href: '/ekstrakurikuler' },
    { text: 'Galeri', href: '/gallery' },
    { text: 'SPMB', href: '/spmb' },
    { text: 'Berita', href: '/berita' },
    { text: 'Kontak', href: '/kontak' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: 'spring', damping: 20 }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 flex justify-center pt-6 px-4 transition-all duration-300',
          isScrolled ? 'pt-4' : 'pt-6'
        )}
      >
        <div
          className={cn(
            "relative flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
            isScrolled
              ? "w-[90%] md:w-[85%] lg:w-[1200px] bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl shadow-orange-500/5 rounded-full py-3 px-6"
              : "w-full max-w-7xl bg-transparent py-4 px-4"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <img src="/assets/images/logo.png" alt="Logo" className="w-10 h-10 rounded-xl" />
            </div>
            <div className="flex flex-col">
              <span className={cn("font-bold text-lg leading-none tracking-tight transition-colors", isScrolled ? "text-gray-800" : "text-gray-800")}>
                SMK IT Baitul Aziz
              </span>
              {/* <span className="text-[10px] font-medium text-orange-600 tracking-widest uppercase">Islamic Boarding School</span> */}
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, idx) => {
              const isDropdown = !!item.dropdown;
              const isActive = isDropdown
                ? item.items?.some(sub => url.startsWith(sub.href))
                : item.href === '/'
                  ? url === '/'
                  : url.startsWith(item.href);

              const activeClasses = "text-orange-600 bg-orange-50/80 font-semibold shadow-sm ring-1 ring-orange-100";
              const inactiveClasses = "text-gray-600 hover:text-orange-600 hover:bg-orange-50/50";

              return (
                <div
                  key={idx}
                  className="relative"
                  onMouseEnter={() => isDropdown && setActiveDropdown(idx)}
                  onMouseLeave={() => isDropdown && setActiveDropdown(null)}
                >
                  {isDropdown ? (
                    <button className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1",
                      isActive ? activeClasses : inactiveClasses
                    )}>
                      {item.text}
                      <ChevronDown className={cn("w-3 h-3 transition-transform", activeDropdown === idx ? "rotate-180" : "")} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all block relative group",
                        isActive ? activeClasses : inactiveClasses
                      )}
                    >
                      {item.text}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdown && activeDropdown === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl overflow-hidden p-2"
                      >
                        {item.items?.map((subItem, subIdx) => {
                          const isSubActive = url === subItem.href || url.startsWith(subItem.href);
                          return (
                            <Link
                              key={subIdx}
                              href={subItem.href}
                              className={cn(
                                "block px-4 py-2 text-sm rounded-xl transition-colors",
                                isSubActive
                                  ? "text-orange-600 bg-orange-50 font-medium"
                                  : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                              )}
                            >
                              {subItem.text}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Side / Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {auth.user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-4 py-1.5 bg-white/50 border border-white/40 hover:bg-white/80 rounded-full transition-all shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold border border-orange-200">
                    {auth.user.name[0]}
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">{auth.user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-56 bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl p-2"
                    >
                      {auth.user.role === 'admin' && (
                        <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors">
                          <User className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      <Link href="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors">
                        <Settings className="w-4 h-4" />
                        Pengaturan Akun
                      </Link>
                      <div className="h-px bg-gray-100 my-1" />
                      <Link href="/logout" method="post" as="button" className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                        <LogOut className="w-4 h-4" />
                        Keluar
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-full shadow-lg shadow-orange-500/30 transition-all hover:shadow-orange-500/40 hover:-translate-y-0.5"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-orange-600 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-24 left-4 right-4 z-40 bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl overflow-hidden lg:hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navItems.map((item, idx) => {
                const isDropdown = !!item.dropdown;
                const isActive = isDropdown
                  ? item.items?.some(sub => url.startsWith(sub.href))
                  : item.href === '/' ? url === '/' : url.startsWith(item.href);

                return (
                  <div key={idx}>
                    {isDropdown ? (
                      <div className="flex flex-col gap-2">
                        <span className={cn(
                          "text-xs font-bold uppercase tracking-wider",
                          isActive ? "text-orange-600" : "text-gray-400"
                        )}>{item.text}</span>
                        {item.items?.map((sub, subIdx) => {
                          const isSubActive = url === sub.href || url.startsWith(sub.href);
                          return (
                            <Link
                              key={subIdx}
                              href={sub.href}
                              className={cn(
                                "pl-4 py-2 font-medium block transition-colors",
                                isSubActive ? "text-orange-600 bg-orange-50/50 rounded-lg" : "text-gray-600 hover:text-orange-600"
                              )}
                            >
                              {sub.text}
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "text-lg font-medium transition-colors block py-2",
                          isActive ? "text-orange-600 font-bold" : "text-gray-800 hover:text-orange-600"
                        )}
                      >
                        {item.text}
                      </Link>
                    )}
                  </div>
                );
              })}

              <div className="h-px bg-gray-100 my-2" />

              {auth.user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                      {auth.user.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{auth.user.name}</p>
                      <p className="text-xs text-gray-500">{auth.user.email}</p>
                    </div>
                  </div>
                  {auth.user.role === 'admin' && (
                    <Link href="/admin/dashboard" className="text-gray-600 font-medium py-2 hover:text-orange-600">Admin Dashboard</Link>
                  )}
                  <Link href="/logout" method="post" as="button" className="text-red-500 font-medium py-2 text-left">Keluar</Link>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl text-center shadow-lg shadow-orange-500/20"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;