<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Rating;
use App\Models\ImageProduct;
use App\Models\InformationProduct;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['get_product_id']]);
    }
    public function get_product_id(request $req){
        $product=Product::find($req->id);
        if($product){
            $images=[];
            $informations=[];
            $rates=[];
            $image_key=ImageProduct::where('id_product',$req->id)->pluck('image')->first();
            $image=ImageProduct::where('id_product',$req->id)->get('image');
            $image=$image->slice(1);
            foreach($image as $i){
                $images[]=$i->image;
            }
            $information=InformationProduct::where('id_product',$req->id)->get(['name','content']);
            foreach($information as $i){
                $informations[count($informations)]=['name'=>$i->name,'value'=>$i->content];
            }
            $rate=Rating::where('id_product',$req->id)->get(['ratting']);
            $rate5=Rating::where('id_product',$req->id)->where('ratting',5)->get();
            $rate4=Rating::where('id_product',$req->id)->where('ratting',4)->get();
            $rate3=Rating::where('id_product',$req->id)->where('ratting',3)->get();
            $rate2=Rating::where('id_product',$req->id)->where('ratting',2)->get();
            $rate1=Rating::where('id_product',$req->id)->where('ratting',1)->get();
            $rate_number=$rate->count();
            $avg=5;
            if($rate_number>0){
                $t=0;
                foreach($rate as $r){
                    $t=$t+$r->ratting;
                }
                $avg=$t/$rate_number;
                $rates=['rate5'=>$rate5->count(),'rate4'=>$rate4->count(),'rate3'=>$rate3->count(),'rate2'=>$rate2->count(),'rate1'=>$rate1->count()];
            }
            $data=[
                'item'=>$product,
                'image'=>$images,
                'information'=>$informations,
                'rate_number'=>$rate_number,
                'avg'=>$avg,
                'rate'=>$rates,
                'image_key'=>$image_key,


            ];
            return response()->json(['errorCode'=> null,'data'=>$data], 200);
            }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null], 404);
        }
    }
}
