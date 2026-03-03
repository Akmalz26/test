<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PpdbInfoCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'icon',
        'content',
        'order',
        'is_active',
        'card_type',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
