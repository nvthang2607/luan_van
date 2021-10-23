<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillDetail extends Model
{
    use HasFactory;
    protected $table ="bill_detail";
    protected $casts = [
        'created_at'  => 'datetime:Y/m/d H:i:s',
        'updated_at' => 'datetime:Y/m/d H:i:s',
    ];
    public function bill(){
        return $this->belongsTo('App\Models\Bill','id_bill','id');
    }
    public function product(){
        return $this->belongsTo('App\Models\Product','id_product','id');
    }
}
