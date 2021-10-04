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
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['get_insert','get_write_rating_to_csv','file']]);
    }
    public function file(request $req){
        // $path = $req->file('hinh')->store('public');
        // echo $path;
        // $path = $req->file('hinh')->storeAs(
        //     'public/images', 'thangne1.png'
        // );
        $image = Image::make('storage/images/b.png');
        $image->widen(300)->save('storage/images/2.png');
        $image1 = Image::make('storage/images/c.png');
        $image1->widen(300)->save('storage/images/3.png');
        $image2 = Image::make('storage/images/d.png');
        $image2->widen(300)->save('storage/images/4.png');
        // $path = Storage::putFileAs(
        //     'public/images', $image, 'thangne2.png'
        // );
        $size=Storage::size('public/images/thangne3.png');
        echo $size;
        // echo $url;
    }
    public function post_admin_list_users(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $data=collect();
            if($req->type=='all'){
                $users=User::where('isadmin','user')->orderBy('id', 'DESC')->get();
            }
            elseif($req->type=='active'){
                $users=User::where('isadmin','user')->where('active',1)->orderBy('id', 'DESC')->get();
            }
            elseif($req->type=='noactive'){
                $users=User::where('isadmin','user')->where('active',0)->orderBy('id', 'DESC')->get();
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
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }

    public function post_admin_update_users(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $users=User::find($req->id_user);
            $users->fill($req->input())->save();
            return response()->json(['errorCode'=> null,'data'=>true], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }
    public function get_admin_active_users(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $active=User::find($req->id_user);
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
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }

    }

    public function get_admin_delete_users(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            $active=User::find($req->id_user);
            $active->delete();
            return response()->json(['errorCode'=> null,'data'=>true], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }

    public function get_admin_search_users(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'){
            if($req->search==null){
                $user=User::where('active',1)->orderBy('id', 'DESC')->get();
                $n=$user->count();
                $datas=$user->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
            }
            else{
                $user=User::where('email','like','%'.$req->search.'%')->orwhere('id',$req->search)->orderBy('id', 'DESC')->get();
                $n=$user->count();
                $datas=$user->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
            }
            if(count($datas)>0){
                foreach($datas as $i){
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
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$data]], 200);
            }else{
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>0,'listData'=>[]]], 200);
            }
            
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
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

}
