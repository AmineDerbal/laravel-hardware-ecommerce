<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Cart;
use App\Http\Requests\CartItems\StoreRequest;
use App\Http\Requests\CartItems\UpdateRequest;

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

    public function incrementQuantityByOne(UpdateRequest $request)
    {

        $data = $request->validated();

        try {
            $cartItem = CartItem::where([
                ['product_id', '=', $data['product_id']],
                ['cart_id', '=', $data['cart_id']],
                ['id', '=', $data['id']]
            ])->first();

            $data['quantity'] = $cartItem->quantity + $data['quantity'];
            $cartItem->update($data);
            return response()->json(['message' => 'Cart item updated successfully']);
        } catch (\Exception $e) {
            \Log::error('Error updating cart item: ' . $e->getMessage());
            return response()->json(['message' => 'Error updating cart item'], 500);
        }



    }

    public function update(UpdateRequest $request)
    {
        $data = $request->validated();

        try {
            $cartItem = CartItem::where([
                ['product_id', '=', $data['product_id']],
                ['cart_id', '=', $data['cart_id']],
                ['id', '=', $data['id']]
            ])->first();

            $cartItem->update($data);
            return response()->json(['message' => 'Cart item updated successfully']);
        } catch (\Exception $e) {
            \Log::error('Error updating cart item: ' . $e->getMessage());
            return response()->json(['message' => 'Error updating cart item'], 500);
        }

    }

    public function destroy($id)
    {
        \Log::info($id);
        try {
            $cartItem = CartItem::findOrFail($id);
            $cartItem->delete();
            return response()->json(['message' => 'Cart item deleted successfully']);
        } catch (\Exception $e) {
            \Log::error('Error updating cart item: ' . $e->getMessage());
            return response()->json(['message' => 'Error on deleting cart item'], 500);
        }
    }
}
