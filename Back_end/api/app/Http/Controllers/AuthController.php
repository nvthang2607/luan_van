<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Ratting;
use App\Models\Product;
use Validator;
class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */

    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register','ratting','y','list_user_KNN','type_product_select_list']]);
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
            return response()->json(['errorCode'=> 1,$validator->errors()->toJson()], 400);
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
    public function profile(){
        return response()->json(['errorCode'=> null, 'data'=>auth()->user()]);
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
    //hàm lấy danh sách các sản phẩm được đánh giá bởi cả 2 user
    public function list_items_rated_user1_user2($id_user1,$id_user2){
        //lấy các sản phẩm mà được user1 đánh giá
        $user1_rated=Ratting::where('id_user',$id_user1)->get('id_product');
        //dd($user1_rated);
        $user2_rated=Ratting::where('id_user',$id_user2)->get('id_product');
        //2 mảng đển bỏ  id các sản phẩm vào
        $item1=[];
        $item2=[];
        //dd($user1_rated);
        //dd($user2_rated);
        //lấy tất cả id_user bỏ vào mảng item1;
        foreach($user1_rated as $key=>$i){
            $item1[count($item1)]=$i->id_product;
            //echo $i.'<br>';
        }
        //dd($item1);
        foreach($user2_rated as $key=>$i){
            $item2[count($item2)]=$i->id_product;
            //echo $i.'<br>';
        }
        //dd($item2);
        //lấy các item chung của 2 user
        $list_items=array_intersect($item1, $item2);
        //dd($list_items);
        //bỏ các giá trị trùng
        $list_items=array_unique($list_items);
        //dd(count($list_items));
        return $list_items;
    }
    public function sim_cosine_user($id_user1,$id_user2){
        $m=$this->list_items_rated_user1_user2($id_user1,$id_user2);
        if(count($m)!=0){
            //dd($m);
            $total=0;
            //tính toán Độ tương  tự giữa  người dùng  user1  và người dùng user2 dựa trên hàm cosine
            //lặp từng id của sản phẩm được bình chọn bởi cả 2 user
            //t5 và t6 là tổng bình phương của rui và ru'i
            $t5=0;$t6=0;
            foreach($m as $i){
                //echo $i.'-';
                //người dùng user1 đánh giá i
                $user1_rated_id=Ratting::where('id_user',$id_user1)->where('id_product',$i)->get('ratting');
                $user2_rated_id=Ratting::where('id_user',$id_user2)->where('id_product',$i)->get('ratting');
                //t1 là tổng ratting của user1 đối với i; t3 là số lượt ratting; 
                // //t2 là tổng ratting của user2 đối với i; t4 là số lượt ratting;
                $t1=0;$t2=0;$t3=0;$t4=0;
                foreach($user1_rated_id as $i2){
                    $temp=$i2->ratting;
                // echo 'id: '.$i.'= '.$temp.'<br>';
                    $t1=$t1+$temp;
                    $t3=$t3+1;
                }
                //tính ratting trung bình 
                $t1=$t1/$t3;
                //echo 'tong-id: '.$i.'= '.$t1.'<br>';
                foreach($user2_rated_id as $i2){
                    $temp=$i2->ratting;
                    //echo 'id: '.$i.'= '.$temp.'<br>';
                    $t2=$t2+$temp;
                    $t4=$t4+1;
                }
                $t2=$t2/$t4;
                //echo 'tong-id: '.$i.'= '.$t2.'<br>';
                $total=$total+($t1*$t2);
                $t5=$t5+($t1*$t1);
                $t6=$t6+($t2*$t2);
            }
            //echo 'total: '.$total.'<br>';
            //mẫu số
            //echo 't5: '.$t5.'<br>';
            //echo 't6: '.$t6.'<br>';
            $total2=sqrt($t5)*sqrt($t6);
            //echo 'total2: '.$total2.'<br>';

            //tính $total/$total2;
            //echo $total/$total2;
            return $total/$total2;
        }
        else{
            return 0;
        }
    }

    public function list_user_KNN(){
        $strain=Ratting::all()->take(2);
        $user=User::all();
        $product=Product::all();
        
        $cosine_uu=[];
        //echo $this->sim_cosine_user(11,23);
        foreach($user as $i){
            echo '-'.$i->id.'<br>';
            foreach($user as $i2){
                if($i->id==$i2->id){
                    continue;
                }
                echo '+++'.$i2->id.'<br>';
                $cosine_uu[count($cosine_uu)]=[$i->id,$i2->id,$this->sim_cosine_user($i,$i2)];
                echo 'sim= '.$this->sim_cosine_user($i,$i2).'<br>';
            }
        }


    }
    

    // public function ratting(Request $req){
    //     //$l=[];
    //     //$Ratting11=Ratting::where('id_product',11)->get('id_user');
    //     //dd($Ratting11);
    //     //lấy tất cả id_user bỏ vào mảng l;
    //     // foreach($Ratting11 as $key=>$i){
    //     //     $l[count($l)]=$i->id_user;
    //     //     //echo $i.'<br>';
    //     // }
    //     //-in mảng
    //     //dd($l);
    //     //-kiểm tra có tồn tại giá trị trong mảng ko?
    //     //echo in_array(23,$l);
    //     //-điếm số lần xuất hiện giá trị trong mảng
    //     //dd(array_count_values($l)[23]);
    //     //biến rate để kiểm tra giá trị tổng đánh giá của 2 user

    //     echo $this->sim_cosine_user(11,23);





    //     // $u='nguyễn';
    //     // $v='thắng';
    //     //  $p=[];
    //     //  $p1=[];
    //     // array_push($p,['họ'=>'nguyen']);
    //     // array_push($p1,['ten'=>'thang']);
    //     // $p2=array_merge($p, $p);
    //     // dd($p2);


    //     // $a1=[];
    //     // $t1=0;
    //     // foreach($user as $i){
    //     //     $a1[$t1]=$i->id;
    //     //     $t1=$t1+1;
    //     // }
    //     // //dd ($a1);
    //     // $a2=[];
    //     // $t2=0;
    //     // foreach($product as $i){
    //     //     $a2[$t2]=$i->id;
    //     //     $t2=$t2+1;
    //     // }
    //     //dd($a2);
    //     //$a1=[];
        
    //     // for($u1=0;$u1<count($a1);$u1++){
    //     //     for($u2=0;$u2<count($a2);$u2++){
    //     //         // echo $a1[$u];
    //     //         // echo $a2[$u1];
    //     //        $id_p=Ratting::where('id_user',$a1[$u1])->where('id_product',$a2[$u2])->get(['id_product','id_user']);
    //     //         foreach($id_p as $i){
    //     //             if($i!=''){
    //     //                 $t4=$i->id_product;
    //     //                 //echo $t4;
    //     //                 //echo $i->id_user;
    //     //                 for($u3=$u1+1;$u3<count($a1);$u3++){
    //     //                     if($u1==$u3) continue;
    //     //                     $user2=Ratting::where('id_user',$a1[$u3])->where('id_product',$t4)->get('id_product');
    //     //                     //echo $a3[$t3].'<br>';
    //     //                     foreach($user2 as $i2){
    //     //                         $t3=count($a3);
    //     //                         $a3[count($a3)]=$i2->id_product;
    //     //                         //echo 'user1: '.$a1[$u1].'-user2: '.$a1[$u3].'= '.$i2->id_product.'<br>';
    //     //                     }
                            
    //     //                 }
                        
    //     //             }
    //     //         }
    //     //     }
    //         //dd($a3);
    //     //}
    // }
    public function x($i,$u){
        $t=$i+$u;
        return $t;
    }
    public function y(){
        //echo 'o= '.$this->x(1,2);
    }

}
