<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\TypeProduct;
class TypeProductController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['type_product_select_list']]);
    }
    public function type_product_select_list(Request $req){
        $type_product=TypeProduct::all('id','name');
        if(count($type_product)>0){
            $data=[];
            $u=0;
            foreach($type_product as $i){
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
