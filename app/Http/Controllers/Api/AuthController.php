<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:5',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'errors' => [
                    'message' => __('auth.failed'),
                ],
            ], 422);
        }

        $user = Auth::user();
        if ($user->is_active == 0) {
            return response()->json(['message' => 'User is not active. Please contact admin'], 401);
        }
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->accessToken;

        $userWithCartItems = User::with(['cartItems.product'])->find($user->id);

        return response()->json(['user' => $userWithCartItems])->cookie(
            'access_token',
            $token,
            $tokenResult->token->expires_at->diffInMinutes(now()), // Default expiration time
            '/',
            null,
            true,
            true,
        );
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:5',
            'password_confirmation' => 'required|same:password',
        ]);

        User::create([
           'name' => $request->name,
           'email' => $request->email,
           'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'User created successfully'], 201);
    }

    public function logout()
    {

        return response()->json(['message' => 'Successfully logged out'])->withCookie(Cookie::forget('access_token'));

    }
}
