<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'nip',
        'position',
        'subject',
        'photo',
        'email',
        'phone',
        'education',
        'order',
        'is_active',
        'type',
        'user_id',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    protected $appends = ['photo_url'];

    /**
     * Get the photo URL attribute
     */
    public function getPhotoUrlAttribute()
    {
        if (!$this->photo) {
            return null;
        }
        
        return asset('storage/' . $this->photo);
    }

    /**
     * Get the user that created this teacher record
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope to get only structure members (pejabat)
     */
    public function scopeStruktur($query)
    {
        return $query->where('type', 'struktur')->where('is_active', true)->orderBy('order');
    }

    /**
     * Scope to get only teachers (pengajar)
     */
    public function scopeGuru($query)
    {
        return $query->where('type', 'guru')->where('is_active', true)->orderBy('name');
    }

    /**
     * Scope to get active records
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
