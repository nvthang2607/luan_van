<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\TypeProductController;
use App\Http\Controllers\BranchProductController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RSController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/train', [RSController::class, 'train']);
Route::group([
    'middleware' => 'api',
    'prefix' => 'insert'

], function ($router) {
    Route::get('/users', [UserController::class, 'insert']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'users'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/profile', [AuthController::class, 'profile']);    
    Route::post('/changepass', [AuthController::class, 'changepass']); 
    Route::get('/ratting', [AuthController::class, 'user_ratting_item']); 
    Route::get('/convert', [AuthController::class, 'convert']);
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'address'

], function ($router) {
    Route::get('/city/select_list', [AddressController::class, 'city_select_list']); 
    Route::post('/district/select_list', [AddressController::class, 'district_select_list']); 
    Route::post('/commune/select_list', [AddressController::class, 'commune_select_list']); 
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'type_product'

], function ($router) {
    Route::get('/select_list', [TypeProductController::class, 'type_product_select_list']); 
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'branch_product'

], function ($router) {
    Route::post('/select_list', [BranchProductController::class, 'post_branch_product_select_list']); 
    Route::get('/select_list', [BranchProductController::class, 'get_branch_product_select_list']); 
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'product'

], function ($router) {
    Route::get('/search', [ProductController::class, 'product_search']); 
});