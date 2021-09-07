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
use App\Http\Controllers\RatingController;
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

Route::get('/train', [RSController::class, 'get_train']);

Route::group([
    'middleware' => 'api',
    'prefix' => 'insert'

], function ($router) {
    Route::get('/users', [UserController::class, 'get_insert']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'users'

], function ($router) {
    Route::post('/login', [AuthController::class, 'post_login']);
    Route::post('/register', [AuthController::class, 'post_register']);
    Route::post('/logout', [AuthController::class, 'post_logout']);
    Route::post('/refresh', [AuthController::class, 'post_refresh']);
    Route::get('/profile', [AuthController::class, 'get_profile']);
    Route::post('/update_profile', [AuthController::class, 'post_update_profile']);
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'address'

], function ($router) {
    Route::get('/city/select_list', [AddressController::class, 'get_city_select_list']); 
    Route::post('/district/select_list', [AddressController::class, 'post_district_select_list']); 
    Route::post('/commune/select_list', [AddressController::class, 'post_commune_select_list']); 
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'type_product'

], function ($router) {
    Route::get('/select_list', [TypeProductController::class, 'get_type_product_select_list']);

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
    'prefix' => 'type_and_branch'

], function ($router) {
    Route::get('/select_list', [TypeProductController::class, 'get_type_and_branch_select_list']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'product'

], function ($router) {
    Route::get('/search', [ProductController::class, 'get_product_search']);
    Route::get('/{id}', [ProductController::class, 'get_product_id']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'rating'

], function ($router) {
    Route::post('/', [RatingController::class, 'post_rating']);
});