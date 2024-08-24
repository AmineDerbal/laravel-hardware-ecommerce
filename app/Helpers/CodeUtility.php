<?php

use App\Models\Category;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Support\Facades\File;

if (!function_exists('idGenerate')) {

    function idGenerate(string $table, string $prefix, int $length = 10, string $field = 'code'): string
    {

        return IdGenerator::generate([
          'table' => $table,
          'field' => $field,
          'length' => $length,
          'prefix' => $prefix
  ]);
    }

}

if(!function_exists('checkFolderExists')) {
    function checkFolderExists(string $path): void
    {
        if (!File::exists($path)) {
            File::makeDirectory($path, 0755, true, true);
        }
    }
}

if(!function_exists('getChildrenRecursive')) {
    function getChildrenRecursive(Category $category, array &$childrenArray): void
    {

        foreach ($category->children as $child) {
            $childrenArray[] = [
                'name' => $child->name,
                'slug' => $child->slug
            ];
            if ($child->children->isNotEmpty()) {
                getChildrenRecursive($child, $childrenArray);
            }
        }

    }
}



if(!function_exists('buildCategoryChildrenPath')) {
    function buildCategoryChildrenPath(Category $category): array
    {
        $childrenArray = [[
            'name' => $category->name,
            'slug' => $category->slug
        ]];
        getChildrenRecursive($category, $childrenArray);

        return $childrenArray;
    }
}
