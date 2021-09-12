<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['post_order_create']]);
    }

    public function post_order_create(Request $req){
        
    }
}
