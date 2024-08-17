<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\Categories\StoreCategoryRequest;
use App\Http\Requests\Categories\EditCategoryRequest;
use App\Http\Resources\Category\AllCategoriesResource;
use App\Http\Resources\Category\CategoryCollection;
use App\Http\Resources\Category\HeaderCategoryResource;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('parent')->paginate(10);
        return response()->json(new CategoryCollection($categories));

    }

    public function show($id)
    {
        $category = Category::with('parent')->findOrFail($id);
        return response()->json(new AllCategoriesResource($category));


    }

    public function forSelect()
    {
        // select categories that has either no parents or just one parent and it's parent has no parent

        $categories = Category::whereNull('parent_id')
        ->orWhereIn('parent_id', function ($query) {
            $query->select('id')
                  ->from('categories')
                  ->whereNull('parent_id');
        })
        ->get();


        return response()->json($categories);
    }

    public function forHeader()
    {

        $categories = Category::with('children')->where('parent_id', null)->get();


        return response()->json(HeaderCategoryResource::collection($categories));
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
