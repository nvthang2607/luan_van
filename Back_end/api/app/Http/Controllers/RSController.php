<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Models\Product;
use App\Models\Rating;
use App\Models\ImageProduct;
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
        $n=$output->count();
        $output=$output->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
        if($output->count()>0){
            $data=[];
            $u=0;
            foreach($output as $i){
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
                $data[$u]=[$product,'rate_number'=>$rate_number,'avg'=>$avg,'image'=>$image];
                $u++;
            }
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
        }
        return response()->json(['errorCode'=> 3,'data'=>null], 404);
   }
}