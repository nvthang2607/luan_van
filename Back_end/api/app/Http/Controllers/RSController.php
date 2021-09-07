<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use File;
use App\Models\User;
use App\Models\Rating;
use App\Models\Product;
use Validator;
use Carbon\Carbon;

class RSController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['get_train']]);
    }
   public function get_train(){
    // $o = exec('python C:/Users/vanth/Desktop/LUAN_VAN/Back_end/api/public/train_model/untitled0.py',$output,$ret_code);
    // $result = exec("C:/Users/vanth/Desktop/LUAN_VAN/Back_end/api/public/train_model/untitled0.py",$output);
    // dd($output);
    // $item=2;
    // $tmp = exec("C:/Users/vanth/Desktop/LUAN_VAN/Back_end/api/public/train_model/untitled0.py $item");
    // echo $tmp;
    // This is the data you want to pass to Python
    $data = array('as', 'df', 'gh');

    // Execute the python script with the JSON data
    $result = Shell_exec('C:/Users/vanth/Desktop/LUAN_VAN/Back_end/api/public/train_model/untitled0.py ' . escapeshellarg(json_encode($data)));

    // Decode the result
    $resultData = json_decode($result, true);

    // This will contain: array('status' => 'Yes!')
    var_dump($resultData);
   }
}