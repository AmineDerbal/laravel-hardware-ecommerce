<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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
        static::creating(function ($model) {

            $model->slug = Str::slug($model->name);
        });

        static::updating(function ($model) {
            $model->slug = Str::slug($model->name);
        });

        static::deleting(function ($product) {

            deleteImage($product->image);

            foreach($product->images as $image) {

                deleteImage($image->image);
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
