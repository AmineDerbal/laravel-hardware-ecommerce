<?php

namespace App\Http\Resources\Category;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HeaderCategoryResource extends JsonResource
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
            'children' => CategoryChildrenResource::collection($this->children),
        ]);

    }
}
