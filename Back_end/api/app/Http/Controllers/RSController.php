<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use File;
use App\Models\User;
use App\Models\Ratting;
use App\Models\Product;
use Validator;

use Carbon\Carbon;

class RSController extends Controller
{
    //
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
        dd($list_items);
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
                echo $i.'-';
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
           //echo 't5: '.$t5.'<br>';
           //echo 't6: '.$t6.'<br>';
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
        ini_set('max_execution_time', 300);
        $user=User::all();
        $cosine_uu=[];
        $users = $user->chunk(100);
        foreach ($users as $users) {
            //Do something
            foreach($users as $i){
                echo '--'.$i->id.'<br>';
                if($i->id!=$id_user){
                    $t=$this->sim_cosine_user($id_user,$i->id);
                    if($t!=0){
                        //$cosine_uu[count($cosine_uu)]=[$id_user,$i->id,$this->sim_cosine_user($id_user,$i->id)];
                        $cosine_uu[]=$t;
                    } 
                    //echo 'sim'.$i->id.'= '.$t.'<br>';
                }
                
            }
        }
        //echo $this->sim_cosine_user(11,23);
        //$k=$cosine_uu;
        $cosine_uu=collect($cosine_uu)->sortDesc();
        $cosine_uu=$cosine_uu->take(100);
        return $cosine_uu;
    }
    
    public function train(){
        //lấy danh sách
        $now1=Carbon::now();
        //$this->list_user_KNN(2);
        $this->sim_cosine_user(2,3);
        $now2=Carbon::now();
        echo 't1='.$now1.'<br>';
        echo 't2='.$now2.'<br>';
        echo 'Xong!';
        //dd($k);
        $user=User::all();
        //để chứa dự đoán rui cho các sản phẩm
        $rate=[];
        //chạy tất cả user
        //foreach($user as $i){
            //echo '-du_doan cua user thu '.$i->id.':<br>';
            //echo '-'.$i->id.'<br>';
            //lấy giá trị trung bình của Rui
            // $user1=Ratting::where('id_user',$i->id)->get('ratting');
            // $temp=0;
            // foreach($user1 as $u1){
            //     echo '++++++'.$u1->ratting.'<br>';
            //     $temp=$temp+$u1->ratting;
               
            // }
            // if(count($user1)>0){
            //     //đây giá trị trung bình Ru
            //     $temp=$temp/count($user1);
            // }
            // echo '-Ru: '.$temp.'<br>';


            // //danh sach người dùng láng giềng của người dùng
            // //$rate[count($rate)]=$this->list_user_KNN($i->id);
            // $k=$this->list_user_KNN($i->id);
            //  echo '-danh sách các láng giềng của user:'.$i->id.'<br>';
            //  for($u=0;$u<count($k);$u++){
            //      echo '++id_user= '.$k[$u][0];
            // }
            //  echo '<br>';
            // $kq1=[];
            // //hết hàm đánh giá trung bình của Rui
            // //dự đoán đánh giá của user đối với sản phẩm i
            // $product=Product::all();
            // foreach($product as $p){
            //     echo '---sản phẩm '.$p->id.':<br>';
            //     $m1=0;
            //     $m2=0;
            //     for($u=0;$u<count($k);$u++){
            //         echo '++++++id_user= '.$k[$u][0].'<br>';
            //         //echo '---sim= '.$k[$u][1].'<br>';
            //         //hàm đánh giá  Ru2
            //         echo '++++++sim '.$k[$u][1].':<br>';
            //         $user2=Ratting::where('id_user',$k[$u][0])->get('ratting');
            //         $temp2=0;
            //         foreach($user2 as $u2){
            //             //echo '++++++++++++++'.$u2->ratting.'<br>';
            //             $temp2=$temp2+$u2->ratting;
                    
            //         }
            //         if(count($user2)>0){
            //             //đây giá trị trung bình Ru'i
            //             $temp2=$temp2/count($user2);
            //         }
            //         echo '++++++Ru2: '.$temp2.'<br>';
            //         //hết hàm đánh giá trung bình
            //         //lấy đánh giá của láng giềng với sản phẩm Ru'i 
            //         $rui2=Ratting::where('id_user',$k[$u][0])->where('id_product',$p->id)->get('ratting');
            //         $temp3=0;
            //         if(count($rui2)>0){
            //             //echo 'count= '.count($rui2).'<br>';
            //             $count=count($rui2);
            //             foreach($rui2 as $rui2){
            //                 //echo '+++++++++rui: '.$rui2->ratting.'<br>';
            //                 $temp3=$temp3+$rui2->ratting;
            //             }
            //             $temp3=$temp3/$count;
                        
            //         }
            //         echo '++++++rui: '.$temp3.'<br>';
            //         $m1=$m1+$k[$u][1]*($temp3-$temp2);
            //         //echo '++++++m='.$m.'<br>';
            //         $m2=$m2+abs($k[$u][1]);
            //     }
            //     echo 'm1= '.$m1.'<br>';
            //     echo 'm2= '.$m2.'<br>';
            //     if($m2>0){
            //         $kq=$temp+($m1/$m2);
            //     }
            //     else{
            //         $kq=0;
            //     }
            //     echo 'kết quả= '.$kq.'<br>';
            //     $kq1[count($kq1)]=$kq;
            // }
            // //dd($kq1);
            // $rate[count($rate)]=$kq1;
        //}
        //dd($rate);
    }
}
