<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageProduct extends Model
{
    use HasFactory;
    protected $table ="image_product";
    public function product(){
        return $this->belongsTo('App\Models\Product','id_product','id');
    }
}
