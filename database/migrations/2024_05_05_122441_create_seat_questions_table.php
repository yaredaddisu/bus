<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeatQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('seat_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Seat::class, 'seat_id')->onDelete('cascade')->onUpdate('cascade');
            $table->string('seatNumber');

            $table->enum('availability', ['available', 'booked']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('seat_questions');
    }
}
