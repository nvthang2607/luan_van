<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;
    protected $table ="promotion";
    protected $fillable = [
        'id_product',
        'name',
        'code',
        'value',
        'start',
        'finish'
    ];
    protected $casts = [
        'start'  => 'datetime:Y/m/d H:i:s',
        'finish' => 'datetime:Y/m/d H:i:s',
        'created_at'  => 'datetime:Y/m/d H:i:s',
        'updated_at' => 'datetime:Y/m/d H:i:s',
    ];
    public function product(){
        return $this->belongsTo('App\Models\Product','id_product','id');
    }
}
