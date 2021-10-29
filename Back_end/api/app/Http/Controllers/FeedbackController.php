<?php

namespace App\Http\Controllers;
use App\Models\Feedback;
use Validator;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['post_feedback_create']]);
    }
    public function post_feedback_create(request $req){
        $validator = Validator::make($req->all(), [
            'id_comment'=>'required|exists:comment,id',
            'email'=>'required|email',
            'comment'=>'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
        }
        $comment=new Comment;
        if($comment->fill($req->input())->save()){
            return response()->json(['errorCode'=> null,'data'=>true], 200);
        }
        else{
            return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>'Có lỗi trong quá trình gửi bình luận!'], 400);
        }
        
    }
    public function get_admin_list_feedback(request $req){
        if((auth()->user()->isadmin=='manager')||(Auth()->user()->isadmin=='admin')||(Auth()->user()->isadmin=='telesale')){
            $validator = Validator::make($req->all(), [
                'id_comment'=>'required|exists:comment,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
            }
            $feedback=Feedback::where('id_comment',$req->id_comment)->get();
            $data=collect();
            if(count($feedback)>0){
                foreach($feedback as $i){
                    $data[]=[
                        "id"=> $i->id,
                        "name"=>$i->name,
                        "comment"=>$i->comment,
                        "email"=>$i->email,
                        "phone"=>$i->phone,
                        "check"=>$i->check,
                        'created_at'=>$i->created_at->format('Y/m/d H:i:s'),
                        'updated_at'=>$i->updated_at->format('Y/m/d H:i:s'),
                    ] ;
                }
                
            }
            $n=$data->count();
            $data=$data->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Bạn không có quyền list đơn hàng!'], 401);
        }
    }
    public function post_admin_create_feedback(request $req){
        if((auth()->user()->isadmin=='manager')||(Auth()->user()->isadmin=='admin')||(Auth()->user()->isadmin=='telesale')){
            $validator = Validator::make($req->all(), [
                'id_comment'=>'required|exists:comment,id',
                'comment'=>'required',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
            }
            $email=auth()->user()->email;
            $data=[
                'id_comment'=>$req->id_comment,
                'email'=>$email,
                'comment'=>$req->comment,
            ];
            $comment=new Comment;
            if($comment->fill($data)->save()){
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else{
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>'Có lỗi trong quá trình gửi bình luận!'], 400);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Bạn không có quyền list đơn hàng!'], 401);
        }
    }
}
