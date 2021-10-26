<?php

namespace App\Http\Controllers;
use App\Models\News;
use Validator;
use Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Carbon\Carbon;

class NewsController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['get_news_id','post_news','convert_name']]);
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
    public function post_news(request $req){
        $news=News::where('active',1)->orderBy('id', 'DESC')->get();
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

    public function get_admin_list_news(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $news=News::where('title','like','%'.$req->search.'%')->get();
            $n=$news->count();
            $news=$news->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$news]], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }

    }

    function convert_name($str) {
		$str = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/", 'a', $str);
		$str = preg_replace("/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/", 'e', $str);
		$str = preg_replace("/(ì|í|ị|ỉ|ĩ)/", 'i', $str);
		$str = preg_replace("/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/", 'o', $str);
		$str = preg_replace("/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/", 'u', $str);
		$str = preg_replace("/(ỳ|ý|ỵ|ỷ|ỹ)/", 'y', $str);
		$str = preg_replace("/(đ)/", 'd', $str);
		$str = preg_replace("/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/", 'A', $str);
		$str = preg_replace("/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/", 'E', $str);
		$str = preg_replace("/(Ì|Í|Ị|Ỉ|Ĩ)/", 'I', $str);
		$str = preg_replace("/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/", 'O', $str);
		$str = preg_replace("/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/", 'U', $str);
		$str = preg_replace("/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/", 'Y', $str);
		$str = preg_replace("/(Đ)/", 'D', $str);
		$str = preg_replace("/(\“|\”|\‘|\’|\,|\!|\&|\;|\@|\#|\%|\~|\`|\=|\_|\'|\]|\[|\}|\{|\)|\(|\+|\^)/", '-', $str);
		$str = preg_replace("/( )/", '-', $str);
		return $str;
	}

    public function post_admin_create_news(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $validator = Validator::make($req->all(), [
                'image'=>'required',
                'title'=>'required',
                'content'=>'required',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
            }
            $fileExtension = $req->file('image')->getClientOriginalExtension(); // Lấy . của file
            // Filename cực shock để khỏi bị trùng
            $fileName = time() . "_" . rand(0,9999999) . "_" . md5(rand(0,9999999)) ."." . $fileExtension;
            $file = $req->file('image');
            $image = Image::make($file);
            $image->save('storage/image/news/'.$fileName);
            $url = Storage::url('image/news/'.$fileName);
            $news=new News;
            $news->image=$url;
            $news->id_user=auth()->user()->id;
            $news->title=$req->title;
            $news->content=$req->content;
            if($news->save()){
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else {
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Có lỗi trong lúc thêm!'], 401);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }

    public function get_admin_active_news(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $news=News::find($req->id_news);
            if($news!=null){
                if($news->active==0){
                    $news->active=1;
                }
                else{
                    $news->active=0;
                }
                $news->save();
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else {
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Không tìm thấy tin tức!'], 401);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }

    public function post_admin_update_news(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $validator = Validator::make($req->all(), [
                'id_news'=>'required|exists:news,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
            }
            $news=News::find($req->id_news);
            if($req->has('image')) {
                //xóa ảnh cũ
                $productNews = str_replace('/storage', '', $news->image);
                Storage::delete('/public' . $productNews);

                //thêm ảnh mới
                $fileExtension = $req->file('image')->getClientOriginalExtension(); // Lấy . của file
                        
                // Filename cực shock để khỏi bị trùng
                $fileName = time() . "_" . rand(0,9999999) . "_" . md5(rand(0,9999999))."." . $fileExtension;
                $file = $req->file('image');
                $image = Image::make($file);
                $image->save('storage/image/news/'.$fileName);
                $url = Storage::url('image/news/'.$fileName);
                $news->image=$url;
            }
            $news->id_user=auth()->user()->id;
            if($req->has('title')){
                $news->title=$req->title;
            }
            if($req->has('content')){
                $news->content=$req->content;
            }
            if($news->save()){
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else {
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Có lỗi trong lúc thêm!'], 401);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }
}
