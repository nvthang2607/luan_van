<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;
    protected $table ="status";
    public function bill(){
        return $this->belongsTo('App\Models\Bill','id_bill','id');
    }
    public function admin(){
        return $this->belongsTo('App\Models\User','id_user','id');
    }
}
