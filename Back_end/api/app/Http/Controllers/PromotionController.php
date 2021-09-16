<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Promotion;
use Carbon\Carbon;

class PromotionController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['post_promotion_check']]);
    }
    public function post_promotion_check(request $req){
        $promotion=Promotion::where('id_product',$req->id_product)->where('code',$req->code)->where('start','<=',Carbon::now('Asia/Ho_Chi_Minh'))->where('finish','>=',Carbon::now('Asia/Ho_Chi_Minh'))->get();
        if($promotion){
            return response()->json(['errorCode'=> null, 'data'=>$promotion],200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null], 404);
        }
    }
}
