<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\City;
use App\Models\District;
use App\Models\Commune;
use Validator;
class AddressController extends Controller
{
    //
    public function city_select_list(Request $req){
        $city=City::all('matp','name');
        $data=[];
        $u=0;
        foreach($city as $i){
            $data=['id'=>$i->matp,'name'=> $i->name];
            $u++;
        }
        return response()->json(['errorCode'=> null,'data'=>$city], 200);
        echo $city;
    }
    public function district_select_list(Request $req){
        $validator = Validator::make($req->all(), [
            'idCity' => 'exists:devvn_tinhthanhpho,matp',
        ]);
        if($validator->fails()){
            return response()->json(['errorCode'=> 1], 400);
        }
        $district=District::where('matp',$req->idCity)->get(['name','maqh']);
        $data=[];
        $u=0;
        foreach($district as $i){
            $data[$u]=['id'=>$i->maqh,'name'=> $i->name];
            $u++;
        }
        return response()->json(['errorCode'=> null,'data'=>$data], 200);
    }
    public function commune_select_list(Request $req){
        $validator = Validator::make($req->all(), [
            'idDistrict' => 'exists:devvn_quanhuyen,maqh',
        ]);
        
        if($validator->fails()){
            return response()->json(['errorCode'=> 1], 400);
        }
        $commune=Commune::where('maqh',$req->idDistrict)->get(['xaid','name']);
        $data=[];
        $u=0;
        foreach($commune as $i){
            $data[$u]=['id'=>$i->xaid,'name'=> $i->name];
            $u++;
        }
        return response()->json(['errorCode'=> null,'data'=>$data], 200);
    }
}
