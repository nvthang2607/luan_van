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
        $city=City::all()->pluck('matp','name');
        return response()->json(['errorCode'=> null,'data'=>$city], 200);
    }
    public function district_select_list(Request $req){
        $validator = Validator::make($req->all(), [
            'idCity' => 'exists:devvn_tinhthanhpho,matp',
        ]);
        if($validator->fails()){
            return response()->json(['errorCode'=> 1], 400);
        }
        $district=District::where('matp',$req->idCity)->pluck('maqh','name');
        return response()->json(['errorCode'=> null,'data'=>$district], 200);
    }
    public function commune_select_list(Request $req){
        $validator = Validator::make($req->all(), [
            'idDistrict' => 'exists:devvn_quanhuyen,maqh',
        ]);
        
        if($validator->fails()){
            return response()->json(['errorCode'=> 1], 400);
        }
        $commune=Commune::where('maqh',$req->idDistrict)->pluck('xaid','name');
        return response()->json(['errorCode'=> null,'data'=>$commune], 200);
    }
}
