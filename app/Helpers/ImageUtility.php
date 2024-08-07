<?php

use Illuminate\Http\UploadedFile;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

if(!function_exists('uploadImage')) {
    function uploadImage(UploadedFile $image, string $path): string|null
    {

        checkFolderExists($path);
        $manager = new ImageManager(new Driver());
        $name = hexdec(uniqid()).'.'.$image->getClientOriginalExtension();
        $image_path = 'uploads/products/'.$name;

        return $image = $manager->read($image)->save($image_path) ? $image_path : null;

    }

}
