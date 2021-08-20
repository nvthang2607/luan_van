<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNameTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('name', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });
        $faker=Faker\Factory::create();
        $n=50;
        for($i=0;$i<$n;$i++){
            DB::table('name')->insert(
                array(
                    'name' => $faker->name
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
        Schema::dropIfExists('name');
    }
}
