<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use File;
use App\Models\User;
use App\Models\Rating;
use App\Models\Product;
use Validator;
use Hash;

use Carbon\Carbon;

use Box\Spout\Reader\Common\Creator\ReaderEntityFactory;

use Box\Spout\Writer\Common\Creator\WriterEntityFactory;
use Box\Spout\Common\Entity\Row;
require_once '../vendor/box/spout/src/Spout/Autoloader/autoload.php';

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */

    public function __construct() {
        $this->middleware('auth:api', ['except' => ['post_login', 'post_register','post_update_profile']]);
    }



    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function post_register(Request $req) {
        $validator = Validator::make($req->all(), [
            'name' => 'required|string|between:2,50',
            'gender' => 'required',
            'email' => 'required|string|email|max:50|unique:users',
            'password' => 'required|string|min:8',
            'phone'=>'required|numeric',
            'idCommue'=>'required',
            'idDistrict'=>'required',
            'idCity'=>'required'
        ]);

        if($validator->fails()){
            return response()->json(['errorCode'=> 1,$validator->errors()->toJson()], 400);
        }
        $user=new User;
        $user->name=$req->name;
        $user->gender=$req->gender;
        $user->email=$req->email;
        $user->password=bcrypt($req->password);
        $user->address=$req->idCommue.', '.$req->idDistrict.', '.$req->idCity;
        $user->phone=$req->phone;
        $user->isadmin=0;
        $user->active=1;
        if($user->Save()){
            return response()->json(['errorCode'=> null,'data'=>true], 200);
        }
    }

    public function changepass(Request $request) {
        $validator = Validator::make($request->all(), [
            'old_password' => 'required|string|min:6',
            'new_password' => 'required|string|confirmed|min:6',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $id=auth()->user()->id;

        $user = User::find($id)->update(
            ['password' => bcrypt($request->new_password)]
        );
        return response()->json([
            'message' => 'User successfully change password',
            'user' => $user
        ], 201);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function post_login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errorCode'=> 1, 'data'=>null], 400);
        }

        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['errorCode'=> 2, 'data'=>null], 422);
        }

        return $this->createNewToken($token);
    }

    

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function post_logout() {
        auth()->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function post_refresh() {
        return $this->createNewToken(auth()->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function get_profile(){
        $name=auth()->user()->name;
        $email=auth()->user()->email;
        $gender=auth()->user()->gender;
        $phone =auth()->user()->phone ;
        $address=auth()->user()->address;
        $address = explode(", ", $address);
        $idCommune=$address[0];
        $idDistrict=$address[1];
        $idCity=$address[2];
        return response()->json(['errorCode'=> null, 'data'=>['name'=>$name,'email'=>$email,'gender'=>$gender,'phone'=>$phone,'idCity'=>$idCity,'idDistrict'=>$idDistrict,'idCommune'=>$idCommune]]);
    }
    public function post_update_profile(request $req){
        
        if(Hash::check($req->password,auth()->user()->password)){
            $user=User::find(auth()->user()->id);
            $user->name=$req->name;
            $user-> address=$req->idCommue.', '.$req->idDistrict.', '.$req->idCity;
            $user->gender=$req->gender;
            $user->phone=$req->phone;
            if($user->save()){
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else{
                return response()->json(['errorCode'=> 4, 'data'=>$e], 404);
            }
        }
        else{
            return response()->json(['errorCode'=> 2, 'data'=>null], 422);
        }
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'errorCode'=> null,
            'data' => ['accessToken'=>$token],
            //'token_type' => 'bearer',
            //'expires_in' => auth()->factory()->getTTL() * 60,
            //'user' => auth()->user()
        ]);
    }
}
