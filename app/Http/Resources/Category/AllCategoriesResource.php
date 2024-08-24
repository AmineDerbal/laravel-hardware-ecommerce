<?php

namespace App\Http\Resources\Category;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AllCategoriesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $basicData = (new BasicCategoryResource($this->resource))->toArray($request);
        return array_merge($basicData, [
            'code' => $this->code,
            'parent_id' => $this->parent_id,
            'parent' => new CategoryParentResource($this->parent),
            'category_parent_path' => $this->category_parent_path,
        ]);

    }
}
