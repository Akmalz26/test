<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Check if user is admin.
     *
     * @return bool
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if user is a regular user (for school registration).
     *
     * @return bool
     */
    public function isUser(): bool
    {
        return $this->role === 'user';
    }

    /**
     * Check if user has any administrative role.
     *
     * @return bool
     */
    public function hasAdminAccess(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Get the PPDB application for the user.
     */
    public function ppdb()
    {
        return $this->hasOne(\App\Models\Ppdb::class);
    }

    /**
     * Get the galleries created by the user.
     */
    public function galleries()
    {
        return $this->hasMany(\App\Models\Gallery::class);
    }

    /**
     * Get the news articles created by the user.
     */
    public function news()
    {
        return $this->hasMany(\App\Models\News::class);
    }
}
