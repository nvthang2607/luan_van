<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact', function (Blueprint $table) {
            $table->id();
            $table->string('name',50);
            $table->text('comment');
            $table->string('email',50)->unique();
            $table->string('phone',255);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
        $faker=Faker\Factory::create('vi_VN');
        $n=50;
        for($i=0;$i<$n;$i++){
            $name=$faker->name;
            $a = explode(".", $name);
            if (str_contains($name, '.')) {
                $name=$a[1];
            }
            else{
                $name=$a[0];
            }
            
            $gender=$faker->randomElement(['Nam', 'Nữ']);
            $admin=$faker->randomElement(['user', 'manager']);
            $active=$faker->randomElement([0,1]);
            DB::table('contact')->insert(
                array(
                    'name' => $name,
                    'comment'=>'comment',
                    'email'=>$faker->unique()->email,
                    'phone' => $faker->phoneNumber,
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
        Schema::dropIfExists('contact');
    }
}
