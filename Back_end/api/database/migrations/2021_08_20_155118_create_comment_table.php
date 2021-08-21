<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\GroupChat;
class CreateCommentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comment', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_group')
            ->constrained('group_chat')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('email',50);
            $table->text('comment');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
        $faker=Faker\Factory::create('vi_VN');
        $n=50;
        for($i=0;$i<$n;$i++){
            $id_g=GroupChat::all()->pluck('id');
            $id_group=$faker->randomElement($id_g);
            DB::table('comment')->insert(
                array(
                    'id_group'=>$id_group,
                    'email'=>$faker->email,
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
        Schema::dropIfExists('comment');
    }
}
