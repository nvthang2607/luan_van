<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use Carbon\Carbon;
Route::get('/', function () {
    return view('welcome');
});
Route::get('test', function () {
    $date=Carbon::now('Asia/Ho_Chi_Minh');
  echo "ôK";
  //Storage::put('avatars/thang.txt', 'lalalala');
//$avatars = asset('avatars/thang.txt');
    $content=Storage::get('news1.jpg');
    $mime = Storage::mimeType('news1.jpg');
    $response = Response::make($content, 200);
    $response->header('Content-Type', $mime);
    return $response;
});