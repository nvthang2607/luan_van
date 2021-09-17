<?php

namespace App\Http\Controllers;
use App\Models\Bill;
use App\Models\Customer;
use Illuminate\Http\Request;

class BillDetailController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['get_billdetail_user_list_billdetail','get_branch_product_select_list']]);
    }
    public function get_billdetail_user_list_billdetail(request $req){
        $email=auth()->user()->email;
        $id_customer=Customer::where('email',$email)->pluck('id')->first();
        $bill=Bill::where('id',$req->id_bill)->where('id_customer',$id_customer)->get();
        if($bill->count()>0){
            foreach($bill as $bill){
                $id_customer=$bill->customer->id;
                $name_customer=$bill->customer->name;
                $total=$bill->total;
                $payment=$bill->payment;
                $note=$bill->note;
                $status=$bill->status->last();
                if($status!=null){
                    $stt=$status['status'];
                }
                else{
                    $stt=1;
                }
                $date_buy=$bill->created_at;
                $detail=$bill->billdetail;
                $details=[];
                foreach($detail as $i){
                    $id_detail=$i->id;
                    $id_product=$i->id_product;
                    $name_product=$i->product->name;
                    $quantity=$i->quantity;
                    $price=$i->price;
                    $image=$i->product->image_product->first();
                    $image=$image['image'];
                    $details[count($details)]=[
                        'id_detail'=>$id_detail,
                        'id_product'=>$id_product,
                        'name_product'=>$name_product,
                        'quantity'=>$quantity,
                        'price'=>$price,
                        'image'=>$image,
                    ];
                    
                }
            }
            $data=[
                'bill'=>[
                    'id_customer'=>$id_customer,
                    'name_customer'=>$name_customer,
                    'total'=>$total,
                    'payment'=>$payment,
                    'note'=>$note,
                    'stt'=>$stt,
                ],
                'billdetail'=>$details,
            ];
            return response()->json(['errorCode'=> null, 'data'=>$data], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Có lỗi xác thực hoặc sản phẩm cầm tìm không hợp lệ'], 404);
        }
    }
}
