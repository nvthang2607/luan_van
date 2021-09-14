<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;
    protected $table ="feed_back";
    public function comment(){
        return $this->belongsTo('App\Models\Comment','id_comment','id');
    }
}
