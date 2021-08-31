<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\User;
class CreateCommentRattingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comment_ratting', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_ratting')
            ->constrained('ratting')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->foreignId('id_user')
            ->constrained('users')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->text('comment');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
        // $faker=Faker\Factory::create('vi_VN');
        // $n=50;
        // for($i=0;$i<$n;$i++){
        //     $id_u=User::where('isadmin','manager')->pluck('id');
        //     $id_user=$faker->randomElement($id_u);
        //     DB::table('comment_ratting')->insert(
        //         array(
        //             'id_ratting'=>mt_rand(1,$n),
        //             'id_user'=>$id_user,
        //             'comment'=>'comment'
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
        Schema::dropIfExists('comment_ratting');
    }
}
