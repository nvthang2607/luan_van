<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $table ="comment";
    protected $fillable = [
        'id_product',
        'email',
        'comment',
    ];
    protected $casts = [
        'created_at'  => 'datetime:Y/m/d H:i:s',
        'updated_at' => 'datetime:Y/m/d H:i:s',
    ];
    public function product(){
        return $this->belongsTo('App\Models\Product','id_product','id');
        
    }
    public function feedback(){
        return $this->hasMany('App\Models\Feedback','id_comment','id');
    }
    
}
