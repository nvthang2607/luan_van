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
}
