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
            $rate5=$rate4=$rate3=$rate2=$rate1=0;
            $rate=Rating::where('id_product',$req->id)->get(['ratting']);
            $rate_number=$rate->count();
            $avg=5;
            if($rate_number>0){
                $t=0;
                foreach($rate as $r){
                    switch($r->ratting){
                        case '5':
                            $rate5++;
                        case '4':
                            $rate4++;
                        case '3':
                            $rate3++;
                        case '2':
                            $rate2++;
                        case '1':
                            $rate1++;
                    }
                    $t=$t+$r->ratting;
                }
                $avg=$t/$rate_number;
                $rates=['rate5'=>$rate5,'rate4'=>$rate4,'rate3'=>$rate3,'rate2'=>$rate2,'rate1'=>$rate1];
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
