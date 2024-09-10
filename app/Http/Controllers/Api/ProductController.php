<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Category;
use App\Http\Requests\products\StoreRequest;
use App\Http\Requests\products\EditRequest;
use App\Http\Requests\products\UpdateThumbNailImageRequest;
use App\Http\Resources\Products\ProductResource;
use App\Http\Resources\Products\ProductCollection;
use App\Http\Resources\Products\ProductCategoryCollection;

class ProductController extends Controller
{
    public function index()
    {

        $products = Product::with('category')->paginate(10);

        return response()->json(new ProductCollection($products));


    }

    public function latest()
    {
        $products = Product::latest()->limit(20)->get();
        return response()->json(ProductResource::collection($products));
    }

    public function show($id)
    {

        $product = Product::with('category', 'images')->findOrFail($id);

        return response()->json(new ProductResource($product));

    }

    public function showClientProduct($slug)
    {
        $product = Product::where('slug', $slug)->first();
        $category = Category::findOrFail($product->category_id);
        $category_parent_path = buildCategoryParentPath($category);

        return response()->json(['product' => new ProductResource($product),'category_parent_path' => $category_parent_path ]);

    }

    public function getCategoryProducts($slug)
    {

        $category = Category::where('slug', $slug)->first();

        $category_children = buildCategoryChildrenPath($category);
        $category_parent_path = buildCategoryParentPath($category);

        // get All the products that are in the children categories

        $products = Product::whereHas('category', function ($query) use ($category_children) {
            $query->whereIn('slug', $category_children);
        })->paginate(9);

        return response()->json([
            'products' => new ProductCategoryCollection($products),
            'category_parent_path' => $category_parent_path
        ]);

    }
    public function store(StoreRequest $request)
    {


        $data = $request->validated();


        $data['code'] = idGenerate('products', 'PROD-');


        $image = $request->file('thumbnail');
        $path = public_path('uploads/products');

        try {
            $image_path = uploadImage($image, $path);
            if (!$image_path) {
                return response()->json(['message' => 'Error in image path'], 500);
            }

            $data['image'] = $image_path;
            $product = Product::create($data);

            if (!$product) {
                unlink($image_path);
                return response()->json(['message' => 'Error creating product'], 500);
            }

            if ($request->hasFile('images')) {

                $images = $request->file('images');
                foreach ($images as $image) {

                    $image_path = uploadImage($image, $path);
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image' => $image_path
                    ]);
                }
            }

        } catch (\Throwable $th) {

            return response()->json(['message' => 'Error creating product'], 500);
        }


        return response()->json([
            'message' => 'Product Added successfully'
        ]);

    }

    public function update(EditRequest $request)
    {

        $product = Product::findOrFail($request->id);
        $data = $request->validated();

        $product->update($data);

        return response()->json(['message' => 'Product updated successfully']);

    }

    public function updateThumbnailImage(UpdateThumbNailImageRequest $request)
    {
        $product = Product::findOrFail($request->id);
        $data = $request->validated();

        $image = $request->file('thumbnail');
        $path = public_path('uploads/products');

        try {
            $image_path = uploadImage($image, $path);
            if (!$image_path) {
                return response()->json(['message' => 'Error in image path'], 500);
            }
            deleteImage($product->image);

            $data['image'] = $image_path;

            $product->update($data);


        } catch (\Throwable $th) {

            return response()->json(['message' => 'Error creating product'], 500);
        }


        return response()->json([
            'message' => 'Thumbnail image updated successfully'
        ]);
    }

    public function destroy($id)
    {

        $product = Product::findOrFail($id);

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
