<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['get_product_search','get_product_id']]);
    }
    public function get_product_search(Request $req){
        $product=Product::where('name','like','%'.$req->search.'%')->skip(($req->page-1)*$req->pageSize)->take($req->pageSize)->get();
        $n=$product->count();
        if(count($product)>0){
            $data=[];
            $u=0;
            foreach($product as $i){
                $data[$u]=$i;
                $u++;
            }
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
            }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null], 404);
        }
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
