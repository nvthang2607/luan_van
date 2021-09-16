<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BranchProduct extends Model
{
    use HasFactory;
    protected $table ="branch_product";
    public function product(){
        return $this->hasMany('App\Models\Product','id_branch','id');
    }
}
