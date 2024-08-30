<?php

namespace App\Http\Resources\Products;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ProductImages\AllProductImagesResource;
use App\Http\Resources\Category\CategoryParentResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $basicData = (new BasicProductResource($this->resource))->toArray($request);
        return array_merge($basicData, [
            'category' => new CategoryParentResource($this->category),
            'images' => AllProductImagesResource::collection($this->images),
            'description' => $this->description
        ]);

    }
}
