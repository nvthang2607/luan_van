<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InformationProduct extends Model
{
    use HasFactory;
    protected $table ="information_product";
    public function product(){
        return $this->belongsTo('App\Models\Product','id_product','id');
    }
}
