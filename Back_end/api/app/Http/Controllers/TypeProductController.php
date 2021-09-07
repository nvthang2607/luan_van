<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\TypeProduct;
use App\Models\BranchProduct;
class TypeProductController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['get_type_product_select_list','get_type_and_branch_select_list']]);
    }
    public function get_type_product_select_list(Request $req){
        $type_product=TypeProduct::all('id','name');
        $n=$type_product->count();
        if(count($type_product)>0){
            $data=[];
            $u=0;
            foreach($type_product as $i){
                $data[$u]=['id'=>$i->id,'name'=> $i->name];
                $u++;
            }
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
            }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null], 404);
        }
    }
    public function get_type_and_branch_select_list(request $req){
        $type_product=TypeProduct::all('id','name');
        $n=$type_product->count();
        if(count($type_product)>0){
            $data=[];
            $u=0;
            foreach($type_product as $i){
                $branch_product=BranchProduct::where('id_type',$i->id)->get(['id','name']);
                $data2=[];
                $u2=0;
                foreach($branch_product as $i2){
                    $data2[$u2]=['id'=>$i2->id,'name'=>$i2->name];
                    $u2++;
                }
                $data[$u]=['id'=>$i->id,'name'=> $i->name,'branch'=>$data2];
                $u++;
            }
            return response()->json(['errorCode'=> null,'data'=>$data], 200);
            }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null], 404);
        }
    }
}
