<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart;
use App\Http\Requests\Order\StoreRequest;
use App\Http\Resources\Orders\OrdersCollection;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('user')->paginate(10);
        return response()->json(new OrdersCollection($orders));
    }
    public function store(StoreRequest $request)
    {
        $data = $request->validated();


        try {
            $cart = Cart::find($data['cart_id']);
            if (!$cart) {
                return response()->json(['message' => 'Cart not found'], 404);
            }
            $order = Order::create([
                'user_id' => $data['user_id'],
                'code' => idGenerate('orders', 'ORD-'),
                'shipping_fee' => $data['shipping_fee'],
                'tax' => $data['tax'],
                'total_amount' => 0,
            ]);
            if (!$order) {
                return response()->json(['message' => 'Error creating order'], 500);
            }

            $total = $data['shipping_fee'] + $data['tax'];
            foreach ($data['products'] as $product) {

                $order_item = OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product['product_id'],
                    'quantity' => $product['quantity'],
                    'price' => $product['price'],
                ]);
                if (!$order_item) {
                    Order::where('id', $order->id)->delete();
                    return response()->json(['message' => 'Error creating order item'], 500);
                }

                $total += $product['quantity'] * $product['price'];
            }


            $order->update(['total_amount' => $total]);
            $cart->items()->delete();

            return response()->json(['message' => 'Order created successfully']);
        } catch (\Exception $e) {
            \Log::error('Error creating order: ' . $e->getMessage());
            return response()->json(['message' => 'Error creating order'], 500);
        }

    }
}