<?php

namespace App\Http\Controllers;
use App\Models\Bill;
use App\Models\Customer;
use App\Models\BillDetail;
use App\Models\User;
use App\Models\Product;
use League\Csv\Writer;
use Carbon\Carbon;
use Validator;
use Illuminate\Http\Request;

class BillDetailController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['post_rating']]);
    }
    public function get_billdetail_user_list_billdetail(request $req){
        $email=auth()->user()->email;
        $id_user=auth()->user()->id;
        $id_customer=Customer::where('email',$email)->get();
        $custom=collect();
        foreach($id_customer as $id_customer){
            if($id_customer->bill->id==$req->id_bill){
                $custom[]=$id_customer->bill->id;
            }
        }
        if($custom->count()>0){
            $bill=Bill::find($custom[0]);
                $id_customer=$bill->customer->id;
                $name_customer=$bill->customer->name;
                $gender_customer=$bill->customer->gender;
                $email_customer=$bill->customer->email;
                $phone_customer=$bill->customer->phone;
                $address_customer=$bill->customer->address;
                $total=$bill->total;
                $payment=$bill->payment;
                $note=$bill->note;
                $date= $bill->created_at;
                $date = Carbon::parse($date);
                $minute=$date->minute;
                $hour=$date->hour;
                $day=$date->day;
                $month=$date->month;
                $year=$date->year;
                $date=$hour.':'.$minute.' '.$day.'/'.$month.'/'.$year;
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
                    $rate=$i->rate;
                    $comment=$i->comment;
                    $image=$i->product->image_product->first();
                    $image=$image['image'];
                    $details[count($details)]=[
                        'id_detail'=>$id_detail,
                        'id_product'=>$id_product,
                        'name_product'=>$name_product,
                        'quantity'=>$quantity,
                        'price'=>$price,
                        'image'=>$image,
                        'rate'=>$rate,
                        'comment'=>$comment,
                    ];
                }
            $data=[
                'bill'=>[
                    'id_customer'=>$id_customer,
                    'name_customer'=>$name_customer,
                    'gender_customer'=>$gender_customer,
                    'email_customer'=>$email_customer,
                    'phone_customer'=>$phone_customer,
                    'address_customer'=>$address_customer,
                    'total'=>$total,
                    'payment'=>$payment,
                    'note'=>$note,
                    'status'=>$stt,
                    'created_at'=>$date,
                ],
                'billdetail'=>$details,
            ];
            return response()->json(['errorCode'=> null, 'data'=>$data], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>[],'error'=>'C?? l???i x??c th???c ho???c s???n ph???m c???m t??m kh??ng h???p l???'], 404);
        }
    }


    public function post_rating(request $req){
        if (!auth()->check()) {
            return response()->json(['errorCode'=> 4, 'data'=>null],404);
        }
        else{
            $id_detail=$req->Id_billdetail;
            $detail=BillDetail::find($id_detail);
            $id_product=$detail->id_product;
            $id=auth()->user()->id;
            $detail->rate=$req->rating;
            if($req->has('comment')){
                $detail->comment=$req->comment;
            }
            else{
                $detail->comment='';
            }
            if($detail->save()){
                // $rating=BillDetail::all();
                // $handle = fopen('../public/train_model/train_web.csv', 'w');
                // foreach($rating as $i){
                //     $email=$i->bill->customer->email;
                //     $user=User::where('email',$email)->pluck('id')->first();
                //     if(!$user){
                //         continue;
                //     }
                //     $row=[$user,$i->id_product,$i->rate];
                //     fputcsv($handle, $row, ' ');
                // }
                // fclose($handle);
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else{
                return response()->json(['errorCode'=> 4,'data'=>false], 401);
            }    
            
        }        
    }
    public function get_admin_list_rated(request $req){
        if((auth()->user()->isadmin=='manager')||(Auth()->user()->isadmin=='admin')||(Auth()->user()->isadmin=='merchandiser')){
            if($req->id_product==null){
                $rated=BillDetail::all();
            }
            else{
                $rated=BillDetail::where('id_product',$req->id_product)->get();
            }
            if($rated->count()>0){
                $n=$rated->count();
                $rated=$rated->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
                $t=0;
                foreach($rated as $i){
                    if($i->rate==0){
                        continue;
                    }
                    $t=$t+$i->rate;
                }
                $avg=$t/$n;
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'avg'=>$avg,'listData'=>$rated]], 200);
            }
            else{
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>0,'avg'=>0,'listData'=>[]]], 200);
            }
            
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'B???n kh??ng c?? quy???n ch???nh s???a chi ti???t ????n h??ng!'], 401);
        }
    }
    public function post_admin_delete_billdetail(request $req){
        if((auth()->user()->isadmin=='manager')||(Auth()->user()->isadmin=='admin')||(Auth()->user()->isadmin=='merchandiser')){
            $validator = Validator::make($req->all(),[
                'bill_detail'=>'required|exists:bill_detail,id',
                'id_bill'=>'required',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1,'data'=>null,'error'=>$validator->messages()], 401);
            }
            $bill=Bill::find($req->id_bill);
            $status=$bill->status->max('status');
            if($status!=null){
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'kh??ng th??? x??a s???n ph???m v?? ????n h??ng ???? ???????c duy???t!'], 401);
            }
            $a=BillDetail::find($req->bill_detail);
            $a->delete();
            return response()->json(['errorCode'=> null,'data'=>true], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'B???n kh??ng c?? quy???n ch???nh s???a chi ti???t ????n h??ng!'], 401);
        }
    }
}
