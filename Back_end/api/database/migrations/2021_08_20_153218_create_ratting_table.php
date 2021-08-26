<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\User;
class CreateRattingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ratting', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_product')
            ->constrained('product')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->foreignId('id_user')
            ->constrained('users')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->integer('ratting');
            $table->text('comment')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
        $faker=Faker\Factory::create('vi_VN');
        $n=50;
        for($i=0;$i<$n;$i++){
            $id_u=User::where('isadmin','user')->pluck('id');
            $id_user=$faker->randomElement($id_u);
            $ratting=mt_rand(1,5);
            if($ratting==0){
                $comment='';
            }
            else{
                $comment='comment';
            }
            DB::table('ratting')->insert(
                array(
                    'id_product'=>mt_rand(1,$n),
                    'id_user'=>$id_user,
                    'ratting'=>$ratting,
                    'comment'=>$comment
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
        Schema::dropIfExists('ratting');
    }
}
