<?php

namespace App\Http\Controllers;
use App\Models\Bill;
use App\Models\User;
use App\Models\Customer;
use App\Models\Status;
use App\Models\BillDetail;
use App\Models\Product;
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


    public function post_bill_user_cancel_bill(request $req){
        $email=Bill::find($req->id_bill)->customer->email;
        if(!$email){
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Không tìm thấy hóa đơn!'], 500);
        }
        if(!auth()->user()){
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Bạn không phải là người mua đơn hàng có id: '.$req->id_bill.'!'], 500);
        }
        else{
            $email2=auth()->user()->email;
            if($email!=$email2){
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Bạn không phải là người mua đơn hàng có id: '.$req->id_bill.'!'], 500);
            }
        }
        $stt=Bill::find($req->id_bill)->status->last();
        if($stt){
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Bạn không thể hủy đơn hàng có id: '.$req->id_bill.'!'], 500);
        }
        else{
            $status=new Status;
            $status->id_bill=$req->id_bill;
            $status->id_user=auth()->user()->id;
            $status->status=5;
            if($status->save()){
                $bill_detail=BillDetail::where('id_bill',$req->id_bill)->get();
                foreach($bill_detail as $item){
                    $qty=$item->quantity;
                    $id_product=$item->id_product;
                    $product=Product::find($id_product);
                    $n=$product->quantity+$qty;
                    $product->quantity=$n;
                    $product->save();
                }
                return response()->json(['errorCode'=> null, 'data'=>true], 200);
            }else{
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Thao tác hủy đơn hàng có id: '.$req->id_bill.' thất bại!'], 500);
            }
        }
    }

    public function post_approve_bill(request $req){
        if((auth()->user()->isadmin=='Quản lý đơn hàng')||(Auth()->user()->isadmin=='admin')){
            $status1=Status::where('id_bill',$req->id_bill)->get();
            if($status1->count()>0){
                $status2=Status::where('id_bill',$req->id_bill)->max('status');
                if($status2=='4'){
                    return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Đơn hàng có id: '.$req->id_bill.' đã hoàn thành trước đó!'], 401);
                }
                $status=new Status;
                $status->id_user=auth()->user()->id;
                $status->id_bill=$req->id_bill;
                $status->status=$status2+1;
                if($status->save()){
                    return response()->json(['errorCode'=> null,'data'=>true], 200);
                }
                else{
                    return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Lỗi kết nối cơ sở dữ liệu!'], 401);
                }
            }
            else{
                $bill_detail=BillDetail::where('id_bill',$req->id_bill)->get();
                $data=[];
                foreach($bill_detail as $bill_detail){
                    $product = Product::find($bill_detail->product->id);
                    if($bill_detail->product->quantity<$bill_detail->quantity){
                        $data[count($data)]=['id_product'=>$product->id,'name'=>$product->name,'quantity'=>$product->quantity];
                    }
                }
                if(count($data)>0){
                    return response()->json(['errorCode'=> 4, 'data'=>$data], 401);
                }
                else{
                    $bill_detail=BillDetail::where('id_bill',$req->id_bill)->get();
                    foreach($bill_detail as $bill_detail){
                        $product = Product::find($bill_detail->product->id);
                        $product->quantity=$bill_detail->product->quantity-$bill_detail->quantity;
                        $product->count =$bill_detail->product->count+$bill_detail->quantity;
                        if(!$product->save()){
                            $status3=Status::where('id_bill',$req->id_bill)->get();
                            $status3->delete();
                            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Có lỗi trong quá trình trừ số lượng sản phẩm ra khỏi kho hàng!'], 401);
                        }
                    }
                }
                $status=new Status;
                $status->id_user=auth()->user()->id;
                $status->id_bill=$req->id_bill;
                $status->status=2;
                if($status->save()){
                    return response()->json(['errorCode'=> null,'data'=>true], 200);
                }
                else{
                    return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Có lỗi trong quá trình duyệt hóa đơn!'], 401);
                }
                
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Bạn không có quền duyệt đơn hàng có id: '.$req->id_bill.'!'], 401);
        }
    }

    public function get_admin_list_bill(request $req){
        if((auth()->user()->isadmin=='Quản lý đơn hàng')||(Auth()->user()->isadmin=='admin')||(Auth()->user()->isadmin=='telesale')){
            $c=Customer::where('phone','like','%'.$req->search.'%')->orwhere('id',$req->search)->orderBy('id', 'DESC')->get();
            if($c->count()==0){
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>0,'listData'=>[]]], 200);
            }
            $bill=collect();
            foreach($c as $c){
                $bill[]=$c->bill;
            }
            $data=collect();
            if($req->status==0){
                foreach($bill as $i){
                    $data[]=$i;
                }
            }
            elseif($req->status==1){
                foreach($bill as $i){
                    if($i->status->max('status')==null){
                        $data[]=$i;
                    }
                }
            }
            elseif($req->status==2){
                foreach($bill as $i){
                    if($i->status->max('status')==2){
                        $data[]=$i;
                    }
                }
            }
            elseif($req->status==3){
                foreach($bill as $i){
                    if($i->status->max('status')==3){
                        $data[]=$i;
                    }
                }
            }
            elseif($req->status==4){
                foreach($bill as $i){
                    if($i->status->max('status')==4){
                        $data[]=$i;
                    }
                }
            }
            elseif($req->status==5){
                foreach($bill as $i){
                    if($i->status->max('status')==5){
                        $data[]=$i;
                    }
                }
            }
            $datas=collect();
            foreach($data as $i){
                $customer=$i->customer;
                $bill_dt=$i->billdetail;
                $bill_stt=$i->status;
                $bill_status=collect();
                $bill_detail=collect();
                foreach($bill_stt as $u){
                    $bill_status[]=[
                        'status'=>$u->status,
                        'user'=>$u->admin->name,
                        'created_at'=>$u->updated_at->format('Y/m/d H:i:s'),
                        'updated_at'=>$u->updated_at->format('Y/m/d H:i:s'),
                    ];
                }
                foreach($bill_dt as $u){
                    $bill_detail[]=[
                        'id_detail'=>$u->id,
                        'id_product'=>$u->id_product,
                        'image'=>$u->product->image_product->sortBy(['parent', 'desc'])->last(),
                        'name_product'=>$u->product->name,
                        'price'=>$u->price,
                        'quantity'=>$u->quantity,
                        'rate'=>$u->rate,
                        'created_at'=>$u->updated_at->format('Y/m/d H:i:s'),
                        'updated_at'=>$u->updated_at->format('Y/m/d H:i:s'),
                    ];
                }
                $datas[]=[
                    'id_customer'=>$customer->id,
                    'name_customer'=>$customer->name,
                    'gender_customer'=>$customer->gender,
                    'email_customer'=>$customer->email,
                    'phone_customer'=>$customer->phone,
                    'address_customer'=>$customer->address,
                    'id_bill'=>$i->id,
                    'total'=>$i->total,
                    'payment'=>$i->payment,
                    'not'=>$i->note,
                    'created_at'=>$i->created_at->format('Y/m/d H:i:s'),
                    'updated_at'=>$i->updated_at->format('Y/m/d H:i:s'),
                    'bill_detail'=>$bill_detail,
                    'bill_status'=>$bill_status,
                ];
            }
            $n=$datas->count();
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$datas]], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Bạn không có quyền list đơn hàng!'], 401);
        }
    }

    public function post_cancel_bill(request $req){
        if((auth()->user()->isadmin=='Quản lý đơn hàng')||(Auth()->user()->isadmin=='admin')||(Auth()->user()->isadmin=='telesale')){
            $email=Bill::find($req->id_bill)->customer->email;
            $stt=Bill::find($req->id_bill)->status->last();
            if($stt){
                if($stt->status==4){
                    return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Bạn không thể hủy đơn hàng có id: '.$req->id_bill.' vì đơn hàng đã hoàn thành!'], 500);
                }
            }
            $status=new Status;
            $status->id_bill=$req->id_bill;
            $status->id_user=auth()->user()->id;
            $status->status=5;
            if($status->save()){
                $bill_detail=BillDetail::where('id_bill',$req->id_bill)->get();
                foreach($bill_detail as $item){
                    $qty=$item->quantity;
                    $id_product=$item->id_product;
                    $product=Product::find($id_product);
                    $n=$product->quantity+$qty;
                    $product->quantity=$n;
                    $product->save();
                }
                return response()->json(['errorCode'=> null, 'data'=>true], 200);
            }else{
                return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Thao tác hủy đơn hàng có id: '.$req->id_bill.' thất bại!'], 500);
            }
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Bạn không có quyền list đơn hàng!'], 401);
        }
    }
}
