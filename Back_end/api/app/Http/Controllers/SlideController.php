<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Slide;
use App\Models\Product;
use App\Models\ImageProduct;
use Illuminate\Support\Facades\Storage;
use Validator;
use Image;

class SlideController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['convert_name','get_slide_list']]);
    }
    public function get_slide_list(request $req){
        $image=Slide::all()->sortByDesc("id");
        $data=collect();
        if(count($image)>0){
            foreach($image as $i){
                $data[]=[
                    'id'=>$i->id,
                    'id_product'=>$i->id_product,
                    'name_product'=>$i->product->name,
                    'image'=>$i->image,
                    'created_at'=>$i->created_at->format('Y/m/d H:i:s'),
                    'updated_at'=>$i->updated_at->format('Y/m/d H:i:s'),
                ];
            }
            return response()->json(['errorCode'=> null,'data'=>$data], 200);
        }else{
            return response()->json(['errorCode'=> null,'data'=>[]], 200);
        }

    }
    public function get_admin_list_slide(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            if($req->id_product==null){
                $image=Slide::all()->sortByDesc("id");
            }
            else{
                $image=Slide::where('id_product',$req->id_product)->get();
            }
            $data=collect();
            if(count($image)>0){
                foreach($image as $i){
                    $data[]=[
                        'id'=>$i->id,
                        'id_product'=>$i->id_product,
                        'name_product'=>$i->product->name,
                        'image'=>$i->image,
                        'created_at'=>$i->created_at->format('Y/m/d H:i:s'),
                        'updated_at'=>$i->updated_at->format('Y/m/d H:i:s'),
                    ];
                }
                $n=$data->count();
                $data=$data->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
            }else{
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>0,'listData'=>[]]], 200);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }

    }

    function convert_name($str) {
		$str = preg_replace("/(??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???)/", 'a', $str);
		$str = preg_replace("/(??|??|???|???|???|??|???|???|???|???|???)/", 'e', $str);
		$str = preg_replace("/(??|??|???|???|??)/", 'i', $str);
		$str = preg_replace("/(??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???)/", 'o', $str);
		$str = preg_replace("/(??|??|???|???|??|??|???|???|???|???|???)/", 'u', $str);
		$str = preg_replace("/(???|??|???|???|???)/", 'y', $str);
		$str = preg_replace("/(??)/", 'd', $str);
		$str = preg_replace("/(??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???)/", 'A', $str);
		$str = preg_replace("/(??|??|???|???|???|??|???|???|???|???|???)/", 'E', $str);
		$str = preg_replace("/(??|??|???|???|??)/", 'I', $str);
		$str = preg_replace("/(??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???)/", 'O', $str);
		$str = preg_replace("/(??|??|???|???|??|??|???|???|???|???|???)/", 'U', $str);
		$str = preg_replace("/(???|??|???|???|???)/", 'Y', $str);
		$str = preg_replace("/(??)/", 'D', $str);
		$str = preg_replace("/(\???|\???|\???|\???|\,|\!|\&|\;|\@|\#|\%|\~|\`|\=|\_|\'|\]|\[|\}|\{|\)|\(|\+|\^)/", '-', $str);
		$str = preg_replace("/( )/", '-', $str);
		return $str;
	}
    public function post_admin_create_slide(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $validator = Validator::make($req->all(), [
                'id_product'=>'required|exists:product,id',
                'image'=>'required'
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
            }
            $product=Product::find($req->id_product);
            $name=$product->name;
            $name=$this->convert_name($name);
            $fileExtension = $req->file('image')->getClientOriginalExtension(); // L???y . c???a file
                    
            // Filename c???c shock ????? kh???i b??? tr??ng
            $fileName = time() . "_" . rand(0,9999999) . "_" . md5(rand(0,9999999)) ."_" . $name."." . $fileExtension;
            $file = $req->file('image');
            $image = Image::make($file);
            $image->save('storage/image/slide/'.$fileName);
            $url = Storage::url('image/slide/'.$fileName);
            $slide=new Slide;
            $slide->id_product=$req->id_product;
            $slide->image=$url;
            if($slide->save()){
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else {
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'C?? l???i trong l??c th??m!'], 401);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }
    }

    public function delete_admin_delete_slide(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $slide=Slide::find($req->id_slide);
            if($slide){
                $productSlide = str_replace('/storage', '', $slide->image);
                Storage::delete('/public' . $productSlide);
                $slide->delete();
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else{
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Kh??ng t??m th???y slide!'], 401);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }
    }


    public function post_admin_update_slide(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $validator = Validator::make($req->all(), [
                'id_slide'=>'required|exists:slide,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
            }
            $slide=Slide::find($req->id_slide);
            if($req->has('image')) {
                //x??a ???nh c??
                $productSlide = str_replace('/storage', '', $slide->image);
                Storage::delete('/public' . $productSlide);

                //th??m ???nh m???i
                $name=$slide->product->name;
                $name=$this->convert_name($name);
                $fileExtension = $req->file('image')->getClientOriginalExtension(); // L???y . c???a file
                        
                // Filename c???c shock ????? kh???i b??? tr??ng
                $fileName = time() . "_" . rand(0,9999999) . "_" . md5(rand(0,9999999)) ."_" . $name."." . $fileExtension;
                $file = $req->file('image');
                $image = Image::make($file);
                $image->save('storage/image/slide/'.$fileName);
                $url = Storage::url('image/slide/'.$fileName);
                $slide->image=$url;
            }
            if($req->has('id_product')){
                $slide->id_product=$req->id_product;
            }
            if($slide->save()){
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else {
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'C?? l???i trong l??c th??m!'], 401);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }
    }
}
