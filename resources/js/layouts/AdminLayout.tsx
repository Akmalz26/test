import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface PageProps {
  auth: {
    user: User
  };
  [key: string]: any;
}

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth } = usePage<PageProps>().props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Routing aktif
  const isActive = (path: string) => {
    return window.location.pathname.startsWith(path);
  };

  const isExactActive = (path: string) => {
    return window.location.pathname === path;
  };

  // Get current page name for breadcrumb
  const getPageName = () => {
    const path = window.location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/ppdb/settings')) return 'Pengaturan PPDB';
    if (path.includes('/ppdb/dashboard')) return 'Dashboard PPDB';
    if (path.includes('/ppdb')) return 'PPDB';
    if (path.includes('/users')) return 'Pengguna';
    if (path.includes('/gallery')) return 'Galeri';
    if (path.includes('/news')) return 'Berita';
    if (path.includes('/teachers')) return 'Guru';
    if (path.includes('/extracurriculars')) return 'Ekstrakurikuler';
    return 'Dashboard';
  };

  return (
    <div className="m-0 font-sans text-base antialiased font-normal leading-default bg-gray-50 text-slate-500 min-h-screen">
      {/* Background gradient - extended for better coverage */}
      <div className="absolute w-full bg-gradient-to-br from-orange-500 to-orange-600 min-h-80"></div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm xl:hidden transition-opacity duration-300"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-all duration-300 bg-white border-0 shadow-2xl max-w-64 z-50 rounded-2xl ${sidebarOpen
            ? 'translate-x-0 ml-4'
            : '-translate-x-full xl:translate-x-0 xl:ml-6 xl:left-0'
          }`}
      >
        {/* Logo */}
        <div className="h-19">
          <i
            className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden"
            onClick={closeSidebar}
          ></i>
          <Link
            href="/admin/dashboard"
            className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700"
          >
            <img
              src="/assets/images/logo.png"
              className="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8"
              alt="SMK IT Baitul Aziz"
            />
            <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">
              SMK IT Admin
            </span>
          </Link>
        </div>

        <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

        {/* Navigation */}
        <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
          <ul className="flex flex-col pl-0 mb-0">
            {/* Dashboard */}
            <li className="mt-0.5 w-full">
              <Link
                href="/admin/dashboard"
                className={`py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors ${isExactActive('/admin/dashboard')
                  ? 'bg-orange-500/13 font-semibold text-slate-700 rounded-lg'
                  : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <i className={`relative top-0 text-sm leading-normal ni ni-tv-2 ${isExactActive('/admin/dashboard') ? 'text-orange-500' : 'text-slate-400'}`}></i>
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Dashboard</span>
              </Link>
            </li>

            {/* PPDB */}
            <li className="mt-0.5 w-full">
              <Link
                href="/admin/ppdb"
                className={`py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors ${isActive('/admin/ppdb')
                  ? 'bg-orange-500/13 font-semibold text-slate-700 rounded-lg'
                  : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <i className={`relative top-0 text-sm leading-normal ni ni-single-copy-04 ${isActive('/admin/ppdb') ? 'text-orange-500' : 'text-slate-400'}`}></i>
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">PPDB</span>
              </Link>
            </li>

            {/* PPDB Submenu */}
            {isActive('/admin/ppdb') && (
              <li className="w-full">
                <ul className="ml-10 space-y-1">
                  <li>
                    <Link
                      href="/admin/ppdb/dashboard"
                      className={`py-1.5 text-xs my-0 flex items-center whitespace-nowrap px-4 transition-colors ${isActive('/admin/ppdb/dashboard') ? 'text-orange-500 font-semibold' : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                      <i className="mr-2 fas fa-chart-pie text-xs"></i>
                      Dashboard PPDB
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/ppdb"
                      className={`py-1.5 text-xs my-0 flex items-center whitespace-nowrap px-4 transition-colors ${isExactActive('/admin/ppdb') ? 'text-orange-500 font-semibold' : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                      <i className="mr-2 fas fa-users text-xs"></i>
                      Daftar Pendaftar
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/ppdb/settings"
                      className={`py-1.5 text-xs my-0 flex items-center whitespace-nowrap px-4 transition-colors ${isActive('/admin/ppdb/settings') ? 'text-orange-500 font-semibold' : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                      <i className="mr-2 fas fa-cog text-xs"></i>
                      Pengaturan PPDB
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            {/* Gallery */}
            <li className="mt-0.5 w-full">
              <Link
                href="/admin/gallery"
                className={`py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors ${isActive('/admin/gallery')
                  ? 'bg-orange-500/13 font-semibold text-slate-700 rounded-lg'
                  : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <i className={`relative top-0 text-sm leading-normal ni ni-image ${isActive('/admin/gallery') ? 'text-emerald-500' : 'text-slate-400'}`}></i>
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Galeri</span>
              </Link>
            </li>

            {/* News */}
            <li className="mt-0.5 w-full">
              <Link
                href="/admin/news"
                className={`py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors ${isActive('/admin/news')
                  ? 'bg-orange-500/13 font-semibold text-slate-700 rounded-lg'
                  : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <i className={`relative top-0 text-sm leading-normal ni ni-paper-diploma ${isActive('/admin/news') ? 'text-cyan-500' : 'text-slate-400'}`}></i>
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Berita</span>
              </Link>
            </li>

            {/* Extracurriculars */}
            <li className="mt-0.5 w-full">
              <Link
                href="/admin/extracurriculars"
                className={`py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors ${isActive('/admin/extracurriculars')
                  ? 'bg-orange-500/13 font-semibold text-slate-700 rounded-lg'
                  : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <i className={`relative top-0 text-sm leading-normal ni ni-trophy ${isActive('/admin/extracurriculars') ? 'text-red-500' : 'text-slate-400'}`}></i>
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Ekstrakurikuler</span>
              </Link>
            </li>

            {/* Divider */}
            <li className="w-full mt-4">
              <h6 className="pl-6 ml-2 text-xs font-bold leading-tight uppercase opacity-60">
                Manajemen
              </h6>
            </li>

            {/* Users */}
            <li className="mt-0.5 w-full">
              <Link
                href="/admin/users"
                className={`py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors ${isActive('/admin/users')
                  ? 'bg-orange-500/13 font-semibold text-slate-700 rounded-lg'
                  : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <i className={`relative top-0 text-sm leading-normal ni ni-single-02 ${isActive('/admin/users') ? 'text-slate-700' : 'text-slate-400'}`}></i>
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Pengguna</span>
              </Link>
            </li>

            {/* Teachers */}
            <li className="mt-0.5 w-full">
              <Link
                href="/admin/teachers"
                className={`py-2.7 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors ${isActive('/admin/teachers')
                  ? 'bg-orange-500/13 font-semibold text-slate-700 rounded-lg'
                  : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                  <i className={`relative top-0 text-sm leading-normal ni ni-hat-3 ${isActive('/admin/teachers') ? 'text-blue-500' : 'text-slate-400'}`}></i>
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">Guru</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
        {/* Navbar */}
        <nav className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start">
          <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
            <nav>
              {/* Breadcrumb */}
              <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
                <li className="text-sm leading-normal">
                  <a className="text-white opacity-50" href="#">Admin</a>
                </li>
                <li className="text-sm pl-2 capitalize leading-normal text-white before:float-left before:pr-2 before:text-white before:content-['/']">
                  {getPageName()}
                </li>
              </ol>
              <h6 className="mb-0 font-bold text-white capitalize">{getPageName()}</h6>
            </nav>

            <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
              <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full ml-auto">
                {/* Mobile menu button */}
                <li className="flex items-center xl:hidden">
                  <button
                    onClick={toggleSidebar}
                    className="block p-0 text-sm text-white transition-all ease-nav-brand"
                  >
                    <div className="w-4.5 overflow-hidden">
                      <i className="ease mb-0.75 relative block h-0.5 rounded-sm bg-white transition-all"></i>
                      <i className="ease mb-0.75 relative block h-0.5 rounded-sm bg-white transition-all"></i>
                      <i className="ease relative block h-0.5 rounded-sm bg-white transition-all"></i>
                    </div>
                  </button>
                </li>

                {/* User dropdown */}
                <li className="relative flex items-center px-4">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center p-0 text-sm text-white transition-all ease-nav-brand"
                  >
                    <i className="fa fa-user mr-2"></i>
                    <span className="hidden sm:inline">{auth.user.name}</span>
                    <i className="fa fa-chevron-down ml-2 text-xs"></i>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <Link
                        href="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <i className="fa fa-home mr-2"></i>
                        Ke Website
                      </Link>
                      <Link
                        href="/profile/edit"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <i className="fa fa-user-cog mr-2"></i>
                        Profil
                      </Link>
                      <hr className="my-1" />
                      <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <i className="fa fa-sign-out-alt mr-2"></i>
                        Logout
                      </Link>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="w-full px-6 py-6 mx-auto">
          {children}
        </div>

        {/* Footer */}
        <footer className="pt-4">
          <div className="w-full px-6 mx-auto">
            <div className="flex flex-wrap items-center -mx-3 lg:justify-between">
              <div className="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
                <div className="text-sm leading-normal text-center text-slate-500 lg:text-left">
                  © {new Date().getFullYear()}, SMK IT Baitul Aziz
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default AdminLayout;