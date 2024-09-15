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
        $cart = Cart::firstOrCreate(['active' => 1,'cart_id' => $data['cart_id']], ['user_id' => $data['user_id']]);
        $data->cart_id = $cart->id;


        $cartItem = CartItem::create($data->toArray());


        return $cartItem ? response()->json(['message' => 'Cart item created successfully']) : response()->json(['message' => 'Error creating cart item'], 500);



    }
}
