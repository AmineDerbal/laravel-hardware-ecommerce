<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Resources\Users\UserCollection;

class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate(10);
        return response()->json(new UserCollection($users));

    }


    public function toggleIsActiveStatus($id)
    {

        try {
            $user = User::findOrFail($id);

            $is_active = $user->is_active == 1 ? 0 : 1;

            $user->update(['is_active' => $is_active]);
            return response()->json(['message' => 'User updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating user'], 500);
        }

    }

    public function fetchUserActiveCartItems($id)
    {
        try {
            $user = User::with(['cartItems.product'])->find($id);

            return response()->json($user->cartItems);
        } catch (\Exception $e) {
            \Log::info('Error fetching cart items: ' . $e->getMessage());
            return response()->json(['message' => 'Error fetching cart items'], 500);
        }
    }
}
