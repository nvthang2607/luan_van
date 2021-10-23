<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    use HasFactory;
    protected $table ="bill";
    protected $casts = [
        'created_at'  => 'datetime:Y/m/d H:i:s',
        'updated_at' => 'datetime:Y/m/d H:i:s',
    ];
    public function customer(){
        return $this->belongsTo('App\Models\Customer','id_customer','id');
    }
    public function billdetail(){
        return $this->hasMany('App\Models\BillDetail','id_bill','id');
    }
    public function status(){
        return $this->hasMany('App\Models\Status','id_bill','id');
    }
}
