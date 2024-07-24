<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\Categories\StoreCategoryRequest;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        return response()->json($categories);
    }

    public function forSelect()
    {

        $categories = Category::select('id', 'name')->get();

        return response()->json($categories);
    }

    public function store(StoreCategoryRequest $request)
    {
        $data = $request->validated();

        $category = Category::create($data);

        if(!$category) {
            return response()->json(['message' => 'Error creating category'], 500);
        }

        return response()->json($category);

    }


}
