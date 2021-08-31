<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use File;
use App\Models\User;
use App\Models\Ratting;
use App\Models\Product;
use Validator;

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
        $this->middleware('auth:api', ['except' => ['login', 'register','ratting','y','list_user_KNN','user_ratting_item','convert']]);
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
                 //echo 'id: '.$i.'= '.$temp.'<br>';
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
           // echo 't5: '.$t5.'<br>';
           // echo 't6: '.$t6.'<br>';
            $total2=sqrt($t5)*sqrt($t6);
            //echo 'total2: '.$total2.'<br>';

            //tính $total/$total2;
            //echo $total/$total2.'<br>';
            return $total/$total2;
        }
        else{
            return 0;
        }
    }

    public function list_user_KNN($id_user){
        $user=User::all();
        
        $cosine_uu=[];
        foreach($user as $i){
            //echo '-'.$i->id.'<br>';
            if($i->id==$id_user){
                    continue;
            }
            if($this->sim_cosine_user($id_user,$i->id)!=0){
                //$cosine_uu[count($cosine_uu)]=[$id_user,$i->id,$this->sim_cosine_user($id_user,$i->id)];
                $cosine_uu[count($cosine_uu)]=[$i->id,$this->sim_cosine_user($id_user,$i->id)];
            } 
            //echo 'sim= '.$this->sim_cosine_user($id_user,$i->id).'<br>';
        }
        //echo $this->sim_cosine_user(11,23);
        //$k=$cosine_uu;
        usort($cosine_uu, function($a, $b) {
            return $a[1] <=> $b[1];
        });
        return $cosine_uu;
    }
    
    public function user_ratting_item(){
        // lấy danh sách
        //$k=$this->list_user_KNN(11);
        //dd($k);
        $user=User::all();
        //để chứa dự đoán rui cho các sản phẩm
        $rate=[];
        //chạy tất cả user
        foreach($user as $i){
            echo '-du_doan cua user thu '.$i->id.':<br>';
            //echo '-'.$i->id.'<br>';
            //lấy giá trị trung bình của Rui
            $user1=Ratting::where('id_user',$i->id)->get('ratting');
            $temp=0;
            foreach($user1 as $u1){
                echo '++++++'.$u1->ratting.'<br>';
                $temp=$temp+$u1->ratting;
               
            }
            if(count($user1)>0){
                //đây giá trị trung bình Ru
                $temp=$temp/count($user1);
            }
            echo '-Ru: '.$temp.'<br>';


            //danh sach người dùng láng giềng của người dùng
            //$rate[count($rate)]=$this->list_user_KNN($i->id);
            $k=$this->list_user_KNN($i->id);
             echo '-danh sách các láng giềng của user:'.$i->id.'<br>';
             for($u=0;$u<count($k);$u++){
                 echo '++id_user= '.$k[$u][0];
            }
             echo '<br>';
            $kq1=[];
            //hết hàm đánh giá trung bình của Rui
            //dự đoán đánh giá của user đối với sản phẩm i
            $product=Product::all();
            foreach($product as $p){
                echo '---sản phẩm '.$p->id.':<br>';
                $m1=0;
                $m2=0;
                
                for($u=0;$u<count($k);$u++){
                    echo '++++++id_user= '.$k[$u][0].'<br>';
                    //echo '---sim= '.$k[$u][1].'<br>';
                    //hàm đánh giá  Ru2
                    echo '++++++sim '.$k[$u][1].':<br>';
                    $user2=Ratting::where('id_user',$k[$u][0])->get('ratting');
                    $temp2=0;
                    foreach($user2 as $u2){
                        //echo '++++++++++++++'.$u2->ratting.'<br>';
                        $temp2=$temp2+$u2->ratting;
                    
                    }
                    if(count($user2)>0){
                        //đây giá trị trung bình Ru'i
                        $temp2=$temp2/count($user2);
                    }
                    echo '++++++Ru2: '.$temp2.'<br>';
                    //hết hàm đánh giá trung bình
                    //lấy đánh giá của láng giềng với sản phẩm Ru'i 
                    $rui2=Ratting::where('id_user',$k[$u][0])->where('id_product',$p->id)->get('ratting');
                    $temp3=0;
                    if(count($rui2)>0){
                        //echo 'count= '.count($rui2).'<br>';
                        $count=count($rui2);
                        foreach($rui2 as $rui2){
                            //echo '+++++++++rui: '.$rui2->ratting.'<br>';
                            $temp3=$temp3+$rui2->ratting;
                        }
                        $temp3=$temp3/$count;
                        
                    }
                    echo '++++++rui: '.$temp3.'<br>';
                    $m1=$m1+$k[$u][1]*($temp3-$temp2);
                    //echo '++++++m='.$m.'<br>';
                    $m2=$m2+abs($k[$u][1]);
                }
                echo 'm1= '.$m1.'<br>';
                echo 'm2= '.$m2.'<br>';
                if($m2>0){
                    $kq=$temp+($m1/$m2);
                }
                else{
                    $kq=0;
                }
                echo 'kết quả= '.$kq.'<br>';
                $kq1[count($kq1)]=$kq;
            }
            //dd($kq1);
            $rate[count($rate)]=$kq1;
        }
        dd($rate);
    }


    
    public function convert(){
        $now1=Carbon::now();
        $data=collect();
        $u=0;
        $user=Ratting::where('id_user',1)->get('ratting');
        $user1=$user->chunk(100);
        foreach($user1 as $i){
            foreach($i as $i2){
                //echo 'name'.$u.':'.$i2->raa.'<br>';
                // $u++;
                $u=$u+$i2->ratting;   
            }
            
        }
        echo $u."<br>";
        $now2=Carbon::now();
        echo 't1='.$now1.'<br>';
        echo 't2='.$now2.'<br>';
        echo 'Xong!';

        //lấy phần chung
        // $collection = collect(['a', 'b', 'c','d']);
        // $collection1 = collect(['a', 'c', 'f','g']);
        // // dd($collection->duplicates());
        // $collection2 = $collection1->intersect($collection);
        // dd($collection2);



        //echo $data;
        //*****đọc file csv
        // $file = fopen('user.csv', 'r');
        // $all_data = array();
        // while (($data = fgetcsv($file,1000,'|')) !==FALSE )
        //     {
        //     $id=$data[0];
        //     array_push($all_data,[$id]);
        // }
        // fclose($file);
        //dd($all_data);

        //******đọc file xlsx
        // $filePath = getcwd().'/item.xlsx';
 
        // $reader = ReaderEntityFactory::createReaderFromFile($filePath);
    
        // $reader->open($filePath);
        // $all_data = array();
        // foreach ($reader->getSheetIterator() as $sheet) {
        //     foreach ($sheet->getRowIterator() as $row) {
        //         $cells = $row->getCells();
        //         $item = $row->toArray();
        //         array_push($all_data, [$item[0]]);
        //     }
        // }
        // $reader->close();
        //dd($all_data);

        //*****ghi file excel
        // $filePath = getcwd().'/item.xlsx';
        
        // $writer = WriterEntityFactory::createXLSXWriter();
        // if (File::exists($filePath)) {
        //     if(!File::delete($filePath)){
        //         dd('File đã tồn tại, đóng file trước khi update');
        //     }
        // }
        // $writer->openToFile($filePath);
        // foreach ($all_data as $d) {
        //     $cells = [
        //         WriterEntityFactory::createCell((int)$d[0]),
        //     ];
    
        //     $singleRow = WriterEntityFactory::createRow($cells);
        //     $writer->addRow($singleRow);
        // }
        // $writer->close();
        //echo 'xong rồi!';

        
    }
    
    public function x($i,$u){
        $t=$i+$u;
        return $t;
    }
    public function y(){
        //echo 'o= '.$this->x(1,2);
    }

}
