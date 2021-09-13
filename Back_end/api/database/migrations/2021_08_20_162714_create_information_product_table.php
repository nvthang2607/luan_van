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
        $faker=Faker\Factory::create('vi_VN');
        $n=1682;
        for($i=1;$i<=$n;$i++){
            for($u=0;$u<5;$u++){
                DB::table('information_product')->insert(
                    array(
                        'id_product'=>$i,
                        'name'=>'RAM',
                        'content'=>'5GB'
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
        Schema::dropIfExists('information_product');
    }
}
