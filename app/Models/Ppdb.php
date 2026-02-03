<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ppdb extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nomor_pendaftaran',
        'tahun_pelajaran',
        'is_pesantren',
        'nama_lengkap',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'alamat',
        'rt',
        'rw',
        'desa',
        'kecamatan',
        'kabupaten',
        'kode_pos',
        'nisn',
        'sekolah_asal',
        'alamat_sekolah',
        'telepon_sekolah',
        'nama_ayah',
        'nama_ibu',
        'pekerjaan_ayah',
        'pekerjaan_ibu',
        'alamat_ortu',
        'rt_ortu',
        'rw_ortu',
        'desa_ortu',
        'kecamatan_ortu',
        'kabupaten_ortu',
        'kode_pos_ortu',
        'telepon_rumah',
        'telepon_hp',
        'foto',
        'rapor_file',
        'ijazah_file',
        'skhun_file',
        'kk_file',
        'akta_lahir_file',
        'ktp_ortu_file',
        'kip_kks_kps_file',
        'status',
        'catatan',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'is_pesantren' => 'boolean',
    ];

    /**
     * Get the user that owns the PPDB application.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * Get foto URL attribute
     */
    public function getFotoUrlAttribute()
    {
        if (!$this->foto) {
            return null;
        }
        
        return asset('storage/' . $this->foto);
    }
    
    /**
     * Get rapor file URL attribute
     */
    public function getRaporFileUrlAttribute()
    {
        if (!$this->rapor_file) {
            return null;
        }
        
        return asset('storage/' . $this->rapor_file);
    }
    
    /**
     * Get ijazah file URL attribute
     */
    public function getIjazahFileUrlAttribute()
    {
        if (!$this->ijazah_file) {
            return null;
        }
        
        return asset('storage/' . $this->ijazah_file);
    }
    
    /**
     * Get SKHUN file URL attribute
     */
    public function getSkhunFileUrlAttribute()
    {
        if (!$this->skhun_file) {
            return null;
        }
        
        return asset('storage/' . $this->skhun_file);
    }
    
    /**
     * Get KK file URL attribute
     */
    public function getKkFileUrlAttribute()
    {
        if (!$this->kk_file) {
            return null;
        }
        
        return asset('storage/' . $this->kk_file);
    }
    
    /**
     * Get akta lahir file URL attribute
     */
    public function getAktaLahirFileUrlAttribute()
    {
        if (!$this->akta_lahir_file) {
            return null;
        }
        
        return asset('storage/' . $this->akta_lahir_file);
    }
    
    /**
     * Get KTP orang tua file URL attribute
     */
    public function getKtpOrtuFileUrlAttribute()
    {
        if (!$this->ktp_ortu_file) {
            return null;
        }
        
        return asset('storage/' . $this->ktp_ortu_file);
    }
    
    /**
     * Get KIP/KKS/KPS file URL attribute
     */
    public function getKipKksKpsFileUrlAttribute()
    {
        if (!$this->kip_kks_kps_file) {
            return null;
        }
        
        return asset('storage/' . $this->kip_kks_kps_file);
    }
}
