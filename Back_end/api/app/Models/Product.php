<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    
    use HasFactory;
    protected $fillable = ['id_brand','name','quantity','description','unit_price','promotion_price','active','count'];
    protected $table ="product";
    protected $casts = [
        'created_at'  => 'datetime:Y/m/d H:i:s',
        'updated_at' => 'datetime:Y/m/d H:i:s',
    ];
    public function brand(){
        return $this->belongsTo('App\Models\BrandProduct','id_brand','id');
    }
    public function image_product(){
        return $this->hasMany('App\Models\ImageProduct','id_product','id');
    }
    public function information_product(){
        return $this->hasMany('App\Models\InformationProduct','id_product','id');
    }
    public function comment(){
        return $this->hasMany('App\Models\Comment','id_product','id');
    }
    public function promotion(){
        return $this->hasMany('App\Models\Promotion','id_product','id');
    }
    public function billdetail(){
        return $this->hasMany('App\Models\BillDetail','id_product','id');
    }
    public function slide(){
        return $this->hasOne('App\Models\Slide','id_product','id');
    }
}
