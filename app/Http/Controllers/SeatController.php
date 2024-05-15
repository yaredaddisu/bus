<?php

namespace App\Http\Controllers;

use App\Http\Requests\SeatRequest;
use App\Http\Resources\SeatResource;
use App\Models\Seat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SeatController extends Controller
{


    public function index(Request $request)
    {
        $user = $request->user();
        $perPage = request('per_page', 10000000000);
        $search = request('search', '');
        $sortField = request('sort_field', 'updated_at');
        $sortDirection = request('sort_direction', 'desc');
        $dateFilter = $request->keyword;
        $route = $request->route;

        $query = Seat::with(['route', 'bus', 'seatQuestions'])
            ->where('user_id', $user->id)
            ->where('journeyDate', $dateFilter);

        if ($route === 'All Routes') {
            // Display all data
        } else {
            $query->where('route_id', $route);
        }

        $data = $query->where(function ($query) use ($search) {
                $query->where('bus_id', 'LIKE', '%' . $search . '%')
                    ->orWhereHas('bus', function ($query) use ($search) {
                        $query->where('busNumber', 'LIKE', '%' . $search . '%')
                            ->orWhere('type', 'LIKE', '%' . $search . '%');
                    });
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate($perPage);

        return SeatResource::collection($data);
    }

     public function store(SeatRequest $request)
     {
         $data = $request->validated();


         $bus = Seat::create($data);
         $bus->addSeats();

         return response()->json([
             'message'=>'Bus Created Successfully!!',
             //'bus'=>new BusResource($bus)
         ]);
       }


    public function show($id)
    {


        $purchase = Seat::with(['route','bus','seatQuestions'])->where('id', $id)->firstOrFail();
        return new SeatResource($purchase);

       }

}
