<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\TypeProductController;
use App\Http\Controllers\BrandProductController;
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
use App\Http\Controllers\ImageController;
use App\Http\Controllers\InformationController;
use App\Http\Controllers\SlideController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FeedbackController;
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
    'prefix' => 'brand_product'

], function ($router) {
    Route::post('/select_list', [BrandProductController::class, 'post_brand_product_select_list']); 
    Route::get('/select_list', [BrandProductController::class, 'get_brand_product_select_list']); 
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'type_and_brand'

], function ($router) {
    Route::get('/select_list', [TypeProductController::class, 'get_type_and_brand_select_list']);
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
    
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'contact'

], function ($router) {
    Route::post('/create', [ContactController::class, 'post_contact_create']);  
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'comment'

], function ($router) {
    Route::post('/create', [CommentController::class, 'post_comment_create']);  
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'feedback'

], function ($router) {
    Route::post('/create', [CommentController::class, 'post_feedback_create']);  
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'admin'

], function ($router) {
    //user
    Route::get('/list_users', [UserController::class, 'get_admin_list_users']);
    Route::patch('/update_users', [UserController::class, 'patch_admin_update_users']);
    Route::get('/active_users/{id_user}', [UserController::class, 'get_admin_active_users']);
    Route::delete('/delete_users/{id_user}', [UserController::class, 'delete_admin_delete_users']);
    Route::get('/search_users', [UserController::class, 'get_admin_search_users']);
    //type
    Route::get('/list_type_product', [TypeProductController::class, 'get_admin_list_type_product']);
    Route::delete('/delete_type_product/{id_type_product}', [TypeProductController::class, 'delete_admin_delete_type_product']);
    Route::post('/create_type_product', [TypeProductController::class, 'post_admin_create_type_product']);
    Route::patch('/update_type_product', [TypeProductController::class, 'patch_admin_update_type_product']);
    Route::get('/search_type_product', [TypeProductController::class, 'get_admin_search_type_product']);
    //brand
    Route::get('/list_brand_product', [BrandProductController::class, 'get_admin_list_brand_product']);
    Route::delete('/delete_brand_product/{id_brand_product}', [BrandProductController::class, 'delete_admin_delete_brand_product']);
    Route::post('/create_brand_product', [BrandProductController::class, 'post_admin_create_brand_product']);
    Route::patch('/update_brand_product', [BrandProductController::class, 'patch_admin_update_brand_product']);
    Route::get('/search_brand_product', [BrandProductController::class, 'get_admin_search_brand_product']);
    
    //product
    Route::get('/list_product', [ProductController::class, 'get_admin_list_product']);
    Route::get('/active_product/{id_product}', [ProductController::class, 'get_admin_active_product']);
    Route::post('/create_product', [ProductController::class, 'post_admin_create_product']);
    Route::patch('/update_product', [ProductController::class, 'patch_admin_update_product']);
    Route::patch('/update_quantity_product', [ProductController::class, 'patch_admin_update_quantity_product']);
    
    //image
    Route::get('/list_image', [ImageController::class, 'get_admin_list_image']);
    Route::delete('/delete_image/{id_image}', [ImageController::class, 'delete_admin_delete_image']);
    Route::post('/create_image', [ImageController::class, 'post_admin_create_image']);
    Route::post('/update_image', [ImageController::class, 'post_admin_update_image']);
    //information
    Route::get('/list_information', [InformationController::class, 'get_admin_list_information']);
    Route::delete('/delete_information/{id_information}', [InformationController::class, 'delete_admin_delete_information']);
    Route::post('/create_information', [InformationController::class, 'post_admin_create_information']);
    Route::patch('/update_information', [InformationController::class, 'patch_admin_update_information']);

    //promotion
    Route::get('/list_promotion', [PromotionController::class, 'get_admin_list_promotion']);
    Route::delete('/delete_promotion/{id_promotion}', [PromotionController::class, 'delete_admin_delete_promotion']);
    Route::post('/create_promotion', [PromotionController::class, 'post_admin_create_promotion']);
    Route::patch('/update_promotion', [PromotionController::class, 'patch_admin_update_promotion']);

    //bill
    Route::get('/list_bill', [BillController::class, 'get_admin_list_bill']);
    Route::post('/approve_bill', [BillController::class, 'post_approve_bill']);
    Route::post('/cancel_bill', [BillController::class, 'post_cancel_bill']);

    //billdetail
    Route::get('/list_rated', [BillDetailController::class, 'get_admin_list_rated']);
    Route::post('/delete_billdetail', [BillDetailController::class, 'post_admin_delete_billdetail']);

    //slide
    Route::get('/list_slide', [SlideController::class, 'get_admin_list_slide']);
    Route::delete('/delete_slide/{id_slide}', [SlideController::class, 'delete_admin_delete_slide']);
    Route::post('/create_slide', [SlideController::class, 'post_admin_create_slide']);
    Route::post('/update_slide', [SlideController::class, 'post_admin_update_slide']);

    //news
    Route::get('/list_news', [NewsController::class, 'get_admin_list_news']);
    Route::get('/active_news/{id_news}', [NewsController::class, 'get_admin_active_news']);
    Route::post('/create_news', [NewsController::class, 'post_admin_create_news']);
    Route::post('/update_news', [NewsController::class, 'post_admin_update_news']);

    //news
    Route::get('/list_contact', [ContactController::class, 'get_admin_list_contact']);
    Route::post('/checked_contact', [ContactController::class, 'post_admin_checked_contact']);

    //comment
    Route::get('/list_comment', [CommentController::class, 'get_admin_list_comment']);
    Route::get('/active_news/{id_news}', [NewsController::class, 'get_admin_active_news']);
    Route::post('/create_news', [NewsController::class, 'post_admin_create_news']);
    Route::post('/update_news', [NewsController::class, 'post_admin_update_news']);
});