<?php

namespace App\Http\Controllers;
use App\Models\Bill;
use Illuminate\Http\Request;

class BillController extends Controller
{
    //
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['post_bill_create']]);
    }
    public function post_bill_create(request $req){
        $bill=new Bill;
        $bill->name=$req->name;
        $bill->gender=$req->gender;
        $bill->email=$req->email;
        $bill->phone=$req->phone;
        $bill->address=$req->address;
        $bill->total=$req->total;
        $bill->payment=$req->payment;
        $bill->note=$req->note;
    }
}
