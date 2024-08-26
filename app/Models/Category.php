<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'parent_id',
        'code'
    ];


    public static function booted()
    {
        static::creating(function ($model) {

            $model->slug = Str::slug($model->name);

        });
        static::updating(function ($model) {
            $model->slug = Str::slug($model->name);

        });
    }

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }


}
