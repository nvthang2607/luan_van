<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Box\Spout\Reader\Common\Creator\ReaderEntityFactory;
use DB;
use App\Models\BillDetail;
use App\Models\Bill;
use App\Models\User;
use Carbon\Carbon;

class UserController extends Controller
{
    //
    public function get_insert(){
        ini_set('max_execution_time', 600);
        $now1=Carbon::now();
        $filePath = getcwd().'/ua_base.xlsx';
        $reader = ReaderEntityFactory::createReaderFromFile($filePath);
        $reader->open($filePath);
        $all_data = array();
        foreach ($reader->getSheetIterator() as $sheet) {
            foreach ($sheet->getRowIterator() as $row) {
                $cells = $row->getCells();
                $item = $row->toArray();
                if($item[0]<=100&&$item[1]<=300){
                    // echo $item[0].'<br>';
                    $a=new BillDetail;
                    $a->id_bill = $item[0];
                    $a->id_product = $item[1];
                    $a->rate=$item[2];
                    $a->quantity=1;
                    $a->price=1000000;
                    $a->comment='abc';
                    $a->save();
                }
                
            }
        }
        $reader->close();
        $now2=Carbon::now();
        echo 'Xong!<br>';
        echo 't1='.$now1.'<br>';
        echo 't2='.$now2.'<br>';
    }
    public function get_write_rating_to_csv()
    {
        ini_set('max_execution_time', 600);
        $rating=BillDetail::all();
        $handle = fopen('../public/train_model/train_web.csv', 'w');
        foreach($rating as $i){
            $email=$i->bill->customer->email;
            $user=User::where('email',$email)->pluck('id')->first();
            if(!$user){
                continue;
            }
            $row=[$user,$i->id_product,$i->rate];
            fputcsv($handle, $row, ' ');
        }
        fclose($handle);
        echo 'Xong!<br>';
    }
}
