<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name',50);
            $table->string('gender',10);
            $table->string('email',50)->unique();
            $table->string('password',255);
            $table->string('phone',255);
            $table->string('address',255);
            $table->string('isadmin',50);
            $table->boolean('active')->default(0);
            $table->rememberToken();
            $table->timestamps();
        });
        $faker=Faker\Factory::create('vi_VN');
        $n=50;
        $name=$faker->name;
        for($i=0;$i<$n;$i++){
            $gender = $faker->randomElement(['nam', 'nữ']);
            $admin=$faker->randomElement(['user', 'manager']);
            $active=$faker->randomElement([0,1]);
            DB::table('users')->insert(
                array(
                    'name' => $faker->name,
                    'gender'=>$gender,
                    'email'=>$faker->unique()->email,
                    'password'=>bcrypt($i),
                    'phone' => $faker->phoneNumber,
                    'address' => $faker->address,
                    'isadmin' => $admin,
                    'active'=>$active,
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
        Schema::dropIfExists('users');
    }
}
