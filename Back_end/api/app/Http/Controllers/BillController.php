<?php

namespace App\Http\Controllers;
use App\Models\Bill;
use App\Models\User;
use App\Models\Customer;
use App\Models\Status;
use App\Models\BillDetail;
use Validator;
use Illuminate\Http\Request;

class BillController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['post_bill_create']]);
    }
    public function post_bill_create(request $req){
        $id=0;
        $validator = Validator::make($req->all(), [
            'email' => 'exists:customer',
        ]);
        if($validator->fails()){
            $id=Customer::max('id');
            $customer=new Customer;
            $customer->name=$req->name;
            $customer->gender=$req->gender;
            $customer->email=$req->email;
            $customer->phone=$req->phone;
            $customer->address=$req->address;
            if($customer->save()){
                $id=Customer::max('id');
            }
            else{
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Có lỗi xảy ra khi tạo khách hàng'], 500);
            }
        }
        else{
            $id=Customer::where('email',$req->email)->pluck('id')->first();
        }
        $items=$req->item;
        $n=count($items);
        $bill=new Bill;
        $bill->id_customer=$id;
        $bill->total=$req->total;
        $bill->payment=$req->payment;
        if($req->note!=null){
            $bill->note=$req->note;
        }
        if($bill->save()){
            $id_bill=Bill::max('id');
            for($t=0;$t<$n;$t++){
                $str=explode('-', $items[$t]);
                $bill_detail=new BillDetail;
                $bill_detail->id_bill=$id_bill;
                $bill_detail->id_product=$str[0];
                $bill_detail->price=$str[1];
                $bill_detail->quantity=$str[2];
                if(!($bill_detail->save())){
                    $bill_detail=BillDetail::where('id_bill',$id_bill)->get();
                    if($bill_detail->count()>0){
                        foreach($bill_detail as $k){
                            $k->delete();
                        }
                    }
                    $bill=Bill::find($id_bill);
                    $bill->delete();
                    $customer=Customer::find($id);
                    $customer->delete();
                    return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Có lỗi xảy ra khi tạo chi tiết đơn hàng'], 500);
                }
            }
        }
        else{
            $customer=Customer::find($id);
            $customer->delete();
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Có lỗi xảy ra khi tạo đơn hàng'], 500);
        }
        
    }
}