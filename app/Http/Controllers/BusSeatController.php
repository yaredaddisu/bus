<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Http\Resources\SeatResource;
use App\Models\Bus;
use App\Models\Reservation;
use App\Models\Route;
use App\Models\Seat;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class BusSeatController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $perPage = request('per_page', 10000000000);
        $search = request('search', '');
        $sortField = request('sort_field', 'updated_at');
        $sortDirection = request('sort_direction', 'desc');

        $id = $request->id;


        $data =  Reservation::query()
        ->where('seat_id', $id)
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

    public function getSeatsByDate(Request $request)
    {
        // Validate the request data
        $request->validate([
            'date' => 'required|date',
        ]);

        // Extract the date from the request
        $date = $request->input('date');

        // Fetch seats from the database filtered by the provided date
        $seats = Seat::whereDate('journeyDate', $date)->get();

        // Return the fetched seats
        return response()->json(['seatQuestions' => $seats]);
    }
    public function getSeatsByRoute(Request $request)
    {
        // Validate the request data
        $request->validate([
            'route_id' => 'required|integer|exists:routes,id',
        ]);

        // Extract the route ID from the request
        $routeId = $request->input('route_id');

        // Fetch seats from the database based on the provided route ID
        $seats = Seat::where('route_id', $routeId)->get();

        // Return the fetched seats
        return response()->json(['seats' => $seats]);
    }

    public function fetchSeatsByRouteAndDate(Request $request)
    {
        // Validate the incoming request parameters
        $request->validate([
            'route_id' => 'required|exists:routes,id',
            'date' => 'required|date_format:Y-m-d',
        ]);

        // Extract route ID and date from the request
        $routeId = $request->input('route_id');
        $date = $request->input('date');

        // Fetch routes based on the specified date and route ID
        // $routes = Route::where('id', $routeId)
        //      ->get();

        // Fetch seats based on the selected route and date
        $seats = Seat::with(['route','bus', 'seatQuestions'])->where('route_id', $routeId)
        ->where('route_id', $routeId)
            ->whereDate('journeyDate', $date)
            ->get();

        // You can customize the response format as needed
        return $seats;

    }
}
