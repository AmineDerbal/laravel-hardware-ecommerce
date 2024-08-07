<?php

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
