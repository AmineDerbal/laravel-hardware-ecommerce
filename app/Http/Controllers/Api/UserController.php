<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Resources\Users\UserCollection;
use App\Models\Cart;

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
            $data = [];
            $user = User::with(['cartItems.product'])->find($id);
            if ($user) {
                $data = $user->cartItems;
            }
            return response()->json($data);
        } catch (\Exception $e) {
            \Log::info('Error fetching cart items: ' . $e->getMessage());
            return response()->json(['message' => 'Error fetching cart items'], 500);
        }
    }

    public function toggleUserActiveCart($user_id, $id)
    {
        try {
            $cart = Cart::where(['id' => $id, 'user_id' => $user_id, 'active' => 1])->first();
            $cart->update(['active' => 0]);
            return response()->json(['message' => 'Cart deleted successfully']);
        } catch (\Exception $e) {
            \Log::info('Error deleting cart: ' . $e->getMessage());
            return response()->json(['message' => 'Error deleting cart'], 500);
        }

    }
}
