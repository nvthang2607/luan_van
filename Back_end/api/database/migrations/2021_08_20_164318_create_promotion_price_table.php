<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\Product;
use App\Models\TypeProduct;
use App\Models\BranchProduct;
use Carbon\Carbon;
class CreatePromotionPriceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('promotion_price', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_promotion_type')
            ->constrained('promotion_type')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->integer('id_object');
            $table->dateTime('time_start');
            $table->dateTime('time_finish');
            $table->integer('time_total');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
        // $faker=Faker\Factory::create('vi_VN');
        // $n=50;
        // for($i=0;$i<$n;$i++){
        //     $id=mt_rand(1,3);
        //     switch ($id) {
        //         case '1':
        //             $id_p=Product::all()->pluck('id');
        //             $id_object=$faker->randomElement($id_p);
        //           break;
        //         case 2:
        //             $id_p=TypeProduct::all()->pluck('id');
        //             $id_object=$faker->randomElement($id_p);
        //           break;
        //         case 3:
        //             $id_p=BranchProduct::all()->pluck('id');
        //             $id_object=$faker->randomElement($id_p);
        //           break;
        //     }
        //     $t=mt_rand($n,$n*2);
        //     $now=Carbon::now('Asia/Ho_Chi_Minh');
        //     $now2=$now->addDays($t);
        //     $startDate = Carbon::createFromTimeStamp($faker->dateTimeBetween($now, $now2)->getTimestamp());
        //     $endDate = Carbon::createFromFormat('Y-m-d H:i:s', $startDate)->addDays($t);
        //     $total= $startDate->diffInHours($endDate);
        //     DB::table('promotion_price')->insert(
        //         array(
        //             'id_promotion_type'=>$id,
        //             'id_object'=>$id_object,
        //             'time_start'=>$startDate,
        //             'time_finish'=>$endDate,
        //             'time_total'=>$total
        //         )
        //     );
        //}
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('promotion_price');
    }
}
