<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Http\Requests\Order\StoreRequest;

class OrderController extends Controller
{
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        try {
            $order = Order::create([
                'user_id' => $data['user_id'],
                'slug' => idGenerate('orders', 'ORD-'),
                'status' => 'pending',
                'shipping_fee' => $data['shipping_fee'],
                'tax' => $data['tax'],
                'total' => 0,
            ]);

            $total = $data['shipping_fee'] + $data['tax'];
            foreach ($data['products'] as $product) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product['product_id'],
                    'quantity' => $product['quantity'],
                    'price' => $product['price'],
                ]);

                $total += $product['quantity'] * $product['price'];
            }

            $order->update(['total' => $total]);

            return response()->json(['message' => 'Order created successfully']);
        } catch (\Exception $e) {
            \Log::error('Error creating order: ' . $e->getMessage());
            return response()->json(['message' => 'Error creating order'], 500);
        }

    }
}
