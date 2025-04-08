<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class DataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json_products_data = file_get_contents(database_path('data/products.json'));
        $products_data = json_decode($json_products_data, true);

        $json_categories_data = file_get_contents(database_path('data/categories.json'));
        $categories_data = json_decode($json_categories_data, true);

        foreach ($categories_data as $category_data) {
            Category::create($category_data);
        }

        foreach ($products_data as $product_data) {
            Product::create($product_data);
        }


    }
}
