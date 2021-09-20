<?php

namespace App\Http\Controllers;
use App\Models\Bill;
use App\Models\Customer;
use App\Models\BillDetail;
use App\Models\User;
use League\Csv\Writer;
use Carbon\Carbon;
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
        $id_customer=Customer::where('email',$email)->pluck('id')->first();
        $bill=Bill::where('id',$req->id_bill)->where('id_customer',$id_customer)->get();
        if($bill->count()>0){
            foreach($bill as $bill){
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
            return response()->json(['errorCode'=> 4, 'data'=>[],'error'=>'Có lỗi xác thực hoặc sản phẩm cầm tìm không hợp lệ'], 404);
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
            // echo $id_detail.'-<br>';
            // echo $id.'--<br>';
            // echo $id_product.'---<br>';
            // echo $req->rating.'----<br>';
            $detail->rate=$req->rating;
            if($req->has('comment')){
                $detail->comment=$req->comment;
            }
            else{
                $detail->comment='';
            }
            if($detail->save()){
                $rating=BillDetail::all();
                $handle = fopen('../public/train_model/train_web.csv', 'w');
                foreach($rating as $i){
                    $email=$i->bill->customer->email;
                    $user=User::where('email',$email)->pluck('id')->first();
                    $row=[$user,$i->id_product,$i->rate];
                    fputcsv($handle, $row, ' ');
                }
                fclose($handle);
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else{
                return response()->json(['errorCode'=> 4,'data'=>false], 401);
            }    
            
        }        
    }
}
