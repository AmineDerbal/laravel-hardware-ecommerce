<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UsePassportTokenFromCookie
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if($request->hasCookie('access_token')) {

            $token = $request->cookie('access_token');

            $request->headers->set('Authorization', 'Bearer ' . $token);


        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
