<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\News;
use App\Models\Rating;
use App\Models\ImageProduct;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['get_search_product_news']]);
    }
    public function get_search_product_news(Request $req){
        if($req->type=='product'){
            $product=Product::where('name','like','%'.$req->search.'%')->get();
            $n=$product->count();
            $datas=Product::where('name','like','%'.$req->search.'%')->skip(($req->page-1)*$req->pageSize)->take($req->pageSize)->get();
            if(count($datas)>0){
                $data=[];
                $u=0;
                foreach($datas as $i){
                    $image=Product::find($i->id)->image_product()->pluck('image')->first();
                    $rate=Rating::where('id_product',$i->id)->get(['ratting']);
                    $rate_number=$rate->count();
                    $avg=5;
                    if($rate_number>0){
                        $t=0;
                        foreach($rate as $r){
                            $t=$t+$r->ratting;
                        }
                        $avg=$t/$rate_number;
                    }
                    $data[$u]=[$i,'rate_number'=>$rate_number,'avg'=>$avg,'image'=>$image];
                    $u++;
                }
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
                }
            else{
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>0,'listData'=>[]]], 200);
            }
        }
        if($req->type=='news'){
            $news=News::where('title','like','%'.$req->search.'%')->get();
            $n=$news->count();
            $datas=News::where('title','like','%'.$req->search.'%')->skip(($req->page-1)*$req->pageSize)->take($req->pageSize)->get();
        }
        
    }
}
