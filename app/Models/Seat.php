<?php

namespace App\Models;

use App\Models\Bus;
use App\Models\Reservation;
use App\Models\Route;
use App\Models\SeatQuestion;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    use HasFactory;

    protected $fillable = ['bus_id','user_id', 'capacity','route_id','journeyDate'];

    public function reservations()
    {
        return $this->belongsToMany(Reservation::class)->withPivot('created_at');
    }

    public function bus()
    {
        return $this->belongsTo(Bus::class);
    }

    public function route()
    {
        return $this->belongsTo(Route::class);
    }
    public function seatQuestions()
    {
        return $this->hasMany(SeatQuestion::class);
    }

    public function addSeats()
    {
        $seats = [];

        for ($i = 1; $i <= $this->capacity; $i++) {
            $seats[] = new SeatQuestion(['seatNumber' => $i]);
        }

        $this->seatQuestions()->saveMany($seats);
    }
}
