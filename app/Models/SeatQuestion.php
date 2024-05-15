<?php

namespace App\Models;

use App\Models\Reservation;
use App\Models\Seat;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeatQuestion extends Model
{
    use HasFactory;
    protected $fillable = ['seatNumber','availability',
    'seat_id']; // Add 'seatNumber' to the fillable attributes


    public function seats()
    {
        return $this->hasMany(Seat::class);
    }
    public function reservations()
    {
        return $this->belongsToMany(Reservation::class)->withPivot('created_at');
    }
}
