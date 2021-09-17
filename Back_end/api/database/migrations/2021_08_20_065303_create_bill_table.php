<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use App\Models\Customer;
class CreateBillTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bill', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_customer')
            ->constrained('customer')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->bigInteger('total');
            $table->string('payment',50);
            $table->longText('note')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
        // $faker=Faker\Factory::create('vi_VN');
        // $n=50;
        // for($i=0;$i<$n;$i++){
        //     $id_u=User::where('isadmin','manager')->pluck('id');
        //     $id_user=$faker->randomElement($id_u);
        //     DB::table('bill')->insert(
        //         array(
        //             'id_customer' => mt_rand(1, $n),
        //             'id_user'=>$id_user,
        //             'total'=>mt_rand(1, $n),
        //             'payment' => $faker->randomElement(['Tiền mặt', 'Chuyển khoản']),
        //             'note' => $faker->paragraph,
        //             'status' => 'Đang chờ duyệt',
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
        Schema::dropIfExists('bill');
    }
}
