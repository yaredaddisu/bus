<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    use HasFactory;
    protected $fillable = ['user_id','cityName',

    'status' ];




       public function user()
       {
              return $this->belongsTo(User::class);
       }

}
