<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePromotionTypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('promotion_type', function (Blueprint $table) {
            $table->id();
            $table->string('name',50);
            $table->bigInteger('value');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
        $faker=Faker\Factory::create('vi_VN');
        $n=50;
        
        for($i=0;$i<$n;$i++){
            DB::table('promotion_type')->insert(
                array(
                    'name'=>$faker->randomElement(['type','branch','product']),
                    'value'=>mt_rand(1,$n)
                )
            );
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('promotion_type');
    }
}
