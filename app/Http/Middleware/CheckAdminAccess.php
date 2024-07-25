<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckAdminAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        // Ensure the user is authenticated and has the role of admin
        if (Auth::guard('api')->check() && Auth::user()->role === 0) {
            return $next($request);
        }

        // Return a 401 Unauthorized response if the user is not an admin
        return response()->json(['message' => 'Unauthorized: Admins only'], 401);
    }

}
