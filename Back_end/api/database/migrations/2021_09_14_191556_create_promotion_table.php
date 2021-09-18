<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;
class CreatePromotionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('promotion', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->foreignId('id_product')
            ->constrained('product')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('code',50);
            $table->bigInteger('value');
            $table->dateTime('start');
            $table->dateTime('finish');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
        $faker=Faker\Factory::create('vi_VN');
        $n=300;
        for($i=1;$i<=$n;$i++){
            for($u=1;$u<4;$u++){
                $t=mt_rand(1,4);
                $d=mt_rand(11,30);
                $date=Carbon::create(2021, 9, 10, 21, 40, 16);
                $date2=Carbon::create(2021, 9, $d, 21, 40, 16);
                DB::table('promotion')->insert(
                    array(
                        'name'=>$faker->sentence(10),
                        'id_product'=>$i,
                        'code'=>'code'.$t,
                        'value'=>$t*10000,
                        'start'=>$date,
                        'finish'=>$date2,
                    )
                );
            }
            
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('promotion');
    }
}
