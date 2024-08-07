<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\Categories\StoreCategoryRequest;
use App\Http\Requests\Categories\EditCategoryRequest;
use App\Http\Resources\Category\AllCategoriesResource;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('parent')->get();

        return response()->json(AllCategoriesResource::collection($categories));
    }

    public function show($id)
    {
        $category = Category::with('parent')->findOrFail($id);
        return response()->json(new AllCategoriesResource($category));


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

        $data['code'] = idGenerate('categories', 'CAT-');

        $category = Category::create($data);

        if(!$category) {
            return response()->json(['message' => 'Error creating category'], 500);
        }

        return response()->json([
            'message' => 'Category created successfully',]);

    }

    public function update(EditCategoryRequest $request)
    {
        $category = Category::findOrFail($request->id);
        $data = $request->validated();

        $category->update($data);

        return response()->json([
            'message' => 'Category updated successfully',

        ]);

    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully'
        ]);
    }
}
