<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Comment;
use App\Models\Feedback;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['get_product_comment_id']]);
    }
    public function get_product_comment_id(request $req){
        $product=Product::find($req->id);
        if($product){
            $data=[];
            $comment=Comment::where('id_product',$req->id)->get();
            foreach($comment as $i){
                $feedbacks=[];
                $feedback=$i->feedback()->get();
                if($feedback->count()>0){
                    foreach($feedback as $u){
                        $feedbacks[count($feedbacks)]=[
                            'id_feedback'=>$u->id,
                            'email_feedback'=>$u->email,
                            'comment_feedback'=>$u->comment,
                        ];
                    }
                }
                else{
                    $feedbacks=null;
                }
                $data[count($data)]=[
                    'id_comment'=>$i->id,
                    'email_comment'=>$i->email,
                    'comment_comment'=>$i->comment,
                    'feedback'=>$feedbacks,
                ];
            }
            return response()->json(['errorCode'=> null,'data'=>$data], 200);
            }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null], 404);
        }
    }
}
