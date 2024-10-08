<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'image',
    ];

    protected $appends = ['image_url'];

    public static function booted()
    {
        static::deleting(function ($model) {
            deleteImage($model->image);
        });
    }
    public function getImageUrlAttribute()
    {
        return asset($this->image);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
