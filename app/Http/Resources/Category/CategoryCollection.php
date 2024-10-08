<?php

namespace App\Http\Resources\Category;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

use App\Helpers\PaginationHelper;

class CategoryCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection->transform(function ($resource) {
                return new AllCategoriesResource($resource);
            }),
            'meta' => [
                'current_page' => $this->currentPage(),
                'from' => $this->firstItem(),
                'last_page' => $this->lastPage(),
                'path' => $this->path(),
                'per_page' => $this->perPage(),
                'to' => $this->lastItem(),
                'total' => $this->total()
            ],
            'links' => [
                'first' => $this->url(1),
                'last' => $this->url($this->lastPage()),
                'prev' => PaginationHelper::previousPageNumber($this->currentPage()),
                'next' => PaginationHelper::nextPageNumber($this->currentPage(), $this->lastPage()),
            ],
        ];
    }

    /**
     * Get the previous page number.
     *
     * @return int|null
     */

    private function previousPageNumber()
    {
        return $this->currentPage() > 1 ? $this->currentPage() - 1 : null;
    }

    /**
     * Get the next page number.
     *
     * @return int|null
     */
    private function nextPageNumber()
    {
        return $this->currentPage() < $this->lastPage() ? $this->currentPage() + 1 : null;
    }

}
