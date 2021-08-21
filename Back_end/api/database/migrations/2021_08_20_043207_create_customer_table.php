<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer', function (Blueprint $table) {
            $table->id();
            $table->string('name',50);
            $table->string('gender',10);
            $table->string('email',50)->unique();
            $table->string('phone',255);
            $table->string('address',255);
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
            DB::table('customer')->insert(
                array(
                    'name' => $name,
                    'gender'=>$gender,
                    'email'=>$faker->unique()->email,
                    'phone' => $faker->phoneNumber,
                    'address' => $faker->address,
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
        Schema::dropIfExists('customer');
    }
}
