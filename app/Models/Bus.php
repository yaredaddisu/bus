<?php

namespace App\Models;

use App\Models\Seat;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bus extends Model
{
    use HasFactory;
    protected $fillable = ['user_id','busNumber',
    'capacity',
    'type',
    'availability' ];


    public function seats()
    {
        return $this->hasMany(Seat::class);
    }

    // public function addSeats()
    // {
    //     $seats = [];

    //     for ($i = 1; $i <= $this->capacity; $i++) {
    //         $seats[] = new Seat(['seat_number' => $i]);
    //     }

    //     $this->seats()->saveMany($seats);
    // }

       public function user()
       {
              return $this->belongsTo(User::class);
       }

}
