<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_branch')
            ->constrained('branch_product')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('name',100);
            $table->integer('quantity');
            $table->bigInteger('unit_price');
            $table->bigInteger('promotion_price');
            $table->string('description',1000);
            $table->integer('count')->default(0);
            $table->boolean('active')->default(0);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
        $faker=Faker\Factory::create('vi_VN');
        $n=300;
        for($i=0;$i<$n;$i++){
            $branch= $faker->randomElement(['Điện thoại', 'Máy tính','Máy tính bảng','phụ kiện','']);
            $g= $faker->randomElement(['2', '3','6','4','8','32','16','64','128','256','512','']);
            $r= $faker->randomElement(['A', 'B','C','D','E','F','G','H','I','K','L','U','V','R','']);
            $name= $branch." ".$r.''.$g."GB";
            $unit_price=mt_rand(1,$n)*1000000;
            $promotion_price=$unit_price-$unit_price*mt_rand(1,50)/100;
            DB::table('product')->insert(
                array(
                    'id_branch'=>mt_rand(1,3),
                    'name'=>$name,
                    'quantity'=>mt_rand(1,$n),
                    'unit_price'=>$unit_price,
                    'promotion_price'=>$promotion_price,
                    'count' => mt_rand(1,$n),
                    'active'=>$faker->randomElement([0, 1]),
                    'description'=>'mô tả',
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
        Schema::dropIfExists('product');
    }
}
