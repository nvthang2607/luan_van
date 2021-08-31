<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInformationProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('information_product', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_product')
            ->constrained('product')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('name',100);
            $table->text('content');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
        // $faker=Faker\Factory::create('vi_VN');
        // $n=50;
        // for($i=0;$i<$n;$i++){
        //     DB::table('information_product')->insert(
        //         array(
        //             'id_product'=>mt_rand(1,$n),
        //             'name'=>'name',
        //             'content'=>'content'
        //         )
        //     );
        // }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('information_product');
    }
}
