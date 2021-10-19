<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\BranchProduct;
use App\Models\ImageProduct;
use App\Models\InformationProduct;
use App\Models\Promotion;
use App\Models\BillDetail;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Validator;

class ProductController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['get_product_id','post_product_filter','post_product_rating','post_product']]);
    }
    public function get_product_id(request $req){
        $product=Product::find($req->id);
        if($product){
            $images=[];
            $informations=[];
            $rates=[];
            $promotions=[];
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
                $branch=BranchProduct::where('id_type',$req->id)->get();
                foreach($branch as $i){
                    $data=$i->product;
                    foreach($data as $data){
                        if($data->active==1){
                            $datas[]=$data;
                        }
                    }
                }
                break;
            case 'branch':
                $product=Product::where('id_branch',$req->id)->where('active',1)->get();
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

    public function post_product(request $req){
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

    public function get_list_product(request $req){
        if(Auth()->user()->isadmin=='user'){
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
        $datas=collect();
        if($req->id==null){
            $product=Product::all();
            foreach($product as $i){
                $datas[]=$i;
            }
        }
        else{
            $type=$req->type;
            $id=$req->id;
            switch($type){
                case 'type':
                    $branch=BranchProduct::where('id_type',$req->id)->get();
                    foreach($branch as $i){
                        $data=$i->product;
                        foreach($data as $data){
                            $datas[]=$data;
                        }
                    }
                    break;
                case 'branch':
                    $product=Product::where('id_branch',$req->id)->get();
                    foreach($product as $i){
                        $datas[]=$i;
                    }
                    break;
            }
        }
        $n=$datas->count();
        $datas=$datas->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
        $data2=collect();
        foreach($datas as $i){
            $id=$i->id;
            $name=$i->name;
            $id_branch=$i->id_branch;
            $name_branch=$i->branch->name;
            $id_type=$i->branch->id_type;
            $name_type=$i->branch->typeproduct->name;
            $quantity=$i->quantity;
            $unitprice=$i->unit_price;
            $promotionprice=$i->promotion_price;
            $count=$i->count;
            $active=$i->active;
            $informations=$i->information_product;
            $images=Product::find($i->id)->image_product()->get();
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
            $data2[count($data2)]=[
                'id'=>$id,
                'name'=>$name,
                'id_branch'=>$id_branch,
                'name_branch'=>$name_branch,
                'id_type'=>$id_type,
                'name_type'=>$name_type,
                'quantity'=>$quantity,
                'quantity'=>$quantity,
                'promotionprice'=>$promotionprice,
                'count'=>$count,
                'active'=>$active,
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

    public function delete_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $product=BranchProduct::find($req->id_product);
            if($product!=null){
                $product->delete();
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else {
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Không tìm thấy thương hiệu sản phẩm!'], 401);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }
    public function post_admin_create_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $validator = Validator::make($req->all(), [
                'id_branch'=>'required|exists:branch_product,id',
                'name' => 'required|unique:product,name',
                'quantity'=>'required',
                'unit_price'=>'required',
                'promotion_price'=>'required',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
            }
            $product=new Product;
            $product->fill($req->input())->save();
            if($product->save()){
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else {
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Có lỗi trong lúc thêm!'], 401);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
        
    }

    public function patch_admin_update_branch_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $validator = Validator::make($req->all(), [
                'id_branch'=>'required|exists:branch_product,id',
                'name' => 'required|unique:product,name',
                'quantity'=>'required',
                'unit_price'=>'required',
                'promotion_price'=>'required',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
            }
            $product=Product::find($req->id);
            if($product->fill($req->input())->save()){
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else{
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Có lỗi trong lúc đổi!'], 401);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }


    public function get_admin_search_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            if($req->search==null){
                $product=Product::all()->sortByDesc("id");;
            }
            else{
                $product=Product::where('name','like','%'.$req->search.'%')->orwhere('id',$req->search)->orderBy('id', 'DESC')->get();
            }
            if(count($product)>0){
                $n=$product->count();
                $data=$product->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
                $data2=collect();
                foreach($data as $i){
                    $id=$i->id;
                    $name=$i->name;
                    $id_branch=$i->id_branch;
                    $name_branch=$i->branch->name;
                    $id_type=$i->branch->id_type;
                    $name_type=$i->branch->typeproduct->name;
                    $quantity=$i->quantity;
                    $unitprice=$i->unit_price;
                    $promotionprice=$i->promotion_price;
                    $count=$i->count;
                    $active=$i->active;
                    $informations=$i->information_product;
                    $images=Product::find($i->id)->image_product()->get();
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
                    $data2[count($data2)]=[
                        'id'=>$id,
                        'name'=>$name,
                        'id_branch'=>$id_branch,
                        'name_branch'=>$name_branch,
                        'id_type'=>$id_type,
                        'name_type'=>$name_type,
                        'quantity'=>$quantity,
                        'quantity'=>$quantity,
                        'promotionprice'=>$promotionprice,
                        'count'=>$count,
                        'active'=>$active,
                        'informations'=>$informations,
                        'images'=>$images,
                        'avg'=>$avg,
                        'rate'=>$rate,
                        'rate_number'=>$rate_number,
                        'promotions'=>$promotions,
                    ];
                }
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data2]], 200);
            }else{
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>0,'listData'=>[]]], 200);
            }
            
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }

    }
}
