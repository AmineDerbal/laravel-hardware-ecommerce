<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','status','code','shipping_fee','tax','total_amount'];
    protected $appends = ['status_label'];

    public const STATUS_LABELS = [
        0 => 'Pending',
        1 => 'Shipped',
        2 => 'Delivered',
        3 => 'Completed',
        4 => 'Cancelled',
    ];

    public function getStatusLabelAttribute()
    {
        return self::STATUS_LABELS[$this->status];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
