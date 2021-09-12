<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Box\Spout\Reader\Common\Creator\ReaderEntityFactory;
use DB;
use App\Models\Rating;
use Carbon\Carbon;

class UserController extends Controller
{
    //
    public function get_insert(){
        $now1=Carbon::now();
        $filePath = getcwd().'/ua_base.xlsx';
 
        $reader = ReaderEntityFactory::createReaderFromFile($filePath);
    
        $reader->open($filePath);
        $all_data = array();
        foreach ($reader->getSheetIterator() as $sheet) {
            foreach ($sheet->getRowIterator() as $row) {
                $cells = $row->getCells();
                $item = $row->toArray();
                $all_data[]= [
                    'id_user'=>$item[0],
                    'id_product'=>$item[1],
                    'ratting'=>$item[2],
                ];
            }
        }
        $reader->close();
        //dd($all_data);
        $all_data=collect($all_data);
        $chunks = $all_data->chunk(500);
        foreach ($chunks as $chunk){
            Rating::insert($chunk->toArray());
           
        }
        $now2=Carbon::now();
        echo 'Xong!<br>';
        echo 't1='.$now1.'<br>';
        echo 't2='.$now2.'<br>';
    }
    public function get_write_rating_to_csv()
    {
        $rating=Rating::all(['id_user','id_product','ratting']);
        $handle = fopen('../public/train_model/train_web.csv', 'w');
        foreach($rating as $i){
            $row=[$i->id_user,$i->id_product,$i->ratting];
            fputcsv($handle, $row, ' ');
        }
        fclose($handle);
        echo 'Xong!<br>';
    }
}