<?php

use Illuminate\Http\UploadedFile;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

if(!function_exists('uploadImage')) {
    function uploadImage(UploadedFile $image, string $path): string|null
    {

        checkFolderExists($path);
        $manager = new ImageManager(new Driver());
        $name = hexdec(uniqid()).'.png';
        $image_path = 'uploads/products/'.$name;
        $manager->read($image)->scale(width:800, height:600)->encodeByExtension('png')->save($image_path);

        return  $image_path;

    }
}

if(!function_exists('deleteImage')) {
    function deleteImage(string $path): void
    {
        if(file_exists($path)) {
            unlink($path);
        }
    }
}
