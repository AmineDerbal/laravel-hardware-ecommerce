<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductImage;
use App\http\Requests\ProductImages\StoreImageRequest;
use App\http\Requests\ProductImages\UpdateImageRequest;

class ProductImageController extends Controller
{
    public function store(StoreImageRequest $request)
    {

        $data = $request->validated();

        $image = $request->file('image');
        $path = public_path('uploads/products');

        try {
            $image_path = uploadImage($image, $path);
            if(!$image_path) {
                return response()->json(['message' => 'Error storing the image'], 500);
            }

            $data['image'] = $image_path;
            $productImage = ProductImage::create($data);
            if(!$productImage) {
                unlink($image_path);
                return response()->json(['message' => 'Error creating product'], 500);
            }

        } catch(\Exception $e) {

            return response()->json(['message' => 'Error storing the image'], 500);
        }


        return response()->json(['message' => 'Image stored successfully']);

    }

    public function update(UpdateImageRequest $request)
    {

        $data = $request->validated();
        $productImage = ProductImage::findOrFail($request->id);

        $image = $request->file('image');
        $path = public_path('uploads/products');

        try {
            $image_path = uploadImage($image, $path);
            if(!$image_path) {
                return response()->json(['message' => 'Error storing the image'], 500);
            }

            deleteImage($productImage->image);
            $data['image'] = $image_path;
            $productImage->update($data);

        } catch(\Exception $e) {

            return response()->json(['message' => 'Error storing the image'], 500);
        }

        return response()->json(['message' => 'Image updated successfully']);
    }

    public function destroy($id)
    {
        $productImage = ProductImage::findOrFail($id);
        $productImage->delete();
        return response()->json(['message' => 'Image deleted successfully']);
    }
}
