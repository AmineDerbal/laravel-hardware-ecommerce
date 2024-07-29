<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\Categories\StoreCategoryRequest;
use App\Http\Resources\Category\AllCategoriesResource;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('parent')->get();

        return response()->json(AllCategoriesResource::collection($categories));
    }

    public function forSelect()
    {

        $categories = Category::select('id', 'name')->get();

        return response()->json($categories);
    }

    public function forHeader()
    {

        $categories = Category::with('children')->where('parent_id', null)->get();

        return response()->json($categories);
    }

    public function store(StoreCategoryRequest $request)
    {
        $data = $request->validated();

        $category = Category::create($data);

        if(!$category) {
            return response()->json(['message' => 'Error creating category'], 500);
        }

        return response()->json([
            'message' => 'Category created successfully',]);

    }


}
