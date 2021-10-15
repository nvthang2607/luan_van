<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\TypeProduct;
use App\Models\BranchProduct;
use Validator;
class TypeProductController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['get_type_product_select_list','get_type_and_branch_select_list',]]);
    }
    public function get_type_product_select_list(Request $req){
        $type_product=TypeProduct::all('id','name');
        $n=$type_product->count();
        if(count($type_product)>0){
            $data=[];
            $u=0;
            foreach($type_product as $i){
                $data[$u]=['id'=>$i->id,'name'=> $i->name];
                $u++;
            }
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
            }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null], 404);
        }
    }
    public function get_type_and_branch_select_list(request $req){
        $type_product=TypeProduct::all('id','name');
        $n=$type_product->count();
        if(count($type_product)>0){
            $data=[];
            $u=0;
            foreach($type_product as $i){
                $branch_product=BranchProduct::where('id_type',$i->id)->get(['id','name']);
                $data2=[];
                $u2=0;
                foreach($branch_product as $i2){
                    $data2[$u2]=['id'=>$i2->id,'name'=>$i2->name];
                    $u2++;
                }
                $data[$u]=['id'=>$i->id,'name'=> $i->name,'branch'=>$data2];
                $u++;
            }
            return response()->json(['errorCode'=> null,'data'=>$data], 200);
            }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null], 404);
        }
    }
    public function get_list_type_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            return $this->get_type_product_select_list($req);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }
    public function delete_type_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $type=TypeProduct::find($req->id_type_product);
            if($type!=null){
                $type->delete();
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else {
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Không tìm thấy loại sản phẩm!'], 401);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }
    public function post_admin_create_type_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $validator = Validator::make($req->all(), [
                'name' => 'unique:type_product,name',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>'Tên thể loại sản phẩm đã tồn tại!'], 400);
            }
            $type_product=new TypeProduct;
            $type_product->name=$req->name;
            if($type_product->save()){
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
    public function patch_admin_update_type_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $validator = Validator::make($req->all(), [
                'name' => 'required|unique:type_product,name',
                'id'=>'exists:type_product,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>'Có lỗi đầu vào!'], 400);
            }
            $typeProduct=TypeProduct::find($req->id);
            $typeProduct->name=$req->name;
            if($typeProduct->save()){
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

    public function get_admin_search_type_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            if($req->search==null){
                $typeproduct=TypeProduct::all()->sortByDesc("id");
            }
            else{
                $typeproduct=TypeProduct::where('name','like','%'.$req->search.'%')->orwhere('id',$req->search)->orderBy('id', 'DESC')->get();
            }
            $data=collect();
            if(count($typeproduct)>0){
                foreach($typeproduct as $i){
                    $date= $i->created_at;
                    $date = $date->format('Y/m/d H:i:s');
                    $date1= $i->updated_at;
                    $date1 = $date1->format('Y/m/d H:i:s');
                    $data[]=[
                        'id'=>$i->id,
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
