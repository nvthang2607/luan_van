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

    public function get_admin_list_promotion(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $now=Carbon::now('Asia/Ho_Chi_Minh');
            if($req->search==null){
                $promotion=Promotion::all();
            }
            else{

                $promotion=Promotion::where('code',$req->search)->get();
            }
            $promotion=$promotion->where('id_product',$req->id_product);
            $data=collect();
            
            if($req->type==1){
                $promotion=$promotion->where('start','<=',$now)->where('finish','>=',$now);
            }
            elseif($req->type==2){
                $promotion=$promotion->where('finish','<',$now);
            }
            elseif($req->type==3){
                $promotion=$promotion->where('start','>',$now);
            }
            foreach($promotion as $i){
                $data[]=$i;
            }
            $n=$data->count();
            $data=$data->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
            return response()->json(['errorCode'=> null,'totalCount'=>$n,'data'=>$data],200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }
    }

    public function delete_admin_delete_promotion(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $promotion=Promotion::find($req->id_promotion);
            if($promotion==null){
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Kh??ng t??m th???y khuy???n m??i!'], 401);
            }
            $promotion->delete();
            return response()->json(['errorCode'=> null,'data'=>true], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
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
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'C?? l???i trong l??c t???o m?? khuy???n m??i!'], 401);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
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
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Kh??ng t??m th???y m?? khuy???n m??i'], 401);
            }
            else{
                if($promotion->fill($req->input())->save()){
                    return response()->json(['errorCode'=> null,'data'=>true], 200);
                }
                else{
                    return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'C?? l???i trong l??c ch???nh s???a khuy???n m??i!'], 401);
                }
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }
    }
}
