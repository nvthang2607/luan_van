<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BrandProduct;
use App\Models\Product;
use Validator;
class BrandProductController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['post_brand_product_select_list','get_brand_product_select_list']]);
    }
    public function post_brand_product_select_list(Request $req){
        $brand_product=BrandProduct::where('id_type',$req->idType)->get(['id','name']);
        $n=$brand_product->count();
        if(count($brand_product)>0){
            $data=[];
            $u=0;
            foreach($brand_product as $i){
                $data[$u]=['id'=>$i->id,'name'=> $i->name];
                $u++;
            }
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
            }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null], 404);
        }
    }
    public function get_brand_product_select_list(Request $req){
        $product=Product::where('id_brand',$req->idBrand)->skip(($req->page-1)*$req->pageSize)->take($req->pageSize)->get();
        $n=$product->count();
        if(count($product)>0){
            $data=[];
            $u=0;
            foreach($product as $i){
                $data[$u]=['id'=>$i->id,'name'=> $i->name];
                $u++;
            }
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
            }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null], 404);
        }
    }

    function get_list_brand_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            if($req->id_type==null){
                $brand_product=BrandProduct::all('id','name')->sortByDesc("id");
            }
            else{
                $brand_product=BrandProduct::where('id_type',$req->id_type)->orderBy('id', 'DESC')->get();
            }
            $n=$brand_product->count();
            $data=[];
            $u=0;
            foreach($brand_product as $i){
                $data[$u]=['id'=>$i->id,'id_type'=>$i->id_type,'name'=> $i->name];
                $u++;
            }
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }

    public function delete_brand_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $brand_product=BrandProduct::find($req->id_brand_product);
            if($brand_product!=null){
                $brand_product->delete();
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

    public function post_admin_create_brand_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $validator = Validator::make($req->all(), [
                'id_type'=>'exists:type_product,id',
                'name' => 'unique:brand_product,name',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>'Lỗi đầu vào!'], 400);
            }
            $brand_product=new BrandProduct;
            $brand_product->id_type=$req->id_type;
            $brand_product->name=$req->name;
            if($brand_product->save()){
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

    public function patch_admin_update_brand_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $validator = Validator::make($req->all(), [
                'name' => 'unique:brand_product,name',
                'id'=>'exists:brand_product,id',
                'id_type'=>'exists:type_product,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
            }
            $brand_product=BrandProduct::find($req->id);
            if($brand_product->fill($req->input())->save()){
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else{
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Có lỗi trong lúc đổi thương hiệu!'], 401);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }

    public function get_admin_search_brand_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            if($req->search==null){
                $brandproduct=BrandProduct::all()->sortByDesc("id");;
            }
            else{
                $brandproduct=BrandProduct::where('name','like','%'.$req->search.'%')->orwhere('id',$req->search)->orderBy('id', 'DESC')->get();
            }
            $data=collect();
            if(count($brandproduct)>0){
                foreach($brandproduct as $i){
                    $date= $i->created_at;
                    $date = $date->format('Y/m/d H:i:s');
                    $date1= $i->updated_at;
                    $date1 = $date1->format('Y/m/d H:i:s');
                    $data[]=[
                        'id'=>$i->id,
                        'id_type'=>$i->id_type,
                        'name_type'=>$i->typeproduct->name,
                        'name'=>$i->name,
                        'created_at'=>$date,
                        'updated_at'=>$date1,
                    ];
                }
                $n=$data->count();
                $data=$data->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
            }else{
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>0,'listData'=>[]]], 200);
            }
            
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }

    }

}
