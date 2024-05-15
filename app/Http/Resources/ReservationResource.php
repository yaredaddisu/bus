<?php

namespace App\Http\Resources;

use DateTime;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'seat' => $this->seatQuestions->map(function($seat) {
                return [
                          'reservation_id' => $seat->pivot->reservation_id,
                         'seat_id' => $seat->pivot->seat_question_id,
                         'seatNumber' => $seat->pivot->seatNumber,

                ];
            }),
             'bus' => $this->bus,
            'route' => $this->route,
            'price' => $this->price,
            'reference' => $this->reference,

            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'gender' => $this->gender,
            'contactNumber' => $this->contactNumber,
           // 'email' => $this->email,
            'bookingDate' => $this->bookingDate,
            'journeyDate' => $this->journeyDate,
            'status' => $this->status,
            'created_at' => (new DateTime($this->created_at))->format('Y-m-d '),
            'updated_at' => (new \DateTime($this->updated_at))->format('Y-m-d '),
        ];
    }
}
