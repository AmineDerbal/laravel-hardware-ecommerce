<?php

namespace App\Http\Resources\Products;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Category\CategoryParentResource;

class ProductCategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $basicData = (new BasicProductResource($this->resource))->toArray($request);
        $categoryParentPath = buildCategoryParentPath($this->category);
        return array_merge($basicData, [
            'category' => new CategoryParentResource($this->category),
            'category_parent_path' => $categoryParentPath

        ]);
    }
}
