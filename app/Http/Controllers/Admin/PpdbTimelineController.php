<?php

namespace App\Http\Controllers\Admin;

use App\Models\PpdbTimeline;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;

class PpdbTimelineController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'required|string',
        ]);

        // Calculate next order
        $maxOrder = PpdbTimeline::max('order') ?? 0;

        PpdbTimeline::create([
            'title' => $request->title,
            'date' => $request->date,
            'description' => $request->description,
            'icon' => $request->icon,
            'order' => $maxOrder + 1,
            'is_active' => true,
        ]);

        return Redirect::back()->with('success', 'Jadwal berhasil ditambahkan.');
    }

    public function update(Request $request, PpdbTimeline $timeline)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'required|string',
            'is_active' => 'boolean',
        ]);

        $timeline->update($request->all());

        return Redirect::back()->with('success', 'Jadwal berhasil diperbarui.');
    }

    public function destroy(PpdbTimeline $timeline)
    {
        $timeline->delete();

        return Redirect::back()->with('success', 'Jadwal berhasil dihapus.');
    }
}