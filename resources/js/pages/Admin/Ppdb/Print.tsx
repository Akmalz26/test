import React, { useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';

export default function PpdbPrint({ auth, ppdb }: { auth: any, ppdb: any }) {
  const printRef = useRef(null);

  useEffect(() => {
    // Auto print saat halaman dimuat
    if (ppdb) {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [ppdb]);

  // Jika tidak ada data pendaftaran
  if (!ppdb) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-lg mx-auto p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-8">
            Data pendaftaran SPMB tidak ditemukan atau Anda tidak memiliki akses.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-medium transition-all duration-300"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  // Ambil tahun akademik dari data atau tahun sekarang
  const tahunAkademik = ppdb.tahun_pelajaran || `${new Date().getFullYear()} - ${new Date().getFullYear() + 1}`;
  const tanggalLahir = ppdb.tanggal_lahir ? new Date(ppdb.tanggal_lahir) : new Date();

  return (
    <>
      <Head title="Cetak Formulir Pendaftaran SPMB - SMK IT Baitul Aziz" />

      <div className="print:p-0 p-8 bg-white text-black min-h-screen font-serif" ref={printRef}>
        {/* Hanya tampilkan tombol kembali saat mode preview (tidak print) */}
        <div className="mb-8 print:hidden">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 text-sm font-medium transition-all duration-300 mr-4"
          >
            Kembali
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white text-sm font-medium transition-all duration-300"
          >
            Cetak Formulir
          </button>
        </div>

        <div className="max-w-4xl mx-auto bg-white text-[12px]">
          {/* Header dengan logo dan alamat */}
          <div className="border-b-2 border-black mb-2">
            <div className="text-center pb-2">
              <div className="flex justify-center items-center mb-1">
                <div className="p-1 mb-5 ml-16">
                  <img
                    src="/assets/images/logo-ba.png"
                    alt="Logo SMK IT Baitul Aziz"
                    className="h-24 w-auto"
                  />
                </div>
                <div className="text-center flex-1">
                  <h1 className="text-xl font-bold text-black mb-0.5">YAYASAN BAITUL AZIZ</h1>
                  <h2 className="text-[30px] font-bold text-black mb-0.5">SMK IT BAITUL AZIZ</h2>
                  <p className="text-[10px] font-bold text-black leading-none mb-0.5">Bidang Studi Keahlian : Teknologi Informasi dan Komunikasi</p>
                  <p className="text-[10px] font-bold text-black leading-none mb-0.5">Program Studi Keahlian : Teknik Komputer dan Informatika</p>
                  <p className="text-[10px] font-bold text-black leading-none mb-0.5">Kompetensi Keahlian : Rekayasa Perangkat Lunak</p>
                  <p className="text-[10px] text-black leading-none mb-0.5">Jl. Pesantren Baitul Aziz Kp. Sukahaji No. 44 Desa Neglasari Kec. Majalaya Kab. Bandung 40382</p>
                  <p className="text-[10px] text-black leading-none mb-0.5">Telp. 022-595 0175 - website : www.smkitbaitulaziz.sch.id - email : smkitbaitulaziz@gmail.com</p>
                </div>
                <div className="p-1 mb-5 mr-16">
                  <img
                    src="/assets/images/logo.png"
                    alt="Logo SMK"
                    className="h-24 w-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Judul Formulir */}
          <div className="text-center mb-3">
            <h2 className="text-base font-bold text-black">FORMULIR PENDAFTARAN</h2>
            <h3 className="text-sm font-bold text-black">CALON SISWA BARU TAHUN PELAJARAN {tahunAkademik}</h3>
          </div>

          {/* Form Isian */}
          <div className="mb-3">
            <table className="w-full mb-2 text-[12px]">
              <tbody>
                <tr>
                  <td className="w-32 align-top">Tahun Pelajaran</td>
                  <td className="w-2 align-top">:</td>
                  <td className="border-b border-black">{tahunAkademik}</td>
                </tr>
                <tr>
                  <td className="w-32 align-top">Daftar Nomor</td>
                  <td className="w-2 align-top">:</td>
                  <td className="border-b border-black">{ppdb.nomor_pendaftaran}</td>
                </tr>
                <tr>
                  <td className="w-32 align-top">Pesantren</td>
                  <td className="w-2 align-top">:</td>
                  <td>{ppdb.is_pesantren ? 'YA' : 'TIDAK'}</td>
                </tr>
              </tbody>
            </table>

            <div className="italic text-[10px] mb-2">Diisi dengan menggunakan huruf kapital/cetak</div>

            {/* DATA SISWA */}
            <div className="mb-3">
              <h3 className="font-bold mb-1 text-[12px]">A. DATA SISWA</h3>

              <table className="w-full text-[12px]">
                <tbody>
                  <tr>
                    <td className="w-32 align-top py-0.5">Nama Lengkap</td>
                    <td className="w-2 align-top py-0.5">:</td>
                    <td className="border-b border-black py-0.5">{ppdb.nama_lengkap?.toUpperCase()}</td>
                  </tr>
                  <tr>
                    <td className="w-32 align-top py-0.5">Tempat Tgl. Lahir</td>
                    <td className="w-2 align-top py-0.5">:</td>
                    <td className="border-b border-black py-0.5">
                      {ppdb.tempat_lahir?.toUpperCase()}, {' '}
                      {tanggalLahir.getDate()}-
                      {tanggalLahir.getMonth() + 1}-
                      {tanggalLahir.getFullYear()}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-32 align-top py-0.5">Jenis Kelamin</td>
                    <td className="w-2 align-top py-0.5">:</td>
                    <td className="border-b border-black py-0.5">
                      {ppdb.jenis_kelamin === 'L' ? 'LAKI-LAKI' : 'PEREMPUAN'}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-32 align-top py-0.5">Alamat</td>
                    <td className="w-2 align-top py-0.5">:</td>
                    <td className="border-b border-black py-0.5">
                      {ppdb.alamat?.toUpperCase()}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="py-0.5">
                      RT : {ppdb.rt} &nbsp;&nbsp;&nbsp; RW : {ppdb.rw} &nbsp;&nbsp;&nbsp; Desa : {ppdb.desa}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="py-0.5">
                      Kec. : {ppdb.kecamatan} &nbsp;&nbsp;&nbsp; Kab. : {ppdb.kabupaten} &nbsp;&nbsp;&nbsp; Kode Pos : {ppdb.kode_pos}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-32 align-top py-0.5">NISN</td>
                    <td className="w-2 align-top py-0.5">:</td>
                    <td className="border-b border-black py-0.5">{ppdb.nisn || "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DATA SEKOLAH */}
            <div className="mb-3">
              <h3 className="font-bold mb-1 text-[12px]">B. DATA SEKOLAH / PENDIDIKAN TERAKHIR</h3>

              <table className="w-full text-[12px]">
                <tbody>
                  <tr>
                    <td className="w-32 align-top py-0.5">Sekolah Asal</td>
                    <td className="w-2 align-top py-0.5">:</td>
                    <td className="border-b border-black py-0.5">{ppdb.sekolah_asal?.toUpperCase() || "-"}</td>
                  </tr>
                  <tr>
                    <td className="w-32 align-top py-0.5">Alamat</td>
                    <td className="w-2 align-top py-0.5">:</td>
                    <td className="border-b border-black py-0.5">{ppdb.alamat_sekolah?.toUpperCase() || "-"}</td>
                  </tr>
                  <tr>
                    <td className="w-32 align-top py-0.5">Telepon</td>
                    <td className="w-2 align-top py-0.5">:</td>
                    <td className="border-b border-black py-0.5">{ppdb.telepon_sekolah || "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DATA ORANG TUA */}
            <div className="mb-4">
              <h3 className="font-bold mb-1 text-[12px]">C. DATA ORANG TUA / WALI</h3>

              <table className="w-full text-[12px]">
                <tbody>
                  <tr>
                    <td className="w-32 align-top py-0.5">Nama Ayah / Wali</td>
                    <td className="w-2 align-top py-0.5">:</td>
                    <td className="border-b border-black py-0.5">{ppdb.nama_ayah?.toUpperCase() || "-"}</td>
                  </tr>
                  <tr>
                    <td className="w-32 align-top py-0.5">Nama Ibu / Wali</td>
                    <td className="w-2 align-top py-0.5">:</td>
                    <td className="border-b border-black py-0.5">{ppdb.nama_ibu?.toUpperCase() || "-"}</td>
                  </tr>
                  <tr>
                    <td className="w-32 align-top py-0.5">Pekerjaan Ayah / Wali</td>
                    <td className="w-2 align-top py-0.5">:</td>
                    <td className="border-b border-black py-0.5">{ppdb.pekerjaan_ayah?.toUpperCase() || "-"}</td>
                  </tr>
                  <tr>
                    <td className="w-32 align-top py-0.5">Pekerjaan Ibu / Wali</td>
                    <td className="w-2 align-top py-0.5">:</td>
                    <td className="border-b border-black py-0.5">{ppdb.pekerjaan_ibu?.toUpperCase() || "-"}</td>
                  </tr>
                  <tr>
                    <td className="w-32 align-top py-0.5">Alamat</td>
                    <td className="w-2 align-top py-0.5">:</td>
                    <td className="border-b border-black py-0.5">{ppdb.alamat_ortu?.toUpperCase() || "-"}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="py-0.5">
                      RT : {ppdb.rt_ortu} &nbsp;&nbsp;&nbsp; RW : {ppdb.rw_ortu} &nbsp;&nbsp;&nbsp; Desa : {ppdb.desa_ortu}
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="py-0.5">
                      Kec. : {ppdb.kecamatan_ortu} &nbsp;&nbsp;&nbsp; Kab. : {ppdb.kabupaten_ortu} &nbsp;&nbsp;&nbsp; Kode Pos : {ppdb.kode_pos_ortu}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-32 align-top py-0.5">Telepon</td>
                    <td className="w-2 align-top py-0.5">:</td>
                    <td className="py-0.5">
                      Rumah: {ppdb.telepon_rumah || "-"} &nbsp;&nbsp;&nbsp; HP: {ppdb.telepon_hp || "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Tanda Tangan & Foto */}
            <div className="flex justify-between mb-5">
              <div className="w-1/3 text-center text-[12px]">
                <div className="mb-0.5">Bandung, {new Date().getDate()} {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][new Date().getMonth()]} {new Date().getFullYear()}</div>
                <div className="mb-16">Orang Tua/Wali Siswa</div>
                <div className="font-bold">( {ppdb.nama_ayah || ppdb.nama_ibu || '.........................'} )</div>
              </div>
              <div className="border border-black h-[3.5cm] w-[2.5cm] text-center flex items-center justify-center">
                <div className="text-[10px] text-gray-500">Pas Foto 3x4</div>
              </div>

              <div className="w-1/3 text-center text-[12px]">
                <div className="mb-3">Siswa</div>
                <div className="mb-16"></div>
                <div className="font-bold">( {ppdb.nama_lengkap || '.........................'} )</div>
              </div>
            </div>

            {/* Syarat Pendaftaran */}
            <div className="mb-1">
              <h3 className="font-bold mb-1 text-center underline text-[12px]">SYARAT PENDAFTARAN</h3>

              <div className="flex">
                <div className="w-1/2 text-[11px]">
                  <ol className="list-decimal ml-5">
                    <li>Mengisi Formulir Pendaftaran</li>
                    <li>Fotocopy Rapot Terakhir</li>
                    <li>Fotocopy SKHUN SMP/Sederajat 2 Lembar</li>
                    <li>Fotocopy Ijazah SMP/Sederajat 2 Lembar</li>
                    <li>Fotocopy NISN 2 Lembar</li>
                  </ol>
                </div>
                <div className="w-1/2 text-[11px]">
                  <ol className="list-decimal ml-5" start={6}>
                    <li>Fotocopy Kartu Keluarga, Akte Kelahiran, KTP Orang Tua 2 Lembar</li>
                    <li>Fotocopy KIP/ KKS/ KPS 2 Lembar</li>
                    <li>Pas Foto berwarna 3x4 2 Lembar</li>
                    <li>Membayar uang atribut wajib saat daftar ulang</li>
                  </ol>
                </div>
              </div>

              <div className="italic font-bold text-center mt-1 text-[10px]">Persyaratan dimasukan kedalam Map Biru</div>
            </div>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          @page {
            size: portrait;
            margin: 0 !important; /* Menghilangkan margin browser */
          }
          
          body {
            font-family: "Times New Roman", Times, serif !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            margin: 0.7cm !important; /* Mengurangi margin untuk menghemat ruang */
            padding: 0 !important;
            font-variant-numeric: lining-nums !important; /* Membuat angka menggunakan font normal */
          }
          
          .font-serif {
            font-family: "Times New Roman", Times, serif !important;
            font-variant-numeric: lining-nums !important; /* Membuat angka menggunakan font normal */
          }
          
          /* Font normal untuk angka di seluruh dokumen */
          td, p, div, span, h1, h2, h3, h4, h5, h6, li {
            font-variant-numeric: lining-nums !important;
          }
          
          /* Memperkecil ukuran teks untuk memuat konten dalam satu halaman */
          .text-[12px] {
            font-size: 11px !important;
          }
          
          .text-[11px] {
            font-size: 10px !important;
          }
          
          .text-[10px] {
            font-size: 9px !important;
          }
          
          /* Mengurangi spasi vertikal */
          .mb-3 {
            margin-bottom: 0.5rem !important;
          }
          
          .mb-4 {
            margin-bottom: 0.75rem !important;
          }
          
          .py-0.5 {
            padding-top: 0.05rem !important;
            padding-bottom: 0.05rem !important;
          }
          
          /* Memastikan halaman tidak terpotong */
          .max-w-4xl {
            max-width: 100% !important;
            page-break-inside: avoid !important;
          }
          
          /* Kode khusus untuk menghilangkan header dan footer browser */
          html {
            height: 100%;
          }
          
          /* CSS untuk menyembunyikan URL dan tanggal di footer/header browser */
          body::before, body::after {
            display: none !important;
            content: none !important;
          }
        }
      `}</style>
    </>
  );
}
