<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Box\Spout\Reader\Common\Creator\ReaderEntityFactory;
use DB;
use App\Models\BillDetail;
use App\Models\Bill;
use App\Models\User;
use App\Models\commune;
use App\Models\district;
use App\Models\City;
use App\Models\Product;
use App\Models\Promotion;
use Carbon\Carbon;
use Image;
use Validator;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['get_insert','get_write_rating_to_csv','file','test4']]);
    }
    public function file(request $req){
        //hien hinh : /storage/image/product/thangne1.png
        //xoa hinh: public/image/product/thangne1.png

        // $productImage = str_replace('/storage', '', '/storage/image/product/thangne1.png');
        // echo $productImage;
        //$path = storage_path('public/image/product/b.png');
        //Storage::delete('public/image/product/a.png');
        //echo $path;
        $path = $req->file('hinh')->storeAs(
            'public/image/product', 'thangnetroi234.png'
        );
        echo $url = Storage::url($path);
        // $image = Image::make('storage/images/b.png');
        // $image->widen(300)->save('storage/images/2.png');
        // $image1 = Image::make('storage/images/c.png');
        // $image1->widen(300)->save('storage/images/3.png');
        // $image2 = Image::make('storage/images/d.png');
        // $image2->widen(300)->save('storage/images/4.png');
        // // $path = Storage::putFileAs(
        // //     'public/images', $image, 'thangne2.png'
        // // );
        // $size=Storage::size('public/images/thangne3.png');
        // echo $size;
        // echo $url;
    }
    public function get_admin_list_users(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $data=collect();
            $users=User::where('name','like','%'.$req->search.'%')->where('isadmin','user')->get();
            if($req->type=='active'){
                $users= $users->where('active',1);
            }
            elseif($req->type=='noactive'){
                $users= $users->where('active',0);
            }
            foreach($users as $i){
                $address=$i->address;
                $address = explode(", ", $address);
                $idCommune=$address[0];
                $idDistrict=$address[1];
                $idCity=$address[2];
                $nameCommune=commune::where('xaid',$idCommune)->pluck('name')->first();
                // $nameCommune=$nameCommune->name;
                $nameDistrict=district::where('maqh',$idDistrict)->pluck('name')->first();
                // $nameDistrict=$nameDistrict->name;
                $nameCity=City::where('matp',$idCity)->pluck('name')->first();
                // $nameCity=$nameCity->name;
                $date= $i->created_at;
                $date = $date->format('Y/m/d H:i:s');
                $date1= $i->updated_at;
                $date1 = $date1->format('Y/m/d H:i:s');
                $data[]=[
                    'id'=>$i->id,
                    'name'=>$i->name,
                    'gender'=>$i->gender,
                    'email'=>$i->email,
                    'phone'=>$i->phone,
                    'idCommune'=>$idCommune,
                    'idDistrict'=>$idDistrict,
                    'idCity'=>$idCity,
                    'nameCommune'=>$nameCommune,
                    'nameDistrict'=>$nameDistrict,
                    'nameCity'=>$nameCity,
                    'active'=>$i->active,
                    'created_at'=>$date,
                    'updated_at'=>$date1,
                ];
            }
            $n=$data->count();
            $data=$data->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }
    }

    public function patch_admin_update_users(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            if($active->isadmin=='admin'){
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
            }
            $users=User::find($req->id_user);
            $users->fill($req->input())->save();
            return response()->json(['errorCode'=> null,'data'=>true], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }
    }
    public function get_admin_active_users(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $active=User::find($req->id_user);
            if($active->isadmin=='admin'){
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
            }
            if($active->active=='0'){
                $active->update(['active'=>1]);
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            if($active->active=='1'){
                $active->update(['active'=>0]);
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }

    }

    public function delete_admin_delete_users(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            if($active->isadmin=='admin'){
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
            }
            $active=User::find($req->id_user);
            if($active!=null){
                $active->delete();
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i kh??ng t??m th???y user!'], 401);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }
    }

    public function get_admin_search_users(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            if($req->search==null){
                $user=User::where('active',1)->orderBy('id', 'DESC')->get();
            }
            else{
                $user=User::where('email','like','%'.$req->search.'%')->orwhere('id',$req->search)->orderBy('id', 'DESC')->get();
            }
            $data=collect();
            if(count($user)>0){
                foreach($user as $i){
                    if($i->isadmin!='user'){
                        continue;
                    }
                    $address=$i->address;
                    $address = explode(", ", $address);
                    $idCommune=$address[0];
                    $idDistrict=$address[1];
                    $idCity=$address[2];
                    $nameCommune=commune::where('xaid',$idCommune)->pluck('name')->first();
                    // $nameCommune=$nameCommune->name;
                    $nameDistrict=district::where('maqh',$idDistrict)->pluck('name')->first();
                    // $nameDistrict=$nameDistrict->name;
                    $nameCity=City::where('matp',$idCity)->pluck('name')->first();
                    // $nameCity=$nameCity->name;
                    $date= $i->created_at;
                    $date = $date->format('Y/m/d H:i:s');
                    $date1= $i->updated_at;
                    $date1 = $date1->format('Y/m/d H:i:s');
                    $data[]=[
                        'id'=>$i->id,
                        'name'=>$i->name,
                        'gender'=>$i->gender,
                        'email'=>$i->email,
                        'phone'=>$i->phone,
                        'idCommune'=>$idCommune,
                        'idDistrict'=>$idDistrict,
                        'idCity'=>$idCity,
                        'nameCommune'=>$nameCommune,
                        'nameDistrict'=>$nameDistrict,
                        'nameCity'=>$nameCity,
                        'active'=>$i->active,
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
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }

    }
    public function get_insert(){
        ini_set('max_execution_time', 600);
        $now1=Carbon::now();
        $filePath = getcwd().'/ua_base.xlsx';
        $reader = ReaderEntityFactory::createReaderFromFile($filePath);
        $reader->open($filePath);
        $all_data = array();
        foreach ($reader->getSheetIterator() as $sheet) {
            foreach ($sheet->getRowIterator() as $row) {
                $cells = $row->getCells();
                $item = $row->toArray();
                if($item[0]<=100&&$item[1]<=300){
                    // echo $item[0].'<br>';
                    $a=new BillDetail;
                    $a->id_bill = $item[0];
                    $a->id_product = $item[1];
                    $a->rate=$item[2];
                    $a->quantity=1;
                    $a->price=1000000;
                    $a->comment='abc';
                    $a->save();
                }

            }
        }
        $reader->close();
        $now2=Carbon::now();
        echo 'Xong!<br>';
        echo 't1='.$now1.'<br>';
        echo 't2='.$now2.'<br>';
    }
    public function get_write_rating_to_csv()
    {
        ini_set('max_execution_time', 600);
        $rating=BillDetail::all();
        $handle = fopen('../public/train_model/train_web.csv', 'w');
        foreach($rating as $i){
            $email=$i->bill->customer->email;
            $user=User::where('email',$email)->pluck('id')->first();
            if(!$user){
                continue;
            }
            $row=[$user,$i->id_product,$i->rate];
            fputcsv($handle, $row, ' ');
        }
        fclose($handle);
        echo 'Xong!<br>';
    }

    public function get_admin_list_admin(request $req){
        if(Auth()->user()->isadmin=='admin'){
            $data=collect();
            $users=User::where('name','like','%'.$req->search.'%')->where('isadmin','<>','user')->get();
            if($req->type=='active'){
                $users= $users->where('active',1);
            }
            elseif($req->type=='noactive'){
                $users= $users->where('active',0);
            }
            foreach($users as $i){
                $address=$i->address;
                $address = explode(", ", $address);
                $idCommune=$address[0];
                $idDistrict=$address[1];
                $idCity=$address[2];
                $nameCommune=commune::where('xaid',$idCommune)->pluck('name')->first();
                // $nameCommune=$nameCommune->name;
                $nameDistrict=district::where('maqh',$idDistrict)->pluck('name')->first();
                // $nameDistrict=$nameDistrict->name;
                $nameCity=City::where('matp',$idCity)->pluck('name')->first();
                // $nameCity=$nameCity->name;
                $date= $i->created_at;
                $date = $date->format('Y/m/d H:i:s');
                $date1= $i->updated_at;
                $date1 = $date1->format('Y/m/d H:i:s');
                $data[]=[
                    'id'=>$i->id,
                    'name'=>$i->name,
                    'isadmin'=>$i->isadmin,
                    'gender'=>$i->gender,
                    'email'=>$i->email,
                    'phone'=>$i->phone,
                    'idCommune'=>$idCommune,
                    'idDistrict'=>$idDistrict,
                    'idCity'=>$idCity,
                    'nameCommune'=>$nameCommune,
                    'nameDistrict'=>$nameDistrict,
                    'nameCity'=>$nameCity,
                    'active'=>$i->active,
                    'created_at'=>$date,
                    'updated_at'=>$date1,
                ];
            }
            $n=$data->count();
            $data=$data->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }
    }
    public function patch_admin_update_admin(request $req){
        if(Auth()->user()->isadmin=='admin'){
            $users=User::find($req->id_admin);
            $users->fill($req->input())->save();
            return response()->json(['errorCode'=> null,'data'=>true], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }
    }
    public function post_admin_create_admin(request $req){
        if(Auth()->user()->isadmin=='admin'){
            $validator = Validator::make($req->all(), [
                'name' => 'required|string|between:2,50',
                'gender' => 'required',
                'email' => 'required|string|email|max:50|unique:users',
                'password' => 'required|string|min:8',
                'phone'=>'required|numeric',
                'idCommue'=>'required',
                'idDistrict'=>'required',
                'idCity'=>'required'
            ]);

            if($validator->fails()){
                return response()->json(['errorCode'=> 1,$validator->errors()->toJson()], 400);
            }
            $user=new User;
            $user->name=$req->name;
            $user->gender=$req->gender;
            $user->email=$req->email;
            $user->password=bcrypt($req->password);
            $user->address=$req->idCommue.', '.$req->idDistrict.', '.$req->idCity;
            $user->phone=$req->phone;
            $user->isadmin=$req->isadmin;
            $user->active=1;
            if($user->Save()){
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }

    }

    public function get_admin_active_admin(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $active=User::find($req->id_admin);
            if($active->isadmin=='admin'){
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
            }
            if($active->isadmin=='admin'){
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
            }
            if($active->active=='0'){
                $active->update(['active'=>1]);
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            if($active->active=='1'){
                $active->update(['active'=>0]);
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'L???i quy???n truy c???p!'], 401);
        }



    }
    public function test4(request $req){
        echo 'a1='.$req->a1.'<br>';
        echo 'a2='.$req->a2.'<br>';
        echo 'a3='.$req->a3.'<br>';
        echo 'a4='.$req->a4.'<br>';
        echo 'a5='.$req->a5.'<br>';
        echo 'b1='.$req->b1.'<br>';
        echo 'b2='.$req->b2.'<br>';
        echo 'b3='.$req->b3.'<br>';
        echo 'b4='.$req->b4.'<br>';
        echo 'b5='.$req->b5.'<br>';
        $tu=$req->a1*$req->b1+$req->a2*$req->b2+$req->a3*$req->b3+$req->a4*$req->b4+$req->a5*$req->b5;
        $mau1=sqrt(($req->a1*$req->a1)+($req->a2*$req->a2)+($req->a3*$req->a3)+($req->a4*$req->a4)+($req->a5*$req->a5));
        $mau2=sqrt(($req->b1*$req->b1)+($req->b2*$req->b2)+($req->b3*$req->b3)+($req->b4*$req->b4)+($req->b5*$req->b5));

        echo $tu/($mau1*$mau2);

    }

}
