<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('firstName');
            $table->string('lastName');
            $table->enum('gender', ['male', 'female', 'other']);
            $table->integer('age');
            $table->string('contactNumber');
            //$table->string('email')->unique();
            $table->foreignIdFor(\App\Models\Seat::class, 'seat_id')->onDelete('cascade')->onUpdate('cascade');

             $table->foreignIdFor(\App\Models\User::class, 'user_id')->onDelete('cascade')->onUpdate('cascade');
             $table->longText('price') ;
             $table->longText('reference') ;

            $table->foreignId('bus_id')->constrained()->onDelete('cascade');
            $table->foreignId('route_id')->constrained()->onDelete('cascade');
           // $table->foreignId('seat_id')->constrained()->onDelete('cascade');
            $table->date('bookingDate');
            $table->date('journeyDate');
            $table->enum('status', ['booked', 'canceled']);
            $table->enum('paymentStatus', ['pending', 'completed'])->default('pending');
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
        Schema::dropIfExists('reservations');
    }
}
