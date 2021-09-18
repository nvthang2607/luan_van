<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\News;
use App\Models\ImageProduct;
use App\Models\Promotion;
use App\Models\BillDetail;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['get_search_product_news']]);
    }
    public function get_search_product_news(Request $req){
        $data=[];
        if($req->type=='product'){
            $product=Product::where('name','like','%'.$req->search.'%')->where('active',1)->get();
            $n=$product->count();
            $datas=Product::where('name','like','%'.$req->search.'%')->where('active',1)->orderByDesc('id')->skip(($req->page-1)*$req->pageSize)->take($req->pageSize)->get();
            if(count($datas)>0){
                $u=0;
                foreach($datas as $i){
                    $promotions=[];
                    $image=Product::find($i->id)->image_product()->pluck('image')->first();
                    $rate=BillDetail::where('id_product',$i->id)->where('rate','>',0)->get(['rate']);
                    $rate_number=$rate->count();
                    $avg=5;
                    if($rate_number>0){
                        $t=0;
                        foreach($rate as $r){
                            $t=$t+$r->rate;
                        }
                        $avg=$t/$rate_number;
                    }
                    $promotion=Promotion::where('id_product',$i->id)->where('start','<=',Carbon::now('Asia/Ho_Chi_Minh'))->where('finish','>=',Carbon::now('Asia/Ho_Chi_Minh'))->get();
                    foreach($promotion as $m){
                        $promotions[count($promotions)]=$m;
                    }
                    $data[$u]=[$i,'rate_number'=>$rate_number,'avg'=>$avg,'image'=>$image,'promotion'=>$promotions];
                    $u++;
                }
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
                }
            else{
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>0,'listData'=>[]]], 200);
            }
        }
        elseif($req->type=='news'){
            $news=News::where('title','like','%'.$req->search.'%')->get();
            $n=$news->count();
            $datas=News::where('title','like','%'.$req->search.'%')->skip(($req->page-1)*$req->pageSize)->take($req->pageSize)->get();
            if(count($datas)>0){
                $u=0;
                foreach($datas as $i){
                    $data[$u]=$i;
                    $u++;
                }
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
                }
            else{
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>0,'listData'=>[]]], 200);
            }
        }
        else{
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>0,'listData'=>[]]], 200);
        }
    }
}
