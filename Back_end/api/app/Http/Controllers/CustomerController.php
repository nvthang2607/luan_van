<?php

namespace App\Http\Controllers;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => []]);
    }
    public function post_admin_list_customers(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'||Auth()->user()->isadmin=='verifier'){
            $data=collect();
            $users=Customer::orderBy('id', 'DESC')->get();
            foreach($users as $i){
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
                    'address'=>$i->address,
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
    public function post_admin_delete_customers(request $req){
        if(Auth()->user()->isadmin=='admin'||Auth()->user()->isadmin=='manager'||Auth()->user()->isadmin=='verifier'){
            if(Customer::find($req->id_customer)->delete()){
                dd('ok');
            }
            // $active=User::find($req->id_customer);
            // $active->delete();
            return response()->json(['errorCode'=> null,'data'=>true], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi quyền truy cập!'], 401);
        }
    }
}
