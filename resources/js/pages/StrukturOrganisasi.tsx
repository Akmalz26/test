import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Users,
  Mail,
  Phone,
  GraduationCap,
  Award,
  BookOpen
} from 'lucide-react';

interface Teacher {
  id: number;
  name: string;
  nip: string | null;
  position: string;
  subject: string | null;
  photo: string | null;
  photo_url: string | null;
  email: string | null;
  phone: string | null;
  education: string | null;
  order: number;
  type: 'struktur' | 'guru';
}

interface Props {
  struktur: Teacher[];
  teachers: Teacher[];
}

export default function StrukturOrganisasi({ struktur, teachers }: Props) {
  return (
    <>
      <Head title="Struktur Organisasi" />
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
              <Users className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Struktur Organisasi
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Mengenal lebih dekat tim pengelola dan pendidik SMKIT Baitul Aziz
            </p>
          </div>
        </div>
      </section>

      {/* Struktur Organisasi Section */}
      {struktur && struktur.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Struktur Organisasi
              </h2>
              <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {struktur.map((person) => (
                <div
                  key={person.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="relative h-64 bg-gradient-to-br from-orange-100 to-orange-50 overflow-hidden">
                    {person.photo_url ? (
                      <img
                        src={person.photo_url}
                        alt={person.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="w-24 h-24 text-orange-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-1">{person.name}</h3>
                      <p className="text-sm text-orange-100">{person.nip || '-'}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-orange-600 font-semibold mb-4">
                      <Award className="w-5 h-5" />
                      <span>{person.position}</span>
                    </div>

                    {person.education && (
                      <div className="flex items-start gap-2 text-gray-600 mb-3">
                        <GraduationCap className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{person.education}</span>
                      </div>
                    )}

                    {person.email && (
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <a
                          href={`mailto:${person.email}`}
                          className="text-sm hover:text-orange-600 transition-colors"
                        >
                          {person.email}
                        </a>
                      </div>
                    )}

                    {person.phone && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <a
                          href={`tel:${person.phone}`}
                          className="text-sm hover:text-orange-600 transition-colors"
                        >
                          {person.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Daftar Guru Section */}
      {teachers && teachers.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Daftar Tenaga Pendidik
              </h2>
              <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Guru-guru berkualitas yang siap membimbing dan mendidik generasi terbaik
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-50 overflow-hidden">
                    {teacher.photo_url ? (
                      <img
                        src={teacher.photo_url}
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="w-16 h-16 text-orange-300" />
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1">{teacher.name}</h3>
                    {teacher.nip && (
                      <p className="text-xs text-gray-500 mb-2">NIP: {teacher.nip}</p>
                    )}

                    <div className="flex items-start gap-2 text-orange-600 text-sm mb-2">
                      <Award className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{teacher.position}</span>
                    </div>

                    {teacher.subject && (
                      <div className="flex items-start gap-2 text-gray-600 text-sm">
                        <BookOpen className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{teacher.subject}</span>
                      </div>
                    )}

                    {teacher.education && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-start gap-2 text-gray-600 text-xs">
                          <GraduationCap className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{teacher.education}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {(!struktur || struktur.length === 0) && (!teachers || teachers.length === 0) && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Users className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Data Belum Tersedia
            </h3>
            <p className="text-gray-600">
              Informasi struktur organisasi dan daftar guru akan segera ditampilkan.
            </p>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Bergabunglah Bersama Kami
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Jadilah bagian dari keluarga besar SMKIT Baitul Aziz
          </p>
          <a
            href="/ppdb"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Daftar Sekarang
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

