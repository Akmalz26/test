import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';

interface PpdbSettingsProps {
    settings: {
        id: number;
        is_open: boolean;
        open_date: string | null;
        close_date: string | null;
        academic_year: string | null;
        message_closed: string | null;
    };
}

export default function PpdbSettings({ settings }: PpdbSettingsProps) {
    const { data, setData, put, processing, errors } = useForm({
        is_open: settings.is_open,
        open_date: settings.open_date || '',
        close_date: settings.close_date || '',
        academic_year: settings.academic_year || '',
        message_closed: settings.message_closed || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/admin/ppdb/settings');
    };

    return (
        <AdminLayout>
            <Head title="Pengaturan PPDB" />

            {/* Header Card */}
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border mb-6">
                <div className="flex-auto p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-orange-500 to-orange-600">
                                <i className="ni ni-settings-gear-65 text-lg text-white relative top-3"></i>
                            </div>
                            <div>
                                <h5 className="mb-1 font-bold text-slate-700">Pengaturan PPDB</h5>
                                <p className="mb-0 text-sm text-slate-500">Atur jadwal pembukaan dan penutupan pendaftaran PPDB</p>
                            </div>
                        </div>
                        <Link
                            href="/admin/ppdb"
                            className="inline-block px-4 py-2 text-xs font-bold text-center uppercase align-middle transition-all rounded-lg cursor-pointer bg-slate-100 text-slate-700 hover:bg-slate-200"
                        >
                            <i className="fas fa-arrow-left mr-2"></i>
                            Kembali
                        </Link>
                    </div>
                </div>
            </div>

            {/* Form Card */}
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border">
                <div className="p-6 border-b border-slate-100">
                    <h6 className="mb-0 text-slate-700 font-semibold">Konfigurasi PPDB</h6>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {/* Toggle Status */}
                    <div className="flex items-center justify-between p-4 mb-6 rounded-xl" style={{ backgroundColor: '#f8fafc' }}>
                        <div>
                            <h6 className="mb-1 font-semibold text-slate-700">Status Pendaftaran PPDB</h6>
                            <p className="mb-0 text-sm text-slate-500">
                                {data.is_open ? 'Pendaftaran sedang dibuka' : 'Pendaftaran sedang ditutup'}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setData('is_open', !data.is_open)}
                            style={{
                                width: '56px',
                                height: '32px',
                                borderRadius: '16px',
                                backgroundColor: data.is_open ? '#f97316' : '#cbd5e1',
                                position: 'relative',
                                cursor: 'pointer',
                                border: 'none',
                                transition: 'background-color 0.3s ease',
                            }}
                        >
                            <span
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    backgroundColor: '#ffffff',
                                    position: 'absolute',
                                    top: '4px',
                                    left: data.is_open ? '28px' : '4px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                    transition: 'left 0.3s ease',
                                }}
                            />
                        </button>
                    </div>

                    {/* Academic Year */}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Tahun Ajaran
                        </label>
                        <input
                            type="text"
                            value={data.academic_year}
                            onChange={(e) => setData('academic_year', e.target.value)}
                            placeholder="2025/2026"
                            className="block w-full px-4 py-3 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none"
                            style={{ backgroundColor: '#ffffff', color: '#334155' }}
                        />
                        {errors.academic_year && (
                            <p className="mt-1 text-sm text-red-600">{errors.academic_year}</p>
                        )}
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-slate-700">
                                <i className="fas fa-calendar-alt mr-2 text-orange-500"></i>
                                Tanggal Pembukaan
                            </label>
                            <input
                                type="date"
                                value={data.open_date}
                                onChange={(e) => setData('open_date', e.target.value)}
                                className="block w-full px-4 py-3 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none"
                                style={{ backgroundColor: '#ffffff', color: '#334155' }}
                            />
                            {errors.open_date && (
                                <p className="mt-1 text-sm text-red-600">{errors.open_date}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-slate-700">
                                <i className="fas fa-calendar-alt mr-2 text-orange-500"></i>
                                Tanggal Penutupan
                            </label>
                            <input
                                type="date"
                                value={data.close_date}
                                onChange={(e) => setData('close_date', e.target.value)}
                                className="block w-full px-4 py-3 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none"
                                style={{ backgroundColor: '#ffffff', color: '#334155' }}
                            />
                            {errors.close_date && (
                                <p className="mt-1 text-sm text-red-600">{errors.close_date}</p>
                            )}
                        </div>
                    </div>

                    {/* Closed Message */}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-slate-700">
                            Pesan Saat PPDB Ditutup
                        </label>
                        <textarea
                            value={data.message_closed}
                            onChange={(e) => setData('message_closed', e.target.value)}
                            rows={3}
                            placeholder="Masukkan pesan yang akan ditampilkan saat pendaftaran ditutup..."
                            className="block w-full px-4 py-3 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
                            style={{ backgroundColor: '#ffffff', color: '#334155' }}
                        />
                        {errors.message_closed && (
                            <p className="mt-1 text-sm text-red-600">{errors.message_closed}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4 border-t border-slate-100">
                        <button
                            type="submit"
                            disabled={processing}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '12px 24px',
                                backgroundColor: '#f97316',
                                color: '#ffffff',
                                fontWeight: '600',
                                fontSize: '14px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: processing ? 'not-allowed' : 'pointer',
                                opacity: processing ? 0.6 : 1,
                                transition: 'background-color 0.2s ease',
                            }}
                            onMouseOver={(e) => !processing && (e.currentTarget.style.backgroundColor = '#ea580c')}
                            onMouseOut={(e) => !processing && (e.currentTarget.style.backgroundColor = '#f97316')}
                        >
                            <i className="fas fa-save mr-2"></i>
                            {processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Info Card */}
            <div className="relative flex flex-col min-w-0 break-words bg-blue-50 border border-blue-200 rounded-2xl bg-clip-border mt-6 p-4">
                <h6 className="font-semibold text-blue-800 mb-2">
                    <i className="fas fa-info-circle mr-2"></i>
                    Informasi
                </h6>
                <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                    <li>Jika <strong>Status Pendaftaran</strong> dimatikan, pendaftar tidak dapat mengakses form pendaftaran.</li>
                    <li><strong>Tanggal Pembukaan</strong> dan <strong>Penutupan</strong> bersifat opsional.</li>
                    <li><strong>Pesan Saat Ditutup</strong> akan ditampilkan kepada calon pendaftar ketika pendaftaran tidak aktif.</li>
                </ul>
            </div>
        </AdminLayout>
    );
}
