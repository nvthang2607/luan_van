<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Ratting;
use Validator;
class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */

    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register','ratting']]);
    }



    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $req) {
        $validator = Validator::make($req->all(), [
            'name' => 'required|string|between:2,50',
            'gender' => 'required',
            'email' => 'required|string|email|max:50|unique:users',
            'password' => 'required|string|min:8',
            'phone'=>'required|numeric',
            'address'=>'required',
        ]);

        if($validator->fails()){
            return response()->json(['errorCode'=> 1], 400);
        }
        $user=new User;
        $user->name=$req->name;
        $user->gender=$req->gender;
        $user->email=$req->email;
        $user->password=bcrypt($req->password);
        $user->address=$req->address;
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
    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errorCode'=> 1], 400);
        }

        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['errorCode'=> 2], 422);
        }

        return $this->createNewToken($token);
    }

    

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        return response()->json(auth()->user());
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
    public function ratting(Request $req){
        $a=[];
        $ratting=Ratting::all();
        // foreach($ratting as $rate){
        //     echo $rate;
        // }
        $n=count($ratting);
        $n2=ceil($n/3)*2;
        $n3=$n-$n2;
        //echo $n2;
        $ratting1=Ratting::all()->take($n2);
        $ratting2=Ratting::all()->skip($n3);
        // echo $ratting1;
        // echo $ratting2;
        
    }

}
