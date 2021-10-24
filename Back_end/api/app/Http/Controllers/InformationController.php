<?php

namespace App\Http\Controllers;
use Validator;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\InformationProduct;
class InformationController extends Controller
{
    public function get_admin_list_information(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $validator = Validator::make($req->all(), [
                'id_product'=>'required|exists:product,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
            }
            $informations=Product::find($req->id_product)->information_product()->get();
            if(count($informations)>0){
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>count($informations),'listData'=>$informations]], 200);
            }else{
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>0,'listData'=>[]]], 200);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }


    public function delete_admin_delete_information(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $information=InformationProduct::find($req->id_information);
            if($information==null){
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Không tìm thấy thông tin!'], 401);
            }
            $information->delete();
            return response()->json(['errorCode'=> null,'data'=>true], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }
    public function post_admin_create_information(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $validator = Validator::make($req->all(), [
                'id_product'=>'required|exists:product,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
            }
            $errors=[];
            $t=0;
            $e=0;
            foreach($req->data as $i){
                $validator = Validator::make($i, [
                    'name'=>'required',
                    'content'=>'required',
                ]);
                if ($validator->fails()) {
                    $e++;
                    $p="Has error in raw ".$t.": ".$validator->messages();
                    $p = str_replace('"', '', $p);
                    $errors[count($errors)]=$p;
                }
                $t++;
            }
            foreach($req->data as $i){
                if($e>0){
                    return response()->json(['errorCode'=> 1,'data'=>null,'errors'=>$errors], 401);
                }
                $information=new InformationProduct;
                $information->fill(['id_product'=>$req->id_product,'name'=>$i['name'],'content'=>$i['content']])->save();   
            }
            return response()->json(['errorCode'=> null,'data'=>true], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }

    public function patch_admin_update_information(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $errors=[];
            $t=0;
            $e=0;
            foreach($req->data as $i){
                $validator = Validator::make($i, [
                    'id'=>'exists:information_product,id',
                    'id_product'=>'exists:product,id',
                    'content'=>'required',
                    'name'=>'required',
                ]);
               
                if ($validator->fails()) {
                    $e++;
                    $p="Has error in raw ".$t.": ".$validator->messages();
                    $p = str_replace('"', '', $p);
                    $errors[count($errors)]=$p;
                }
                $t++;
            }
            foreach($req->data as $i){
                if($e>0){
                    return response()->json(['errorCode'=> 1,'data'=>null,'errors'=>$errors], 401);
                }
                $information=InformationProduct::find($i['id']);
                $information->fill($i)->save();
            }
            return response()->json(['errorCode'=> null,'data'=>true], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }
}
