<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
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
    // $url = Storage::url('public/images/thangne.png');
    // echo $url;
    return view('upfile');
});
Route::post('/upload', [UserController::class, 'file']);