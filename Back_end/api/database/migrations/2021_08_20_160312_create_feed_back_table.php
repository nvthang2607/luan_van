<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
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
            $table->foreignId('id_comment')
            ->constrained('comment')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('email',50);
            $table->text('comment');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
        $faker=Faker\Factory::create('vi_VN');
        $n=100;
        for($i=1;$i<=$n;$i++){
            DB::table('feed_back')->insert(
                array(
                    'id_comment'=>mt_rand(1,100),
                    'email'=>$faker->email,
                    'comment'=>$faker->sentence(10)
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
