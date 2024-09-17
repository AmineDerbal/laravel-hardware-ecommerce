<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Cart;
use App\Http\Requests\CartItems\StoreRequest;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
    public function store(StoreRequest $request)
    {

        $data = $request->validated();


        try {
            $cart = Cart::firstOrCreate(
                ['user_id' => $data['user_id'], 'active' => 1],
                ['user_id' => $data['user_id']]
            );
            $data['cart_id'] = $cart->id;

            CartItem::create($data);
            return response()->json(['message' => 'Cart item created successfully']);
        } catch (\Exception $e) {
            \Log::error('Error creating cart item: ' . $e->getMessage());
            return response()->json(['message' => 'Error creating cart item'], 500);
        }

    }
}