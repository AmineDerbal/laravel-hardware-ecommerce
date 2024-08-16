<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use App\Http\Requests\products\StoreRequest;
use App\Http\Requests\products\EditRequest;
use App\Http\Requests\products\UpdateThumbNailImageRequest;
use App\Http\Resources\Products\ProductResource;
use App\Http\Resources\Products\ProductCollection;

class ProductController extends Controller
{
    public function index()
    {

        $products = Product::with('category')->paginate(10);

        return response()->json(new ProductCollection($products));


    }

    public function show($id)
    {

        $product = Product::with('category', 'images')->findOrFail($id);

        return response()->json(new ProductResource($product));

    }
    public function store(StoreRequest $request)
    {


        $data = $request->validated();


        $data['code'] = idGenerate('products', 'PROD-');


        $image = $request->file('thumbnail');
        $path = public_path('uploads/products');

        try {
            $image_path = uploadImage($image, $path);
            if(!$image_path) {
                return response()->json(['message' => 'Error in image path'], 500);
            }

            $data['image'] = $image_path;
            $product = Product::create($data);

            if(!$product) {
                unlink($image_path);
                return response()->json(['message' => 'Error creating product'], 500);
            }

            if($request->hasFile('images')) {

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
            if(!$image_path) {
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
    }
}
