<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GalleryPhoto extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'news_id',
        'image',
        'caption',
        'sort_order',
    ];

    /**
     * Get the news that owns this gallery photo.
     */
    public function news(): BelongsTo
    {
        return $this->belongsTo(News::class);
    }
}
