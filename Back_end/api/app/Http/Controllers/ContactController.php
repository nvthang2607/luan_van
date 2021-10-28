<?php

namespace App\Http\Controllers;
use App\Models\Contact;
use Validator;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['post_contact_create']]);
    }
    public function post_contact_create(request $req){
        $validator = Validator::make($req->all(),[
            'name'=>'required',
            'phone'=>'required|numeric',
            'email'=>'email',
        ]);
        if ($validator->fails()) {
            return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
        }
        $contact=new Contact;
        if($contact->fill($req->input())->save()){
            return response()->json(['errorCode'=> null,'data'=>true], 200);
        }
        else{
            return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>'Có lỗi trong quá trình gửi thông tin liên hệ!'], 400);
        }
    }

    public function get_admin_list_contact(request $req){
        if((auth()->user()->isadmin=='manager')||(Auth()->user()->isadmin=='admin')){
            $contact=Contact::where('name','like','%'.$req->search.'%')->orwhere('phone',$req->search)->orderBy('id', 'DESC')->get();
            if($contact->count()==0){
                return response()->json(['errorCode'=> null,'data'=>['totalCount'=>0,'listData'=>[]]], 200);
            }
            if($req->check=='0'){
                $contact=$contact->where('check','0');
            }
            if($req->check=='1'){
                $contact=$contact->where('check','1');
            }
            $n=$contact->count();
            $contact=$contact->skip(($req->page-1)*$req->pageSize)->take($req->pageSize);
            return response()->json(['errorCode'=> null,'data'=>['totalCount'=>$n,'listData'=>$contact]], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Bạn không có quyền list đơn hàng!'], 401);
        }
    }

    public function post_admin_checked_contact(request $req){
        if((auth()->user()->isadmin=='manager')||(Auth()->user()->isadmin=='admin')){
            $validator = Validator::make($req->all(),[
                'id_contact'=>'required|exists:contact,id',
            ]);
            if ($validator->fails()) {
                return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
            }
            $contact=Contact::find($req->id_contact);
            $contact->check=1;
            $contact->save();
            return response()->json(['errorCode'=> null,'data'=>true], 200);
        }
        else{
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Bạn không có quyền xem liên hệ!'], 401);
        }
    }
}
