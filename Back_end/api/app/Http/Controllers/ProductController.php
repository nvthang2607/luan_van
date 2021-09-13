<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\ImageProduct;
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
            $images=[];
            $image=ImageProduct::where('id_product',$req->id)->get('image');
            foreach($image as $i){
                $images[count($images)]=$i->image;
            }
            $data=[$product,'image'=>$images];
            return response()->json(['errorCode'=> null,'data'=>$data], 200);
            }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null], 404);
        }
    }
}
