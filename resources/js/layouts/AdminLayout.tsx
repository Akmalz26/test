import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Home, Settings, Users, FileText,
  LogOut, ChevronRight, LayoutDashboard,
  Bell, Search, User, Image, Newspaper,
  Activity, GraduationCap, ClipboardList
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  const { props, url } = usePage<any>();
  const { auth } = props;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Initialize sidebar state once on mount
  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    const savedState = localStorage.getItem('adminSidebarOpen');

    if (savedState !== null) {
      setSidebarOpen(savedState === 'true');
    } else {
      setSidebarOpen(isDesktop);
    }
  }, []); // Run only once on mount

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('adminSidebarOpen', String(sidebarOpen));
  }, [sidebarOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [url]);

  const navItems = [
    {
      title: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      active: url === '/admin/dashboard'
    },
    {
      title: 'SPMB',
      href: '/admin/spmb',
      icon: ClipboardList,
      active: url.startsWith('/admin/spmb') && !url.includes('settings')
    },
    {
      title: 'Berita',
      href: '/admin/news',
      icon: Newspaper,
      active: url.startsWith('/admin/news')
    },
    {
      title: 'Galeri',
      href: '/admin/gallery',
      icon: Image,
      active: url.startsWith('/admin/gallery')
    },
    {
      title: 'Ekstrakurikuler',
      href: '/admin/extracurriculars',
      icon: Activity,
      active: url.startsWith('/admin/extracurriculars')
    },
    {
      title: 'Guru / Staff',
      href: '/admin/teachers',
      icon: GraduationCap,
      active: url.startsWith('/admin/teachers')
    },
    {
      title: 'Pengguna',
      href: '/admin/users',
      icon: Users,
      active: url.startsWith('/admin/users')
    },
    {
      title: 'Pengaturan SPMB',
      href: '/admin/spmb/settings',
      icon: Settings,
      active: url.startsWith('/admin/spmb/settings')
    },
  ];

  const sidebarVariants = {
    open: { width: '280px', transition: { type: 'spring', damping: 20 } },
    closed: { width: '80px', transition: { type: 'spring', damping: 20 } }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background Mesh is handled in global CSS, but we can add overlay if needed */}

      {/* Sidebar - Desktop */}
      <motion.aside
        initial={false}
        animate={sidebarOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
        className={cn(
          "fixed left-4 top-4 bottom-4 z-40 hidden md:flex flex-col",
          "bg-white/40 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl",
          "overflow-hidden transition-all duration-300"
        )}
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center justify-center border-b border-white/10 relative">
          <Link href="/" className="flex items-center space-x-2 px-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col"
                >
                  <span className="font-bold text-gray-800 text-lg leading-tight">Admin</span>
                  <span className="text-xs text-orange-600 font-medium tracking-wider">PANEL</span>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg text-gray-500 hover:text-orange-500 hover:scale-110 transition-all z-50 md:flex hidden"
          >
            <ChevronRight className={cn("w-3 h-3 transition-transform", sidebarOpen ? "rotate-180" : "0")} />
          </button>
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-2 custom-scrollbar">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-3 rounded-xl transition-all duration-200 relative overflow-hidden",
                item.active
                  ? "text-orange-600 font-medium shadow-md bg-white/60"
                  : "text-gray-600 hover:text-orange-600 hover:bg-white/40"
              )}
            >
              {item.active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-r-full"
                />
              )}
              <item.icon className={cn("w-6 h-6 flex-shrink-0 transition-colors", item.active ? "text-orange-600" : "text-gray-400 group-hover:text-orange-500")} />

              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-3 whitespace-nowrap"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>

              {!sidebarOpen && (
                <div className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                  {item.title}
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Footer / User Profile */}
        <div className="p-4 border-t border-white/10">
          <div className={cn(
            "flex items-center p-2 rounded-xl bg-orange-50/50 border border-orange-100 transition-all cursor-pointer hover:bg-orange-100/50",
            sidebarOpen ? "justify-start" : "justify-center"
          )}>
            <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 font-bold text-sm">
              {auth.user?.name?.[0] || 'A'}
            </div>
            {sidebarOpen && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-semibold text-gray-700 truncate">{auth.user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{auth.user?.email}</p>
              </div>
            )}
            {sidebarOpen && (
              <Link href="/logout" method="post" as="button" className="ml-auto text-gray-400 hover:text-red-500 transition-colors">
                <LogOut className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 w-64 bg-white/80 backdrop-blur-xl z-50 p-4 shadow-2xl md:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-xl text-gray-800">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 bg-gray-100 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                {navItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-xl transition-all",
                      item.active
                        ? "bg-orange-50 text-orange-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.title}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300",
          sidebarOpen ? "md:ml-[300px]" : "md:ml-[100px]"
        )}
      >
        {/* Header */}
        <header
          className={cn(
            "sticky top-0 z-30 px-6 py-4 transition-all duration-300",
            scrolled ? "bg-white/60 backdrop-blur-md shadow-sm" : "bg-transparent"
          )}
        >
          <div className="flex justify-between items-center max-w-7xl mx-auto md:mx-0">
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 bg-white/50 backdrop-blur-md rounded-xl border border-white/20 shadow-sm"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 md:flex hidden items-center bg-white/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 hover:bg-white/60 transition-colors w-full max-w-md ml-4 shadow-sm">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Cari sesuatu..."
                className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400 focus:ring-0"
              />
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 bg-white/40 backdrop-blur-md rounded-xl hover:bg-white/60 transition-colors border border-white/20 shadow-sm">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
