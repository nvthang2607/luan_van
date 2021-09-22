<?php

namespace App\Http\Controllers;
use App\Models\News;
use Illuminate\Http\Request;
use Carbon\Carbon;

class NewsController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['get_news_id','get_news']]);
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
    public function get_news(request $req){
        $news=News::all()->sortByDesc("id");
        $n=$news->count();
        $data=[];
        $datas=$news->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
        if(count($datas)>0){
            $u=0;
            foreach($datas as $i){
                $date= $i->created_at;
                $date = Carbon::parse($date);
                $thu=$date->dayOfWeek;
                if($thu==0){
                    $t='Chủ nhật, ';
                }
                else{
                    $thu=$thu+1;
                    $t='Thứ '.$thu.', ';
                }
                $day=$date->day;
                $month=$date->month;
                $year=$date->year;
                $date=$t.$day.'/'.$month.'/'.$year;
                $data[$u]=['id'=>$i->id,'id_user'=>$i->id_user,'image'=>$i->image,'title'=>$i->title,'created_at'=>$date];
                $u++;
            }
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
            }
        else{
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>[]]], 200);
        }
    }
}
