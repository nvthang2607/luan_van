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

    $item=50;
    $o = exec("python C:/Users/vanth/Desktop/LUAN_VAN/Back_end/api/public/train_model/rs.py $item",$output,$ret_code);
    dd($output);
   }
}