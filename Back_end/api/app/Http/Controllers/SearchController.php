<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\News;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['get_search_product_news']]);
    }
    public function get_search_product_news(Request $req){
        if($req->type=='product'){
            $datas=Product::where('name','like','%'.$req->search.'%')->skip(($req->page-1)*$req->pageSize)->take($req->pageSize)->get();
        }
        if($req->type=='news'){
            $datas=News::where('title','like','%'.$req->search.'%')->skip(($req->page-1)*$req->pageSize)->take($req->pageSize)->get();
        }
        $n=$datas->count();
        if(count($datas)>0){
            $data=[];
            $u=0;
            foreach($datas as $i){
                $data[$u]=$i;
                $u++;
            }
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
            }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null], 404);
        }
    }
}
