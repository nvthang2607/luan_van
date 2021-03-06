<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\BrandProduct;
use App\Models\ImageProduct;
use App\Models\InformationProduct;
use App\Models\Promotion;
use App\Models\BillDetail;
use App\Models\TypeProduct;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Validator;

class ProductController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['get_product_id','post_product_filter','post_product_rating','post_product','post_smartphone_sell','post_top_rate','post_the_same']]);
    }
    public function get_product_id(request $req){
        $product=Product::find($req->id);
        if($product){
            $images=[];
            $informations=[];
            $rates=[];
            $promotions=[];
            $description=$product->description;
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
            $rate=BillDetail::where('id_product',$req->id)->where('rate','>',0)->get(['rate']);
            $rate5=BillDetail::where('id_product',$req->id)->where('rate',5)->get();
            $rate4=BillDetail::where('id_product',$req->id)->where('rate',4)->get();
            $rate3=BillDetail::where('id_product',$req->id)->where('rate',3)->get();
            $rate2=BillDetail::where('id_product',$req->id)->where('rate',2)->get();
            $rate1=BillDetail::where('id_product',$req->id)->where('rate',1)->get();
            $rate_number=$rate->count();
            $avg=5;
            if($rate_number>0){
                $t=0;
                foreach($rate as $r){
                    $t=$t+$r->rate;
                }
                $avg=$t/$rate_number;
                $rates=['rate5'=>$rate5->count(),'rate4'=>$rate4->count(),'rate3'=>$rate3->count(),'rate2'=>$rate2->count(),'rate1'=>$rate1->count()];
            }
            $promotion=Promotion::where('id_product',$req->id)->where('start','<=',Carbon::now('Asia/Ho_Chi_Minh'))->where('finish','>=',Carbon::now('Asia/Ho_Chi_Minh'))->get();
            foreach($promotion as $i){
                $promotions[count($promotions)]=$i;
            }
            $data=[
                'item'=>$product,
                'image'=>$images,
                'information'=>$informations,
                'rate_number'=>$rate_number,
                'avg'=>$avg,
                'rate'=>$rates,
                'image_key'=>$image_key,
                'promotion'=>$promotions,
                'description'=>$description,
            ];
            return response()->json(['errorCode'=> null,'data'=>$data], 200);
            }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null], 404);
        }
    }

    public function post_product_filter(request $req){
        $type=$req->type;
        $id=$req->id;
        $pice=$req->piceAbout;
        $datas=collect();
        switch($type){
            case 'type':
                $brand=BrandProduct::where('id_type',$req->id)->get();
                foreach($brand as $i){
                    $data=$i->product;
                    foreach($data as $data){
                        if($data->active==1){
                            $datas[]=$data;
                        }
                    }
                }
                break;
            case 'brand':
                $product=Product::where('id_brand',$req->id)->where('active',1)->get();
                foreach($product as $i){
                    $datas[]=$i;
                }
                break;
            
        }
        $n=$datas->count();
        $data1=collect();
        $i=0;
        $result=collect();
        if(count($pice)>0){
            while(isset($pice[$i])){
                $str = $pice[$i];
                $t=strpos($str,'-');
                if($t!=false){
                    $value=explode("-", $str);
                    foreach($datas as $data){
                        if($data->promotion_price>0){
                            if($data->promotion_price>=$value[0]&&$data->promotion_price<=$value[1]){
                                $result[]=$data;
                            }
                        }
                        else{
                            if($data->unit_price>=$value[0]&&$data->unit_price<=$value[1]){
                                $result[]=$data;
                            }
                        }
                    }
                }
                else{
                    $t=substr($str,  0, 1);
                    $value=substr($str,  1, strlen($str)-1);
                    if($t=='>'){
                        foreach($datas as $data){
                            if($data->promotion_price>$value){
                                if($data->promotion_price>$value){
                                    $result[]=$data;
                                }
                            }
                            else{
                                if($data->unit_price>$value){
                                    $result[]=$data;
                                }
                            }
                        }  
                    }
                    if($t=='<'){
                        foreach($datas as $data){
                            if($data->promotion_price<$value){
                                if($data->promotion_price<$value){
                                    $result[]=$data;
                                }
                            }
                            else{
                                if($data->unit_price<$value){
                                    $result[]=$data;
                                }
                            }
                        }
                    }  
                }
                $data1=$result->merge($data1);
                $data1=$data1->unique('id');
                $i++;
            }
            $n=$data1->count();
            $data1=$data1->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
            $data2=[];
            foreach($data1 as $i){
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
                foreach($promotion as $u){
                    $promotions[count($promotions)]=$u;
                }
                $data2[count($data2)]=[$i,'rate_number'=>$rate_number,'avg'=>$avg,'image'=>$image,'promotion'=>$promotions];
            }
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data2]], 200);
        }
        else{
            
            $datas=$datas->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
            $data2=[];
            foreach($datas as $i){
                $promotions=[];
                $image=Product::find($i->id)->image_product()->pluck('image')->first();
                $rate=BillDetail::where('id_product',$i->id)->get(['rate']);
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
                foreach($promotion as $u){
                    $promotions[count($promotions)]=$u;
                }
                $data2[count($data2)]=[$i,'rate_number'=>$rate_number,'avg'=>$avg,'image'=>$image,'promotion'=>$promotions];
            }
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data2]], 200);
        }
        
    }


    public function post_product_rating(request $req){
        $product=Product::find($req->id);
        if($product){
            $data=[];
            $rating=BillDetail::where('id_product',$req->id)->where('rate','>',0);
            $n=$rating->count();
            $rating=$rating->skip(($req->page-1)*$req->pageSize)->take($req->pageSize)->get();
            if($n>0){
                foreach($rating as $i){
                    $id=$i->id;
                    $email=$i->bill->customer->email;
                    $id_user=User::where('email',$email)->pluck('id')->first();
                    $rating=$i->rate;
                    $comment=$i->comment;
                    $date= $i->created_at;
                    $date = Carbon::parse($date);
                    $day=$date->day;
                    $month=$date->month;
                    $year=$date->year;
                    $date=$day.'/'.$month.'/'.$year;
                    $data[count($data)]=[
                        'id'=>$id,
                        'id_user'=>$id_user,
                        'email_user'=>$email,
                        'date'=>$date,
                        'rating'=>$rating,
                        'comment'=>$comment,
                    ];
                }
                return response()->json(['errorCode'=> null, 'data'=>['total'=>$n,'listdata'=>$data]],200);
            }
            else{
                return response()->json(['errorCode'=> null, 'data'=>['total'=>$n,'listdata'=>$data]],200);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null], 404);
        }
    }

    public function post_product(request $req){//abc
        if($req->type=='new'){
            $product=Product::all()->sortByDesc("id");
        }
        elseif($req->type=='sell'){
            $product=Product::all()->sortByDesc("count");
        }
        else{
            $product=Product::where('promotion_price','>',0)->orderBy('updated_at', 'DESC')->get();
        }
        $n=$product->count();
        $data=[];
        $datas=$product->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
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
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>[]]], 200);
        }
    }

    public function get_admin_list_product(request $req){
        if(Auth()->user()->isadmin=='user'){
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }
        $datas=collect();

        if($req->id==null){
            $product=Product::where('name','like','%'.$req->search.'%')->get();
            foreach($product as $i){
                $datas[]=$i;
            }
        }
        else{
            $type=$req->type;
            $id=$req->id;
            switch($type){
                case 'type':
                    $brand=BrandProduct::where('id_type',$req->id)->where('name','like','%'.$req->search.'%')->get();
                    foreach($brand as $i){
                        $data=$i->product;
                        foreach($data as $data){
                            $datas[]=$data;
                        }
                    }
                    break;
                case 'brand':
                    $product=Product::where('id_brand',$req->id)->where('name','like','%'.$req->search.'%')->get();
                    foreach($product as $i){
                        $datas[]=$i;
                    }
                    break;
            }
        }
        if($req->active=='active'){
            $datas= $datas->where('active',1);
        }
        elseif($req->active=='noactive'){
            $datas= $datas->where('active',0);
        }
        $n=$datas->count();
        $datas=$datas->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
        $data2=collect();
        foreach($datas as $i){
            $id=$i->id;
            $name=$i->name;
            $id_brand=$i->id_brand;
            $name_brand=$i->brand->name;
            $id_type=$i->brand->id_type;
            $name_type=$i->brand->typeproduct->name;
            $quantity=$i->quantity;
            $unitprice=$i->unit_price;
            $promotionprice=$i->promotion_price;
            $description=$i->description;
            $count=$i->count;
            $active=$i->active;
            $informations=$i->information_product;
            //$informations->updated_at->format('Y/m/d H:i:s');
            foreach($informations as $t){
                $t->created_at->format('Y/m/d H:i:s');
                $t->updated_at ->format('Y/m/d H:i:s');
            }
            $date= $i->created_at;
            $date = $date->format('Y/m/d H:i:s');
            $date1= $i->updated_at;
            $date1 = $date1->format('Y/m/d H:i:s');
            $images=Product::find($i->id)->image_product()->get();
            foreach($images as $t){
                $t->created_at->format('Y/m/d H:i:s');
                $t->updated_at ->format('Y/m/d H:i:s');
            }
            $rate=BillDetail::where('id_product',$i->id)->get(['rate']);
            $rate_number=$rate->count();
            $avg=5;
            if($rate_number>0){
                $t=0;
                foreach($rate as $r){
                    $t=$t+$r->rate;
                }
                $avg=$t/$rate_number;
            }
            $promotions=Promotion::where('id_product',$i->id)->get();
            foreach($promotions as $t){
                $t->created_at->format('Y/m/d H:i:s');
                $t->updated_at ->format('Y/m/d H:i:s');
            }
            $data2[count($data2)]=[
                'id'=>$id,
                'name'=>$name,
                'id_brand'=>$id_brand,
                'name_brand'=>$name_brand,
                'id_type'=>$id_type,
                'name_type'=>$name_type,
                'quantity'=>$quantity,
                'unitprice'=>$unitprice,
                'promotionprice'=>$promotionprice,
                'description'=>$description,
                'count'=>$count,
                'active'=>$active,
                'created_at'=>$date,
                'updated_at'=>$date1,
                'informations'=>$informations,
                'images'=>$images,
                'avg'=>$avg,
                'rate'=>$rate,
                'rate_number'=>$rate_number,
                'promotions'=>$promotions,
            ];
        }
        return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data2]], 200);
    }

    public function get_admin_active_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $product=Product::find($req->id_product);
            if($product!=null){
                if($product->active==0){
                    $product->active=1;
                }
                else{
                    $product->active=0;
                }
                $product->save();
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else {
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Kh??ng t??m th???y s???n ph???m!'], 401);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }
    }
    public function post_admin_create_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $validator = Validator::make($req->all(), [
                'id_brand'=>'required|exists:brand_product,id',
                'name' => 'required|unique:product,name',
                'quantity'=>'required',
                'unit_price'=>'required',
                'promotion_price'=>'required',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
            }
            $product=new Product;
            if($product->fill($req->input())->save()){
                $id_product=Product::max('id');
                return response()->json(['errorCode'=> null,'data'=>$id_product], 200);
            }
            else {
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'C?? l???i trong l??c th??m!'], 401);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }
        
    }

    public function patch_admin_update_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $validator = Validator::make($req->all(), [
                'id_brand'=>'exists:brand_product,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
            }
            $product=Product::find($req->id);
            if($product->fill($req->input())->save()){
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else{
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'C?? l???i trong l??c ?????i!'], 401);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }
    }

    public function patch_admin_update_quantity_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'||Auth()->user()->isadmin=='warehouse'){
            $validator = Validator::make($req->all(), [
                'id_product'=>'required|exists:product,id',
                'quantity'=>'required|gt:0'
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
            }
            $product=Product::find($req->id_product);
            $product->quantity=$product->quantity+$req->quantity;
            if($product->save()){
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else{
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'C?? l???i trong l??c ?????i!'], 401);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }
    }
    public function post_smartphone_sell(request $req){//abc
        $datas=collect();
        $brand=BrandProduct::where('id_type',1)->get();
        foreach($brand as $i){
            $product=Product::where('id_brand',$i->id)->where('active',1)->get();
            foreach($product as $product){
                $datas[]=$product;
            }
        }
        $datas=$datas->sortByDesc("count");
        $data2=collect();
        foreach($datas as $i){
            $promotions=[];
            $image=Product::find($i->id)->image_product()->pluck('image')->first();
            $rate=BillDetail::where('id_product',$i->id)->get(['rate']);
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
            foreach($promotion as $u){
                $promotions[count($promotions)]=$u;
            }
            $data2[]=[$i,'rate_number'=>$rate_number,'avg'=>$avg,'image'=>$image,'promotion'=>$promotions];

        }

        
        
        $n=$data2->count();
        $data2=$data2->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
        $data=[];
        foreach($data2 as $data2){
            $data[count($data)]=$data2;
        }
        return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
    }

    public function post_top_rate(request $req){
        $datas=Product::where('active',1)->get();
        $data2=collect();
        foreach($datas as $i){
            $promotions=[];
            $image=Product::find($i->id)->image_product()->pluck('image')->first();
            $rate=BillDetail::where('id_product',$i->id)->get(['rate']);
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
            foreach($promotion as $u){
                $promotions[count($promotions)]=$u;
            }
            $data2[]=[$i,'rate_number'=>$rate_number,'avg'=>$avg,'image'=>$image,'promotion'=>$promotions];

        }
        $data2 = $data2->sortByDesc('avg');
        $n=$data2->count();
        $data2=$data2->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
        $data1=[];
        foreach($data2 as $i){
            $data1[count($data1)]=$i;
        }
        return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data1]], 200);
    }
    public function post_the_same(request $req){
        $product=Product::find($req->id_product);
        $products=$product->brand->product->sortByDesc('id');
        $data2=collect();
        foreach($products as $i){
            if($req->id_product==$i->id){
                continue;
            }
            if($i->active!=1){
                continue;
            }
            $promotions=[];
            $image=Product::find($i->id)->image_product()->pluck('image')->first();
            $rate=BillDetail::where('id_product',$i->id)->get(['rate']);
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
            foreach($promotion as $u){
                $promotions[count($promotions)]=$u;
            }
            $data2[]=[$i,'rate_number'=>$rate_number,'avg'=>$avg,'image'=>$image,'promotion'=>$promotions];

        }
        $data2=$data2->sortByDesc('id');
        $n=$data2->count();
        $data2=$data2->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
        $data1=[];
        foreach($data2 as $i){
            $data1[count($data1)]=$i;
        }
        return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data1]], 200);
    }
}
