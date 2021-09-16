<?php

namespace App\Http\Controllers;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['get_news_id']]);
    }
    public function get_news_id(request $req){
        $news=News::find($req->id);
        if($news){
            $data=$news;
            return response()->json(['errorCode'=> null,'data'=>$data], 200);
            }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null], 404);
        }
    }
}
