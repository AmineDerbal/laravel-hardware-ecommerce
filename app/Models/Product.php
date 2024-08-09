<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'image',
        'code',
        'category_id',
    ];

    protected $appends = ['image_url'];

    public static function booted()
    {

        static::deleting(function ($product) {


            if(file_exists($product->image)) {
                unlink($product->image);
            }



            foreach($product->images as $image) {
                if(file_exists($image->image)) {
                    unlink($image->image);
                }
            }
        });
    }

    public function getImageUrlAttribute()
    {
        return asset($this->image);
    }

    public function category()
    {

        return $this->belongsTo(Category::class, 'category_id');
    }

    public function images()
    {

        return $this->hasMany(ProductImage::class, 'product_id');
    }

}
