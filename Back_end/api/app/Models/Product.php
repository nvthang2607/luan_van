<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table ="product";
    public function image_product(){
        return $this->hasMany('App\Models\ImageProduct','id_product','id');
    }
}
