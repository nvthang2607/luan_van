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
    $str = '<p style=\"text-align:start;\"><span style=\"color: rgb(51,51,51);font-size: 16px;font-family: Helvetica, Arial, \"DejaVu Sans\", \"Liberation Sans\", Freesans, sans-serif;\"><strong>Thời gian mở cửa: Từ 8h - 21h30.</strong></span></p>\n<p style=\"text-align:start;\"></p>\n<img src=\"https://cdn.tgdd.vn/Files/2021/10/17/1391086/topzone_4_1280x867-800-resize.jpg\" alt=\"Chờ đón ngày khai trương chuỗi TopZone\" style=\"height: auto;width: auto\"/>\n<p style=\"text-align:start;\"><span style=\"color: rgb(51,51,51);font-size: 16px;font-family: Helvetica, Arial, \"DejaVu Sans\", \"Liberation Sans\", Freesans, sans-serif;\">Đặc biệt, khách hàng đến tham quan và mua sắm tại cửa hàng sẽ nhận được phiếu mua hàng 300.000 đồng, cùng với các ưu đãi khác như mua</span> <a href=\"https://www.thegioididong.com/dtdd-apple-iphone\" target=\"_blank\"><span style=\"color: rgb(40,138,214);font-size: 16px;font-family: Helvetica, Arial, \"DejaVu Sans\", \"Liberation Sans\", Freesans, sans-serif;\">iPhone</span></a> <span style=\"color: rgb(51,51,51);font-size: 16px;font-family: Helvetica, Arial, \"DejaVu Sans\", \"Liberation Sans\", Freesans, sans-serif;\">tặng tai nghe</span> <a href=\"https://www.thegioididong.com/tai-nghe/bluetooth-beats-flex-mymc2-mymd2\" target=\"_blank\"><span style=\"color: rgb(40,138,214);font-size: 16px;font-family: Helvetica, Arial, \"DejaVu Sans\", \"Liberation Sans\", Freesans, sans-serif;\">Beats Flex</span></a><span style=\"color: rgb(51,51,51);font-size: 16px;font-family: Helvetica, Arial, \"DejaVu Sans\", \"Liberation Sans\", Freesans, sans-serif;\">;</span> <a href=\"https://www.thegioididong.com/laptop-apple-macbook\" target=\"_blank\"><span style=\"color: rgb(40,138,214);font-size: 16px;font-family: Helvetica, Arial, \"DejaVu Sans\", \"Liberation Sans\", Freesans, sans-serif;\">MacBook</span></a><span style=\"color: rgb(51,51,51);font-size: 16px;font-family: Helvetica, Arial, \"DejaVu Sans\", \"Liberation Sans\", Freesans, sans-serif;\">,</span> <a href=\"https://www.thegioididong.com/may-tinh-de-ban-apple-imac\" target=\"_blank\"><span style=\"color: rgb(40,138,214);font-size: 16px;font-family: Helvetica, Arial, \"DejaVu Sans\", \"Liberation Sans\", Freesans, sans-serif;\">iMac</span></a> <span style=\"color: rgb(51,51,51);font-size: 16px;font-family: Helvetica, Arial, \"DejaVu Sans\", \"Liberation Sans\", Freesans, sans-serif;\">giảm đến 3 triệu đồng,... Tham khảo thêm tại website<strong>: </strong></span><a href=\"https://www.topzone.vn/\" target=\"_blank\"><span style=\"color: rgb(40,138,214);font-size: 16px;font-family: Helvetica, Arial, \"DejaVu Sans\", \"Liberation Sans\", Freesans, sans-serif;\">TopZone.vn</span></a>&nbsp;</p>\n';
    echo strlen($str); // 7
    //return view('upfile');
});
Route::post('/upload', [UserController::class, 'file']);