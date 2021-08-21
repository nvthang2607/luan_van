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
            $table->integer('count')->default(0);
            $table->boolean('active')->default(0);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
        $faker=Faker\Factory::create('vi_VN');
        $n=50;
        for($i=0;$i<$n;$i++){
            $branch= $faker->randomElement(['Điện thoại', 'Máy tính','Máy tính bảng']);
            $type= $faker->randomElement(['Điện thoại', 'Máy tính','Máy tính bảng']);
            $g= $faker->randomElement(['2', '3','6','4','8','32','16','64','128','256','512']);
            $name= $branch." ".$type." ".$g."GB";
            DB::table('product')->insert(
                array(
                    'id_branch'=>mt_rand(1,$n),
                    'name'=>$name,
                    'quantity'=>mt_rand(1,$n),
                    'unit_price'=>mt_rand(1,$n)*1000000,
                    'count' => mt_rand(1,$n),
                    'active'=>$faker->randomElement([0, 1]),
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
