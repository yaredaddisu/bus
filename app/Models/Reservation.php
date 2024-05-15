<?php

namespace App\Models;

use App\Models\Bus;
use App\Models\Route;
use App\Models\Seat;
use App\Models\SeatQuestion;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [    'firstName','user_id',
    'lastName',
    'gender',
    'age',
    'price',
    'contactNumber' , 'bus_id', 'route_id','reference', 'seat_id', 'bookingDate', 'journeyDate', 'status', 'paymentStatus','seat_id'];
    public function seatQuestions()
    {
        return $this->belongsToMany(SeatQuestion::class)->withPivot('created_at','seatNumber');
    }
    public function reservationSeatData()
    {
        return $this->belongsToMany(Seat::class)->withPivot('created_at', 'updated_at');
    }

    public function bus()
    {
        return $this->belongsTo(Bus::class);
    }

    public function route()
    {
        return $this->belongsTo(Route::class);
    }


}
