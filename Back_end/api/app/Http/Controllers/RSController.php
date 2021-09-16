<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Models\Product;
use App\Models\Rating;
use App\Models\ImageProduct;
use App\Models\Promotion;
use Carbon\Carbon;
class RSController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['post_recommend']]);
    }
    public function post_recommend(Request $req){
        if (!auth()->check()) {
            return response()->json(['errorCode'=> 4, 'data'=>false],401);
        }
        $id=auth()->user()->id;
        exec("python ../public/train_model/rs.py $id",$output,$ret_code);
        // exec("python D:/luan_van/Back_end/api/public/train_model/rs.py $id",$output,$ret_code);
        $output=collect($output);
        $n=0;
        $item=collect();
        foreach($output as $i){
            // if(Product::where('id',$i)->where('active',1)->get('id')){
            //     $item[]=$i;
            // }
            if($u=Product::where('id',$i)->pluck('active')->first()){
                $item[]=$i;
            }
        }
        $n=$item->count();
        $item=$item->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
        if($n>0){
            $data=[];
            $u=0;
            foreach($item as $i){
                $promotions=[];
                $product=Product::find($i);
                $image=Product::find($i)->image_product()->pluck('image')->first();
                $rate=Rating::where('id_product',$i)->get(['ratting']);
                $rate_number=$rate->count();
                $avg=5;
                if($rate_number>0){
                    $t=0;
                    foreach($rate as $r){
                        $t=$t+$r->ratting;
                    }
                    $avg=$t/$rate_number;
                }
                $promotion=Promotion::where('id_product',$i)->where('start','<=',Carbon::now('Asia/Ho_Chi_Minh'))->where('finish','>=',Carbon::now('Asia/Ho_Chi_Minh'))->get();
                foreach($promotion as $m){
                    $promotions[count($promotions)]=$m;
                }
                $data[$u]=[$product,'rate_number'=>$rate_number,'avg'=>$avg,'image'=>$image,'promotion'=>$promotions];
                $u++;
            }
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
            
        }
        return response()->json(['errorCode'=> 3,'data'=>null], 404);
   }
}