<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Rating;

class RatingController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['post_rating']]);
    }
    public function post_rating(request $req){
        if (!auth()->check()) {
            return response()->json(['errorCode'=> 4, 'data'=>null],404);
        }
        else{
            $rating=new Rating;
            $rating->id_user=auth()->user()->id;
            // echo $user_id;
            $rating->id_product=$req->IdProduct;
            $rating->ratting=$req->Rating;
            if($req->has('Comment')){
                $rating->comment=$req->Comment;
            }
            else{
                $rating->comment='';
            }
            if($rating->save()){
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else{
                return response()->json(['errorCode'=> 4,'data'=>false], 401);
            }    
            
        }        
    }
    
}
