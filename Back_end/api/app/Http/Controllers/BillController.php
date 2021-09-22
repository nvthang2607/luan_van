<?php

namespace App\Http\Controllers;
use App\Models\Bill;
use App\Models\User;
use App\Models\Customer;
use App\Models\Status;
use App\Models\BillDetail;
use Validator;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BillController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['post_bill_create']]);
    }
    public function post_bill_create(request $req){
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
                $bill_detail->rate=0;
                $bill_detail->comment='';
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
            return response()->json(['errorCode'=> null, 'data'=>$id_bill], 200);
        }
        else{
            $customer=Customer::find($id);
            $customer->delete();
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Có lỗi xảy ra khi tạo đơn hàng'], 500);
        }
        
    }
    public function post_bill_user_list_bill(request $req){
        $email=auth()->user()->email;
        $customer=Customer::where('email',$email)->get();
        $bills=collect();
        foreach($customer as $customer){
            $items=[];
            $product=BillDetail::where('id_bill',$customer->bill->id)->get();
            foreach($product as $item){
                $items[count($items)]=$item->product->name;
            }
            $stt=$customer->bill->status->last();
            if($stt!=null){
                $stt=$stt['status'];
            }
            else{
                $stt=1;
            }
            if($req->status!=0){
                if($req->status!=$stt){
                    continue;
                }
            }
            $date= $customer->bill->created_at;
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
            
            $bills[]=[
                'bill'=>[
                    'id'=>$customer->bill->id,
                    'id_customer'=>$customer->id,
                    'name_customer'=>$customer->name,
                    'email_customer'=>$customer->email,
                    'phone_customer'=>$customer->phone,
                    'address_customer'=>$customer->address,
                    'note'=>$customer->bill->note,
                    'total'=>$customer->bill->total,
                    'payment'=>$customer->bill->payment,
                    'created_at'=>$date,
                ],
                'item'=>$items,
                'status'=>$stt
            ];
        }

        $n=$bills->count();
        $bills=$bills->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
        return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$bills]], 200);
    }
}
