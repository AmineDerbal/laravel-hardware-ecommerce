<?php

namespace App\Http\Resources\Orders;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Orders\BasicOrderResource;
use App\Http\Resources\Orders\OrderItemResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $basicData = (new BasicOrderResource($this->resource))->toArray($request);
        return array_merge($basicData, [
         'items' => OrderItemResource::collection($this->items),
        ]);
    }
}
