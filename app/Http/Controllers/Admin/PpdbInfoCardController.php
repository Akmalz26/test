<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PpdbInfoCard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class PpdbInfoCardController extends Controller
{
    /**
     * Store a newly created info card.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'icon' => 'required|string|max:255',
            'content' => 'required|string',
            'card_type' => 'required|string|max:255',
        ]);

        // Calculate next order
        $maxOrder = PpdbInfoCard::max('order') ?? 0;

        PpdbInfoCard::create([
            'title' => $request->title,
            'icon' => $request->icon,
            'content' => $request->content,
            'card_type' => $request->card_type,
            'order' => $maxOrder + 1,
            'is_active' => true,
        ]);

        return Redirect::back()->with('success', 'Kartu informasi berhasil ditambahkan.');
    }

    /**
     * Update the specified info card.
     */
    public function update(Request $request, PpdbInfoCard $infoCard)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'icon' => 'required|string|max:255',
            'content' => 'required|string',
            'card_type' => 'required|string|max:255',
            'is_active' => 'boolean',
        ]);

        $infoCard->update($request->all());

        return Redirect::back()->with('success', 'Kartu informasi berhasil diperbarui.');
    }

    /**
     * Remove the specified info card.
     */
    public function destroy(PpdbInfoCard $infoCard)
    {
        $infoCard->delete();

        return Redirect::back()->with('success', 'Kartu informasi berhasil dihapus.');
    }
}
