<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\User;
class CreateNewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_user')
            ->constrained('users')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('image',100);
            $table->longText('title',100);
            $table->text('content');
            $table->boolean('active')->default(1);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
        $faker=Faker\Factory::create('vi_VN');
        $n=50;
        for($i=0;$i<$n;$i++){
            $id_u=User::where('isadmin','manager')->pluck('id');
            $id_user=$faker->randomElement($id_u);
            $t=mt_rand(1,3);
            DB::table('news')->insert(
                array(
                    'id_user'=>5,
                    'image'=>'/source/image/news/news'.$t.'.jpg',
                    'title' => $faker->paragraph,
                    'content'=>'content'
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
        Schema::dropIfExists('news');
    }
}
