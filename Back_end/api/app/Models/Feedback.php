<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;
    protected $table ="feed_back";
    protected $fillable = [
        'id_comment',
        'email',
        'comment',
    ];
    protected $casts = [
        'created_at'  => 'datetime:Y/m/d H:i:s',
        'updated_at' => 'datetime:Y/m/d H:i:s',
    ];
    public function comment2(){
        return $this->belongsTo('App\Models\Comment','id_comment','id');
    }
}
