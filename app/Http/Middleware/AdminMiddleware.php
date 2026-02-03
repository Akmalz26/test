<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check() || !Auth::user()->hasAdminAccess()) {
            if ($request->wantsJson()) {
                return response()->json(['message' => 'Unauthorized. Anda tidak memiliki akses ke bagian ini.'], 403);
            }
            
            return redirect()->route('home')->with('error', 'Anda tidak memiliki akses ke bagian admin.');
        }

        return $next($request);
    }
}
