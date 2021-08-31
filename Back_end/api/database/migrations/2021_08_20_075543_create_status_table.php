<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\User;
class CreateStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('status', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_bill')
            ->constrained('bill')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->foreignId('id_user')
            ->constrained('users')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('status',50);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
        // $faker=Faker\Factory::create('vi_VN');
        // $n=50;
        
        // for($i=0;$i<$n;$i++){
        //     $id_u=User::where('isadmin','manager')->pluck('id');
        //     $id_user=$faker->randomElement($id_u);
        //     DB::table('status')->insert(
        //         array(
        //             'id_bill' => mt_rand(1, $n),
        //             'id_user'=>$id_user,
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
        Schema::dropIfExists('status');
    }
}
