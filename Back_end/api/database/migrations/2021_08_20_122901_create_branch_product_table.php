<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBranchProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('branch_product', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_type')
            ->constrained('type_product')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('name',50);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
        DB::table('branch_product')->insert(
            array(
                'id_type'=>mt_rand(1,2),
                'name'=>'SangSung'
            )
        );
        DB::table('branch_product')->insert(
            array(
                'id_type'=>mt_rand(1,2),
                'name'=>'Apple'
            )
        );
        DB::table('branch_product')->insert(
            array(
                'id_type'=>mt_rand(1,2),
                'name'=>'VMart'
            )
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('branch_product');
    }
}
