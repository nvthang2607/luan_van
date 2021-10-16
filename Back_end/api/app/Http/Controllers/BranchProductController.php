<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BranchProduct;
use App\Models\Product;
use Validator;
class BranchProductController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['post_branch_product_select_list','get_branch_product_select_list']]);
    }
    public function post_branch_product_select_list(Request $req){
        $branch_product=BranchProduct::where('id_type',$req->idType)->get(['id','name']);
        $n=$branch_product->count();
        if(count($branch_product)>0){
            $data=[];
            $u=0;
            foreach($branch_product as $i){
                $data[$u]=['id'=>$i->id,'name'=> $i->name];
                $u++;
            }
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
            }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null], 404);
        }
    }
    public function get_branch_product_select_list(Request $req){
        $product=Product::where('id_branch',$req->idBranch)->skip(($req->page-1)*$req->pageSize)->take($req->pageSize)->get();
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

    function get_list_branch_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            if($req->id_type==null){
                $branch_product=BranchProduct::all('id','name')->sortByDesc("id");
            }
            else{
                $branch_product=BranchProduct::where('id_type',$req->id_type)->orderBy('id', 'DESC')->get();
            }
            $n=$branch_product->count();
            $data=[];
            $u=0;
            foreach($branch_product as $i){
                $data[$u]=['id'=>$i->id,'id_type'=>$i->id_type,'name'=> $i->name];
                $u++;
            }
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }

    public function delete_branch_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $branch_product=BranchProduct::find($req->id_branch_product);
            if($branch_product!=null){
                $branch_product->delete();
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

    public function post_admin_create_branch_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $validator = Validator::make($req->all(), [
                'id_type'=>'exists:type_product,id',
                'name' => 'unique:branch_product,name',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>'Lỗi đầu vào!'], 400);
            }
            $branch_product=new BranchProduct;
            $branch_product->id_type=$req->id_type;
            $branch_product->name=$req->name;
            if($branch_product->save()){
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
                'name' => 'required|unique:branch_product,name',
                'id'=>'exists:branch_product,id',
                'id_type'=>'exists:type_product,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
            }
            $branch_product=BranchProduct::find($req->id);
            if($branch_product->fill($req->input())->save()){
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

    public function get_admin_search_branch_product(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            if($req->search==null){
                $branchproduct=BranchProduct::all()->sortByDesc("id");;
            }
            else{
                $branchproduct=BranchProduct::where('name','like','%'.$req->search.'%')->orwhere('id',$req->search)->orderBy('id', 'DESC')->get();
            }
            $data=collect();
            if(count($branchproduct)>0){
                foreach($branchproduct as $i){
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
