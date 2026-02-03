<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class PpdbSetting extends Model
{
    protected $fillable = [
        'is_open',
        'open_date',
        'close_date',
        'academic_year',
        'message_closed',
    ];

    protected $casts = [
        'is_open' => 'boolean',
        'open_date' => 'date',
        'close_date' => 'date',
    ];

    /**
     * Check if PPDB is currently open based on dates and is_open flag
     */
    public function isCurrentlyOpen(): bool
    {
        if (!$this->is_open) {
            return false;
        }

        $today = Carbon::today();

        // If open_date is set and today is before open_date, not open yet
        if ($this->open_date && $today->lt($this->open_date)) {
            return false;
        }

        // If close_date is set and today is after close_date, already closed
        if ($this->close_date && $today->gt($this->close_date)) {
            return false;
        }

        return true;
    }

    /**
     * Get the current PPDB settings (first record)
     */
    public static function current(): ?self
    {
        return self::first();
    }
}
