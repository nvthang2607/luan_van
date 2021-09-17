<?php

namespace App\Http\Controllers;
use App\Models\Bill;
use Illuminate\Http\Request;

class BillDetailController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['get_billdetail_user_list_billdetail','get_branch_product_select_list']]);
    }
    public function get_billdetail_user_list_billdetail(request $req){
        $id_user=auth()->user()->id;
        $bill=Bill::where('id',$req->id_bill)->where('id_customer',$id_user)->get();
        if($bill->count()>0){
            $details=[];
            foreach($bill as $bill){
                $customer=$bill->customer->name;
                $total=$bill->total;
                $payment=$bill->payment;
                $note=$bill->note;
                $status=$bill->status;
                dd($status);
                $date_buy=$bill->created_at;
                $detail=$bill->billdetail;
                foreach($detail as $i){
                    $details[count($details)]=$i;
                    echo $i.'<br>';
                }
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Có lỗi xác thực hoặc sản phẩm cầm tìm không hợp lệ'], 404);
        }
    }
}
