<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Tymon\JWTAuth\Facades\JWTFactory;
use File;
use App\Models\User;
use App\Models\Rating;
use App\Models\Product;
use App\Models\City;
use App\Models\district;
use App\Models\commune;
use Validator;
use Hash;
use Illuminate\Http\Response;
Use Cookie;
use Session;

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
        $this->middleware('auth:api', ['except' => ['post_login', 'post_register','post_login_google','post_change_password','post_send_mail','post_check_code']]);
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
        $user->isadmin='user';
        $user->active=1;
        
        return response()->json(['errorCode'=> null,'data'=>true], 200);
        
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
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errorCode'=> 1, 'data'=>null], 400);
        }
        $user=User::where('email',$request->email)->pluck('isadmin')->first();
        if($user=='user'){
            $payloadable = [
                'isAdmin'=>false
            ];
        }
        else{
            $payloadable = [
                'isAdmin'=>'admin'
            ];
        }
        if (! $token = auth::claims($payloadable)->attempt(['email'=>$request->email, 'password'=>$request->password,'active'=>1])) {
            return response()->json(['errorCode'=> 2, 'data'=>null], 422);
        }
        
        return $this->createNewToken($token);
    }

    public function post_login_google(Request $req){
    	$validator = Validator::make($req->all(),[
            'email' => 'required|string|email|max:50',
        ]);
        if ($validator->fails()) {
            return response()->json(['errorCode'=> 1, 'data'=>null], 400);
        }
        $validator = Validator::make($req->all(),[
            'email' => 'exists:users,email',
        ]);
        if ($validator->fails()) {
            $user=new User;
            $user->email=$req->email;
            $user->name=$req->name;
            $user->isadmin='user';
            $user->active=1;
            $user->password=bcrypt('1');
            $user->save();
        }
        if (! $token = ($user = Auth::getProvider()->retrieveByCredentials($req->only(['email'])))? Auth::login($user): false){
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
        $id=auth()->user()->id;
        $name=auth()->user()->name;
        $email=auth()->user()->email;
        if(!auth()->user()->gender){
            $gender='';
        }
        else{
            $gender=auth()->user()->gender;
        }
        
        if(!auth()->user()->phone){
            $phone='';
        }
        else{
            $phone=auth()->user()->phone;
        }
        if(auth()->user()->address){
            $address=auth()->user()->address;
            $address = explode(", ", $address);
            $idCommune=$address[0];
            $idDistrict=$address[1];
            $idCity=$address[2];
            $nameCommune=commune::where('xaid',$idCommune)->pluck('name')->first();
            // $nameCommune=$nameCommune->name;
            $nameDistrict=district::where('maqh',$idDistrict)->pluck('name')->first();
            // $nameDistrict=$nameDistrict->name;
            $nameCity=City::where('matp',$idCity)->pluck('name')->first();
            // $nameCity=$nameCity->name;
        }
        else{
            $idCommune='';
            $idDistrict='';
            $idCity='';
            $nameCommune='';
            // $nameCommune=$nameCommune->name;
            $nameDistrict='';
            // $nameDistrict=$nameDistrict->name;
            $nameCity='';
            // $nameCity=$nameCity->name;
        }
        
        return response()->json(['errorCode'=> null, 'data'=>['id'=>$id,'name'=>$name,'email'=>$email,'gender'=>$gender,'phone'=>$phone,
            'idCity'=>$idCity,'idDistrict'=>$idDistrict,'idCommune'=>$idCommune,'nameCommune'=>$nameCommune,'nameDistrict'=>$nameDistrict,'nameCity'=>$nameCity]]);
    }
    public function post_update_profile(request $req){
        if(Hash::check($req->password,auth()->user()->password)){
            $user=User::find(auth()->user()->id);
            $user->name=$req->name;
            $user-> address=$req->idCommune.', '.$req->idDistrict.', '.$req->idCity;
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
    public function post_change_password(request $req){
        if (!auth()->check()) {
            return response()->json(['errorCode'=> 4, 'data'=>false],401);
        }
        if(Hash::check($req->oldPassword,auth()->user()->password)){
            $user=User::find(auth()->user()->id);
            $user->password=bcrypt($req->newPassword);
            if($user->save()){
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else{
                return response()->json(['errorCode'=> 3, 'data'=>$e], 404);
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

    public function post_send_mail(request $req){
        $validator = Validator::make($req->all(), [
            'email' => 'exists:users,email',
        ]);
        if ($validator->fails()) {
            return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
        }
        //tạo 1 dãy số 4 chữ số ngẫu nhiêu làm mã xác nhận
        $rand=rand(1000,9999);
        //biến để set cookie
        $response=new Response;
        // //set cookie với thời gian 1 phút
        // Cookie::queue('a', $rand, 5);
        Session::put($req->email,$rand);
        $data = [
            'email'=>$req->email,
            'rand'=>$rand,
        ];
        //gửi data['rand']cho mail data['email']
        Mail::send('email.email_pass',['data'=>$data], function ($message) use($data){
            $message->from('vanthang260799@gmail.com',"SANGTV");
            $message->to($data['email']);
            $message->subject('Xác nhận tài khoản SANGTV Shop');
        });
        return response()->json(['errorCode'=> null,'data'=>true], 200);
    }
    public function post_check_code(request $req){
        $validator = Validator::make($req->all(), [
            'email' => 'exists:users,email',
        ]);
        if ($validator->fails()) {
            return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
        }
        //return response()->json(['errorCode'=> null,'data'=>$req->email], 200);
        if(Session::get($req->email)==null){
            return response()->json(['errorCode'=> 4, 'data'=>null,'error'=>'Mã xác nhận hết hạn!'], 401);
        }
        //nếu chưa quá hạn
        else{
            if($req->code==Session::get($req->email)){
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
            else{
                return response()->json(['errorCode'=> 4, 'data'=>false], 401);
            }
        }
    }
    public function post_reset_password(request $req){
        $validator = Validator::make($req->all(), [
            'email' => 'exists:users,email',
            'password' => 'required|string|min:8',
        ]);
        if ($validator->fails()) {
            return response()->json(['errorCode'=> 1, 'data'=>null,'error'=>$validator->messages()], 400);
        }
        $user=User::where('email',$req->email)->get();
        foreach($user as $i){
            $i->password=$req->password;
            if($i->save()){
                return response()->json(['errorCode'=> null,'data'=>true], 200);
            }
        }
    }
}
