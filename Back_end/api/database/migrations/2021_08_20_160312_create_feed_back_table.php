<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\User;
use App\Models\GroupChat;
class CreateFeedBackTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('feed_back', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_group')
            ->constrained('group_chat')
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
        $faker=Faker\Factory::create('vi_VN');
        $n=50;
        for($i=0;$i<$n;$i++){
            $id_g=GroupChat::all()->pluck('id');
            $id_group=$faker->randomElement($id_g);
            $id_u=User::where('isadmin','manager')->pluck('id');
            $id_user=$faker->randomElement($id_u);
            DB::table('feed_back')->insert(
                array(
                    'id_group'=>$id_group,
                    'id_user'=>$id_user,
                    'comment'=>'comment'
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
        Schema::dropIfExists('feed_back');
    }
}
