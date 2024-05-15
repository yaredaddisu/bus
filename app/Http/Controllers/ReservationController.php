<?php

namespace App\Http\Controllers;

use \Exception;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use App\Models\Seat;
use App\Models\SeatQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();
        $perPage = request('per_page', 10000000000);
        $search = request('search', '');
        $sortField = request('sort_field', 'updated_at');
        $sortDirection = request('sort_direction', 'desc');



        $data =  Reservation::with(['bus'])
        //->where('user_id', $user->id)
        ->where(function($query) use ($search){
            $query->where('firstName', 'LIKE', '%'.$search.'%')
                   ->orWhere('lastName', 'LIKE', '%'.$search.'%')
                   ->orWhere('reference', 'LIKE', '%'.$search.'%')

                   ->orWhereHas('bus',function($query) use ($search){
                    $query->where('busNumber','LIKE', '%'.$search.'%');
                    $query->where('type','LIKE', '%'.$search.'%');

                });

        })
         ->orderBy($sortField, $sortDirection)
        ->paginate($perPage);

        return ReservationResource::collection($data);

     }

     public function store(Request $request)
     {
         $user = $request->user();

         // Validate the request data
         $request->validate([
             'firstName' => 'required|string',
             'lastName' => 'required|string',
             'gender' => 'required|string',
             'price' => 'required|numeric',
             'reference' => 'required|string',
             'age' => 'required|integer',
             'contactNumber' => 'required|string',
             'bookingDate' => 'required|date',
             'journeyDate' => 'required|date',
             'status' => 'required|boolean',
             'paymentStatus' => 'boolean',
             'seats' => 'required|array',
             'seats.*.seat_id' => 'required|exists:seat_questions,id', // Ensure all selected seats exist
             'seats.*.seatNumber' => 'required|string', // Validate seatNumber
         ]);

         // Create the reservation
         $reservation = Reservation::create([
             'firstName' => $request->input('firstName'),
             'lastName' => $request->input('lastName'),
             'gender' => $request->input('gender'),
             'age' => $request->input('age'),
             'contactNumber' => $request->input('contactNumber'),
             'price' => $request->input('price'),
             'bookingDate' => $request->input('bookingDate'),
             'journeyDate' => $request->input('journeyDate'),
             'status' => $request->input('status'),
             'paymentStatus' => $request->input('paymentStatus'),
             'user_id'=> $user->id,
             'bus_id'=>  $request->input('bus_id'),
             'route_id'=>  $request->input('route_id'),
             'reference'=>  $request->input('reference'),
             'seat_id'=>  $request->input('seat_id'),

         ]);

         // Attach selected seats to the reservation
         foreach ($request->input('seats') as $seatData) {
             $reservation->seatQuestions()->attach($seatData['seat_id'], ['seatNumber' => $seatData['seatNumber']]);
             // Update the status of seats to "booked"
             SeatQuestion::where('id', $seatData['seat_id'])->update(['availability' => 'booked']);
         }

         return response()->json(['message' => 'Reservation created successfully']);
     }

}
