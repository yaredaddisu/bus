<?php

namespace App\Models;

use App\Models\Seat;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    use HasFactory;
    protected $fillable = ['status','source_city', 'destination_city', 'distance', 'duration', 'price', 'departure_time', 'arrival_time','user_id'];

    public function seats()
    {
        return $this->hasMany(Seat::class);
    }
}
