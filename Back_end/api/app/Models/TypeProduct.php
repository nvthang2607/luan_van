<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeProduct extends Model
{
    use HasFactory;
    protected $table ="type_product";
    public function brandproduct(){
        return $this->hasMany('App\Models\BrandProduct','id_type','id');
    }
}
