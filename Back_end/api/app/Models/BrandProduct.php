<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BrandProduct extends Model
{
    use HasFactory;
    protected $table ="brand_product";
    protected $fillable = [
        'name',
        'id_type',
    ];
    public function product(){
        return $this->hasMany('App\Models\Product','id_brand','id');
    }
    public function typeproduct(){
        return $this->belongsTo('App\Models\TypeProduct','id_type','id');
    }
}
