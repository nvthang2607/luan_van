<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\Bill;
class CreateBillDetailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bill_detail', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_bill')
            ->constrained('bill')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->foreignId('id_product')
            ->constrained('product')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->integer('quantity');
            $table->bigInteger('price');
            $table->integer('rate');
            $table->string('comment',255)->nullable();;
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
        // $faker=Faker\Factory::create('vi_VN');
        // $n=50;
        // for($i=0;$i<$n;$i++){
        //     $id_b=Bill::all()->pluck('id');
        //     $id_bill=$faker->randomElement($id_b);
        //     DB::table('bill_detail')->insert(
        //         array(
        //             'id_product'=>mt_rand(1,$n),
        //             'id_bill'=>$id_bill,
        //             'quantity'=>mt_rand(1,$n),
        //             'price'=>mt_rand(1,$n)*1000000,
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
        Schema::dropIfExists('bill_detail');
    }
}
