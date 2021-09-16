<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\User;
use App\Models\Comment;
use App\Models\Feedback;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['post_product_comment']]);
    }
    public function post_product_comment(request $req){
        $product=Product::find($req->id);
        if($product){
            $data=[];
            $comment=Comment::where('id_product',$req->id);
            $n=$comment->count();
            $comment=$comment->skip(($req->page-1)*$req->pageSize)->take($req->pageSize)->get();
            if($n>0){
                foreach($comment as $i){
                    $feedbacks=[];
                    $feedback=$i->feedback()->get();
                    if($feedback->count()>0){
                        foreach($feedback as $u){
                            $user=User::where('email',$u->email)->pluck('isadmin')->first();
                            $t='';
                            if($user){
                                if($user=='user'){
                                    $t='user';
                                }
                                else{
                                    $t='admin';
                                }
                            }
                            else{
                                $t='traveler';
                            }
                            $feedbacks[count($feedbacks)]=[
                                'id_feedback'=>$u->id,
                                'isadmin'=>$t,
                                'email_feedback'=>$u->email,
                                'comment_feedback'=>$u->comment,
                            ];
                        }
                    }
                    $data[count($data)]=[
                        'id_comment'=>$i->id,
                        'email_comment'=>$i->email,
                        'comment_comment'=>$i->comment,
                        'feedback'=>$feedbacks,
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
}
