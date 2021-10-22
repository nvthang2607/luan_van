<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Promotion;
use Carbon\Carbon;
use Validator;

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

    public function get_list_promotion(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $now=Carbon::now('Asia/Ho_Chi_Minh');
            $promotion=Promotion::where('name','like','%'.$req->search.'%')->get();
            if($req->type==1){
                $promotion=$promotion->where('start','<=',$now)->where('finish','>=',$now);
            }
            elseif($req->type==2){
                $promotion=$promotion->where('finish','<',$now);
            }
            elseif($req->type==3){
                $promotion=$promotion->where('start','>',$now);
            }
            $n=$promotion->count();
            $promotion=$promotion->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
            return response()->json(['errorCode'=> null,'totalCount'=>$n,'data'=>$promotion],200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }

    public function delete_promotion(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $promotion=Promotion::find($req->id_promotion);
            if($promotion==null){
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Không tìm thấy khuyễn mãi!'], 401);
            }
            $promotion->delete();
            return response()->json(['errorCode'=> null,'data'=>true], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }
    public function post_admin_create_promotion(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $validator = Validator::make($req->all(), [
                'id_product'=>'required|exists:product,id',
                'name'=>'required',
                'code'=>'required',
                'value'=>'required|gt:0',
                'start' => 'required|date_format:Y/m/d H:i:s',
                'finish' => 'required|date_format:Y/m/d H:i:s|after:start',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
            }
            $promotion=new Promotion;
            if($promotion->fill($req->input())->save()){
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else{
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Có lỗi trong lúc tạo mã khuyến mãi!'], 401);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }
    public function patch_admin_update_promotion(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $validator = Validator::make($req->all(), [
                'id'=>'exists:promotion,id',
                'id_product'=>'exists:product,id',
                'value'=>'gt:0',
                'start' => 'date_format:Y/m/d H:i:s',
                'finish' => 'date_format:Y/m/d H:i:s|after:start',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
            }
            $promotion=Promotion::find($req->id);
            if($promotion==null){
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Không tìm thấy mã khuyến mãi'], 401);
            }
            else{
                if($promotion->fill($req->input())->save()){
                    return response()->json(['errorCode'=> null,'data'=>true], 200);
                }
                else{
                    return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Có lỗi trong lúc chỉnh sửa khuyến mãi!'], 401);
                }
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }
}
