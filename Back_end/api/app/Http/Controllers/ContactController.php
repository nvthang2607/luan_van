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
        
    }
}
