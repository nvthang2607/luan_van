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
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\BillDetailController;
use App\Http\Controllers\CustomerController;

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

Route::group([
    'middleware' => 'api',
    'prefix' => 'insert'

], function ($router) {
    Route::get('/rating', [UserController::class, 'get_insert']);
    Route::get('/csv', [UserController::class, 'get_write_rating_to_csv']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'users'

], function ($router) {
    Route::post('/login', [AuthController::class, 'post_login']);
    Route::post('/login/google', [AuthController::class, 'post_login_google']);
    Route::post('/logout/google', [AuthController::class, 'post_logout_google']);
    Route::post('/register', [AuthController::class, 'post_register']);
    Route::post('/logout', [AuthController::class, 'post_logout']);
    Route::post('/refresh', [AuthController::class, 'post_refresh']);
    Route::get('/profile', [AuthController::class, 'get_profile']);
    Route::post('/update_profile', [AuthController::class, 'post_update_profile']);
    Route::post('/recommend', [RSController::class, 'post_recommend']);
    Route::post('/change_password', [AuthController::class, 'post_change_password']);
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
    Route::post('/', [ProductController::class, 'post_product']);
    Route::get('/{id}', [ProductController::class, 'get_product_id']);
    Route::post('/rating', [ProductController::class, 'post_product_rating']);
    Route::post('/comment', [CommentController::class, 'post_product_comment']);
    Route::post('/filter', [ProductController::class, 'post_product_filter']);
});    


Route::group([
    'middleware' => 'api',

], function ($router) {
    Route::get('/search', [SearchController::class, 'get_search_product_news']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'rating'

], function ($router) {
    Route::post('/', [BillDetailController::class, 'post_rating']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'order'

], function ($router) {
    Route::post('/create', [OrderController::class, 'post_order_create']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'news'

], function ($router) {
    Route::post('/', [NewsController::class, 'post_news']);
    Route::get('/{id}', [NewsController::class, 'get_news_id']);
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'promotion'

], function ($router) {
    Route::post('/check', [PromotionController::class, 'post_promotion_check']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'bill'

], function ($router) {
    Route::post('/create', [BillController::class, 'post_bill_create']);
    Route::post('/user_list_bill', [BillController::class, 'post_bill_user_list_bill']);
    Route::get('/user_list_billdetail/{id_bill}', [BillDetailController::class, 'get_billdetail_user_list_billdetail']);
    Route::post('/user_cancel_bill', [BillController::class, 'post_bill_user_cancel_bill']);
    Route::post('/approve', [BillController::class, 'post_bill_approve']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'admin'

], function ($router) {
    Route::post('/list_users', [UserController::class, 'post_admin_list_users']);
    Route::post('/update_users', [UserController::class, 'post_admin_update_users']);
    Route::get('/active_users/{id_user}', [UserController::class, 'get_admin_active_users']);
    Route::get('/delete_users/{id_user}', [UserController::class, 'get_admin_delete_users']);
    Route::get('/search_users', [UserController::class, 'get_admin_search_users']);
    Route::post('/list_customers', [CustomerController::class, 'post_admin_list_customers']);
    Route::post('/delete_customers/{id_customer}', [CustomerController::class, 'post_admin_delete_customers']);
});
Route::get('test', function () {
    $content=Storage::get('news1.jpg');
    $mime = Storage::mimeType('news1.jpg');
    $response = Response::make($content, 200);
    $response->header('Content-Type', $mime);
    return response()->json(['errorCode'=> null,'data'=>$response], 200);
});