<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BranchProduct;
use App\Models\Product;
class BranchProductController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['post_branch_product_select_list','get_branch_product_select_list']]);
    }
    public function post_branch_product_select_list(Request $req){
        $branch_product=BranchProduct::where('id_type',$req->idType)->get(['id','name']);
        if(count($branch_product)>0){
            $data=[];
            $u=0;
            foreach($branch_product as $i){
                $data[$u]=['id'=>$i->id,'name'=> $i->name];
                $u++;
            }
            return response()->json(['errorCode'=> null,'data'=>$data], 200);
            }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null], 404);
        }
    }
    public function get_branch_product_select_list(Request $req){
        $product=Product::where('id_branch',$req->idBranch)->skip(($req->page-1)*$req->pageSize)->take($req->pageSize)->get();
        if(count($product)>0){
            $data=[];
            $u=0;
            foreach($product as $i){
                $data[$u]=['id'=>$i->id,'name'=> $i->name];
                $u++;
            }
            return response()->json(['errorCode'=> null,'data'=>$data], 200);
            }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null], 404);
        }
    }
}
