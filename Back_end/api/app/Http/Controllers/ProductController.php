<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['get_product_id']]);
    }
    public function get_product_id(request $req){
        $product=Product::find($req->id);
        if($product){
            $data=$product;
            return response()->json(['errorCode'=> null,'data'=>$data], 200);
            }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null], 404);
        }
    }
}
