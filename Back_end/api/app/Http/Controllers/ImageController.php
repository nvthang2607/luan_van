<?php

namespace App\Http\Controllers;
use App\Models\ImageProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Validator;
use Image;

class ImageController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['convert_name']]);
    }
    public function get_admin_list_image(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $image=ImageProduct::where('id_product',$req->id_product)->orderBy('parent', 'DESC')->get();
            $data=collect();
            if(count($image)>0){
                foreach($image as $i){
                    $date= $i->created_at;
                    $date = $date->format('Y/m/d H:i:s');
                    $date1= $i->updated_at;
                    $date1 = $date1->format('Y/m/d H:i:s');
                    $data[]=[
                        'id'=>$i->id,
                        'id_product'=>$i->id_product,
                        'image'=>$i->image,
                        'parent'=>$i->parent,
                        'created_at'=>$date,
                        'updated_at'=>$date1,
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
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }

    }
    public function delete_admin_delete_image(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $image=ImageProduct::find($req->id_image);
            if($image){
                $productImage = str_replace('/storage', '', $image->image);
                Storage::delete('/public' . $productImage);
                $image->delete();
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            } 
            else{
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Không tìm thấy hình ảnh!'], 401);
            }
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
    public function post_admin_create_image(request $req){
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
            $fileExtension = $req->file('image')->getClientOriginalExtension(); // Lấy . của file
                    
            // Filename cực shock để khỏi bị trùng
            $fileName = time() . "_" . rand(0,9999999) . "_" . md5(rand(0,9999999)) ."_" . $name."." . $fileExtension;
            $file = $req->file('image');
            $image = Image::make($file);
            $image->resize(300,200)->save('storage/image/product/'.$fileName);
            $url = Storage::url('image/product/'.$fileName);
            $image=new ImageProduct;
            $image->id_product=$req->id_product;
            $image->parent=$req->parent;
            $image->image=$url;
            if($image->save()){
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

    public function post_admin_update_image(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $validator = Validator::make($req->all(), [
                'id'=>'required|exists:image_product,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
            }
            $image1=ImageProduct::find($req->id);
            if($req->has('image')) {
                //xóa ảnh cũ
                $productImage = str_replace('/storage', '', $image1->image);
                Storage::delete('/public' . $productImage);

                //thêm ảnh mới
                $name=$image1->product->name;
                $name=$this->convert_name($name);
                $fileExtension = $req->file('image')->getClientOriginalExtension(); // Lấy . của file
                        
                // Filename cực shock để khỏi bị trùng
                $fileName = time() . "_" . rand(0,9999999) . "_" . md5(rand(0,9999999)) ."_" . $name."." . $fileExtension;
                $file = $req->file('image');
                $image = Image::make($file);
                $image->resize(300,200)->save('storage/image/product/'.$fileName);
                $url = Storage::url('image/product/'.$fileName);
                $image1->image=$url;
            }
            if($req->has('id_product')){
                $image1->id_product=$req->id_product;
            }
            if($req->has('parent')){
                $image1->parent=$req->parent;
            }
            if($image1->save()){
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