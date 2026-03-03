import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';
import AdminLayout from '../../../layouts/AdminLayout';

interface PpdbSettingsProps {
    settings: {
        id: number;
        is_open: boolean;
        open_date: string | null;
        close_date: string | null;
        academic_year: string | null;
        message_closed: string | null;
        brochure_file: string | null;
        brochure_title: string | null;
        brochure_description: string | null;
    };
    timelines: any[];
    infoCards: any[];
}

export default function PpdbSettings({ settings, timelines = [], infoCards = [] }: PpdbSettingsProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        is_open: settings.is_open,
        open_date: settings.open_date || '',
        close_date: settings.close_date || '',
        academic_year: settings.academic_year || '',
        message_closed: settings.message_closed || '',
        brochure_file: null as File | null,
        brochure_title: settings.brochure_title || '',
        brochure_description: settings.brochure_description || '',
        delete_brochure: false,
    });

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingTimeline, setEditingTimeline] = React.useState<any>(null);

    const [isInfoCardModalOpen, setIsInfoCardModalOpen] = React.useState(false);
    const [editingInfoCard, setEditingInfoCard] = React.useState<any>(null);

    const timelineForm = useForm({
        title: '',
        date: '',
        description: '',
        icon: 'file-text',
        is_active: true as boolean,
    });

    const infoCardForm = useForm({
        title: '',
        icon: 'file-text',
        content: '',
        card_type: 'general',
        is_active: true as boolean,
    });

    const openTimelineModal = (timeline: any = null) => {
        setEditingTimeline(timeline);
        if (timeline) {
            timelineForm.setData({
                title: timeline.title,
                date: timeline.date,
                description: timeline.description,
                icon: timeline.icon,
                is_active: !!timeline.is_active,
            });
        } else {
            timelineForm.reset();
            timelineForm.setData({
                title: '',
                date: '',
                description: '',
                icon: 'file-text',
                is_active: true,
            });
        }
        setIsModalOpen(true);
    };

    const handleTimelineSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingTimeline) {
            timelineForm.put(`/admin/spmb/timelines/${editingTimeline.id}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    timelineForm.reset();
                }
            });
        } else {
            timelineForm.post('/admin/spmb/timelines', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    timelineForm.reset();
                }
            });
        }
    };

    const deleteTimeline = (timeline: any) => {
        if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
            timelineForm.delete(`/admin/spmb/timelines/${timeline.id}`);
        }
    };

    const openInfoCardModal = (infoCard: any = null) => {
        setEditingInfoCard(infoCard);
        if (infoCard) {
            infoCardForm.setData({
                title: infoCard.title,
                icon: infoCard.icon,
                content: infoCard.content,
                card_type: infoCard.card_type,
                is_active: !!infoCard.is_active,
            });
        } else {
            infoCardForm.reset();
            infoCardForm.setData({
                title: '',
                icon: 'file-text',
                content: '',
                card_type: 'general',
                is_active: true,
            });
        }
        setIsInfoCardModalOpen(true);
    };

    const handleInfoCardSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingInfoCard) {
            infoCardForm.put(route('admin.ppdb.info_cards.update', editingInfoCard.id), {
                onSuccess: () => {
                    setIsInfoCardModalOpen(false);
                    infoCardForm.reset();
                }
            });
        } else {
            infoCardForm.post(route('admin.ppdb.info_cards.store'), {
                onSuccess: () => {
                    setIsInfoCardModalOpen(false);
                    infoCardForm.reset();
                }
            });
        }
    };

    const deleteInfoCard = (infoCard: any) => {
        if (confirm('Apakah Anda yakin ingin menghapus kartu informasi ini?')) {
            infoCardForm.delete(route('admin.ppdb.info_cards.destroy', infoCard.id));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/admin/spmb/settings', data, {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Pengaturan SPMB" />

            {/* Header Card */}
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border mb-6">
                <div className="flex-auto p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-orange-500 to-orange-600">
                                <i className="ni ni-settings-gear-65 text-lg text-white relative top-3"></i>
                            </div>
                            <div>
                                <h5 className="mb-1 font-bold text-slate-700">Pengaturan SPMB</h5>
                                <p className="mb-0 text-sm text-slate-500">Atur jadwal pembukaan dan penutupan pendaftaran SPMB</p>
                            </div>
                        </div>
                        <Link
                            href="/admin/spmb"
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
                    <h6 className="mb-0 text-slate-700 font-semibold">Konfigurasi SPMB</h6>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {/* Toggle Status */}
                    <div className="flex items-center justify-between p-4 mb-6 rounded-xl" style={{ backgroundColor: '#f8fafc' }}>
                        <div>
                            <h6 className="mb-1 font-semibold text-slate-700">Status Pendaftaran SPMB</h6>
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
                            Pesan Saat SPMB Ditutup
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

                    {/* Brochure Upload Section */}
                    <div className="mb-6 p-6 border border-slate-200 rounded-lg bg-slate-50">
                        <h3 className="text-md font-semibold text-slate-700 mb-4">
                            <i className="fas fa-file-pdf mr-2 text-orange-500"></i>
                            Brosur SPMB
                        </h3>

                        {settings.brochure_file && !data.delete_brochure && (
                            <div className="mb-4 p-4 bg-white border border-slate-200 rounded-lg">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-700 mb-1">
                                            {settings.brochure_title || 'Brosur SPMB'}
                                        </p>
                                        <p className="text-xs text-slate-500 mb-2">
                                            {settings.brochure_description || 'File sudah diunggah'}
                                        </p>
                                        <a
                                            href={`/storage/${settings.brochure_file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-xs text-orange-600 hover:text-orange-700"
                                        >
                                            <i className="fas fa-eye mr-1"></i>
                                            Lihat File
                                        </a>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setData('delete_brochure', true)}
                                        className="px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded"
                                    >
                                        <i className="fas fa-trash mr-1"></i>
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-slate-700">
                                    Upload File (PDF/Gambar, max 10MB)
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setData('brochure_file', e.target.files[0]);
                                            setData('delete_brochure', false);
                                        }
                                    }}
                                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                                />
                                {errors.brochure_file && (
                                    <p className="mt-1 text-sm text-red-600">{errors.brochure_file}</p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-slate-700">
                                    Judul Brosur
                                </label>
                                <input
                                    type="text"
                                    value={data.brochure_title}
                                    onChange={(e) => setData('brochure_title', e.target.value)}
                                    placeholder="Contoh: Brosur Penerimaan Murid Baru 2026"
                                    className="block w-full px-4 py-2 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none"
                                />
                                {errors.brochure_title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.brochure_title}</p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-slate-700">
                                    Deskripsi Brosur
                                </label>
                                <textarea
                                    value={data.brochure_description}
                                    onChange={(e) => setData('brochure_description', e.target.value)}
                                    placeholder="Deskripsi singkat tentang brosur..."
                                    rows={3}
                                    className="block w-full px-4 py-2 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
                                />
                                {errors.brochure_description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.brochure_description}</p>
                                )}
                            </div>
                        </div>
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

            {/* Timeline Management Card */}
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border mt-6">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h6 className="mb-0 text-slate-700 font-semibold">Manajemen Jadwal & Alur</h6>
                    <button
                        onClick={() => openTimelineModal()}
                        className="px-4 py-2 text-xs font-bold text-white uppercase transition-all bg-orange-500 rounded-lg hover:bg-orange-600 shadow-md hover:shadow-lg"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Tambah Jadwal
                    </button>
                </div>

                <div className="p-0 overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Judul
                                </th>
                                <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Tanggal
                                </th>
                                <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Deskripsi
                                </th>
                                <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Status
                                </th>
                                <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {timelines.map((timeline) => (
                                <tr key={timeline.id}>
                                    <td className="px-6 py-3 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                        <div className="flex px-2 py-1">
                                            <div className="flex flex-col justify-center">
                                                <h6 className="mb-0 text-sm leading-normal text-slate-700">{timeline.title}</h6>
                                                <p className="mb-0 text-xs leading-tight text-slate-400">Icon: {timeline.icon}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                        <p className="mb-0 text-xs font-semibold leading-tight text-slate-500">{timeline.date}</p>
                                    </td>
                                    <td className="px-6 py-3 align-middle bg-transparent border-b shadow-transparent">
                                        <p className="mb-0 text-xs leading-tight text-slate-500 truncate max-w-[200px]">{timeline.description}</p>
                                    </td>
                                    <td className="px-6 py-3 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                        <span className={`px-2 py-1 text-xs font-bold text-white rounded-full ${timeline.is_active ? 'bg-green-500' : 'bg-gray-400'}`}>
                                            {timeline.is_active ? 'Aktif' : 'Non-Aktif'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                        <button
                                            onClick={() => openTimelineModal(timeline)}
                                            className="text-xs font-bold leading-tight text-slate-500 hover:text-orange-500 mx-2"
                                        >
                                            <i className="fas fa-edit"></i> Edit
                                        </button>
                                        <button
                                            onClick={() => deleteTimeline(timeline)}
                                            className="text-xs font-bold leading-tight text-slate-500 hover:text-red-500 mx-2"
                                        >
                                            <i className="fas fa-trash"></i> Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {timelines.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-sm">
                                        Belum ada jadwal yang ditambahkan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
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
                    <li>Jadwal & Alur akan ditampilkan di halaman depan portal SPMB.</li>
                </ul>
            </div>

            {/* Timeline Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="relative w-full max-w-lg p-6 bg-white rounded-2xl shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h5 className="text-xl font-bold text-slate-700">
                                {editingTimeline ? 'Edit Jadwal' : 'Tambah Jadwal'}
                            </h5>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 focus:outline-none"
                            >
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>

                        <form onSubmit={handleTimelineSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-slate-700">Judul</label>
                                <input
                                    type="text"
                                    value={timelineForm.data.title}
                                    onChange={(e) => timelineForm.setData('title', e.target.value)}
                                    className="block w-full px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                                    placeholder="Contoh: Pendaftaran Tahap 1"
                                    required
                                />
                                {timelineForm.errors.title && <p className="text-xs text-red-500 mt-1">{timelineForm.errors.title}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-slate-700">Tanggal / Waktu</label>
                                <input
                                    type="text"
                                    value={timelineForm.data.date}
                                    onChange={(e) => timelineForm.setData('date', e.target.value)}
                                    className="block w-full px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                                    placeholder="Contoh: Februari - April 2025"
                                    required
                                />
                                {timelineForm.errors.date && <p className="text-xs text-red-500 mt-1">{timelineForm.errors.date}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-slate-700">Deskripsi</label>
                                <textarea
                                    value={timelineForm.data.description}
                                    onChange={(e) => timelineForm.setData('description', e.target.value)}
                                    className="block w-full px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
                                    placeholder="Deskripsi singkat kegiatan"
                                    rows={3}
                                    required
                                />
                                {timelineForm.errors.description && <p className="text-xs text-red-500 mt-1">{timelineForm.errors.description}</p>}
                            </div>

                            <div className="flex gap-4 mb-4">
                                <div className="flex-1">
                                    <label className="block mb-2 text-sm font-bold text-slate-700">
                                        Icon (Lucide React)
                                    </label>
                                    <select
                                        value={timelineForm.data.icon}
                                        onChange={(e) => timelineForm.setData('icon', e.target.value)}
                                        className="block w-full px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                                    >
                                        <option value="file-text">File Text</option>
                                        <option value="check-circle">Check Circle</option>
                                        <option value="calendar-check">Calendar Check</option>
                                        <option value="clock">Clock</option>
                                        <option value="users">Users</option>
                                        <option value="school">School</option>
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className="block mb-2 text-sm font-bold text-slate-700">Status</label>
                                    <div className="relative flex items-center mt-2">
                                        <span className="mr-3 text-sm text-slate-600">
                                            {timelineForm.data.is_active ? 'Aktif' : 'Non-Aktif'}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => timelineForm.setData('is_active', !timelineForm.data.is_active)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${timelineForm.data.is_active ? 'bg-orange-500' : 'bg-gray-300'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${timelineForm.data.is_active ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 focus:outline-none"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={timelineForm.processing}
                                    className="px-4 py-2 text-sm font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {timelineForm.processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Info Cards Management Section */}
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-2xl bg-clip-border mt-6">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h6 className="mb-1 text-slate-700 font-semibold">Manajemen Kartu Informasi</h6>
                        <p className="text-xs text-slate-500">Kelola informasi yang ditampilkan di halaman SPMB</p>
                    </div>
                    <button
                        onClick={() => openInfoCardModal()}
                        className="px-4 py-2 text-xs font-bold text-white uppercase transition-all bg-orange-500 rounded-lg hover:bg-orange-600 shadow-md hover:shadow-lg"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Tambah Kartu Info
                    </button>
                </div>

                <div className="p-0 overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Judul
                                </th>
                                <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Tipe
                                </th>
                                <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Status
                                </th>
                                <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {infoCards.map((card: any) => (
                                <tr key={card.id}>
                                    <td className="px-6 py-3 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                        <div className="flex px-2 py-1">
                                            <div className="flex flex-col justify-center">
                                                <h6 className="mb-0 text-sm leading-normal text-slate-700">{card.title}</h6>
                                                <p className="mb-0 text-xs leading-tight text-slate-400">Icon: {card.icon}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                        <p className="mb-0 text-xs font-semibold leading-tight text-slate-500 capitalize">{card.card_type}</p>
                                    </td>
                                    <td className="px-6 py-3 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                        <span className={`px-2 py-1 text-xs font-bold text-white rounded-full ${card.is_active ? 'bg-green-500' : 'bg-gray-400'}`}>
                                            {card.is_active ? 'Aktif' : 'Non-Aktif'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                        <button
                                            onClick={() => openInfoCardModal(card)}
                                            className="text-xs font-bold leading-tight text-slate-500 hover:text-orange-500 mx-2"
                                        >
                                            <i className="fas fa-edit"></i> Edit
                                        </button>
                                        <button
                                            onClick={() => deleteInfoCard(card)}
                                            className="text-xs font-bold leading-tight text-slate-500 hover:text-red-500 mx-2"
                                        >
                                            <i className="fas fa-trash"></i> Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {infoCards.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500 text-sm">
                                        Belum ada kartu informasi yang ditambahkan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Info Card Modal */}
            {isInfoCardModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="relative w-full max-w-2xl p-6 bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h5 className="text-xl font-bold text-slate-700">
                                {editingInfoCard ? 'Edit Kartu Informasi' : 'Tambah Kartu Informasi'}
                            </h5>
                            <button
                                onClick={() => setIsInfoCardModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 focus:outline-none"
                            >
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>

                        <form onSubmit={handleInfoCardSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-bold text-slate-700">Judul</label>
                                <input
                                    type="text"
                                    value={infoCardForm.data.title}
                                    onChange={(e) => infoCardForm.setData('title', e.target.value)}
                                    className="block w-full px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                                    placeholder="Contoh: Persyaratan Pendaftaran"
                                    required
                                />
                                {infoCardForm.errors.title && <p className="text-xs text-red-500 mt-1">{infoCardForm.errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block mb-2 text-sm font-bold text-slate-700">Icon</label>
                                    <select
                                        value={infoCardForm.data.icon}
                                        onChange={(e) => infoCardForm.setData('icon', e.target.value)}
                                        className="block w-full px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                                    >
                                        <option value="file-text">File Text</option>
                                        <option value="school">School</option>
                                        <option value="award">Award/Medal</option>
                                        <option value="book-open">Book Open</option>
                                        <option value="briefcase">Briefcase</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-bold text-slate-700">Tipe Kartu</label>
                                    <select
                                        value={infoCardForm.data.card_type}
                                        onChange={(e) => infoCardForm.setData('card_type', e.target.value)}
                                        className="block w-full px-4 py-2 text-sm text-slate-700 bg-white border border-slate-300 rounded-lg focus:border-orange-500 focus:outline-none"
                                    >
                                        <option value="general">General</option>
                                        <option value="requirements">Requirements</option>
                                        <option value="programs">Programs</option>
                                        <option value="benefits">Benefits</option>
                                    </select>
                                </div>
                            </div>

                            {/* Editor Konten */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Konten <span className="text-red-500">*</span>
                                </label>
                                <div className="rounded-xl overflow-hidden border border-gray-300 shadow-sm">
                                    <Editor
                                        apiKey='us5k11n22fvccimhy645zjsiqgkl4l5du8597i653h7qqni0'
                                        value={infoCardForm.data.content}
                                        onEditorChange={(content) => infoCardForm.setData('content', content)}
                                        init={{
                                            height: 500,
                                            menubar: true,
                                            plugins: 'lists link table code help wordcount autolink visualblocks',
                                            toolbar: 'undo redo | formatselect | ' +
                                                'bold italic | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'link table | code | help',
                                            content_style: 'body { font-family:Inter,system-ui,sans-serif; font-size:14px }'
                                        }}
                                    />
                                </div>
                                {infoCardForm.errors.content && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center">
                                        <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                                        {infoCardForm.errors.content}
                                    </p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={infoCardForm.data.is_active}
                                        onChange={(e) => infoCardForm.setData('is_active', e.target.checked)}
                                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                                    />
                                    <span className="ml-2 text-sm text-slate-700">Tampilkan di halaman publik</span>
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsInfoCardModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 focus:outline-none"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={infoCardForm.processing}
                                    className="px-4 py-2 text-sm font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {infoCardForm.processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
