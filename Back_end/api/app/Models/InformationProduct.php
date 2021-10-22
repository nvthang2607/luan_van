<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InformationProduct extends Model
{
    use HasFactory;
    protected $table ="information_product";
    protected $fillable = [
        'id_product',
        'name',
        'content',
    ];
    protected $casts = [
        
        'created_at'  => 'datetime:Y/m/d H:i:s',
        'updated_at' => 'datetime:Y/m/d H:i:s',
    ];
    public function product(){
        return $this->belongsTo('App\Models\Product','id_product','id');
    }
}
