<?php

namespace App\Http\Controllers;

use App\Http\Requests\BusRequest;
use App\Http\Requests\UpdateBusRequest;
use App\Http\Resources\BusResource;
use App\Models\Bus;
use App\Models\Seat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BusController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();
        $perPage = request('per_page', 10000000000);
        $search = request('search', '');
        $sortField = request('sort_field', 'updated_at');
        $sortDirection = request('sort_direction', 'desc');



        $data =  Bus::query()
        ->where('user_id', $user->id)
        ->where(function($query) use ($search){
            $query->where('busNumber', 'LIKE', '%'.$search.'%')
                   ->orWhere('capacity', 'LIKE', '%'.$search.'%')
                  ->orWhere('type', 'LIKE', '%'.$search.'%');

        })
         ->orderBy($sortField, $sortDirection)
        ->paginate($perPage);

        return BusResource::collection($data);

     }
    public function store(BusRequest $request)
    {
        $data = $request->validated();


        $bus = Bus::create($data);
       // $bus->addSeats();

        return response()->json([
            'message'=>'Bus Created Successfully!!',
            //'bus'=>new BusResource($bus)
        ]);
      }

      public function show($id)
      {


          $purchase = Bus::where('id', $id)->firstOrFail();
          return new BusResource($purchase);

         }



         public function update(UpdateBusRequest $request, $id)
         {
             $bus = Bus::findOrFail($id); // Find the bus by its ID

             // Check if the authenticated user has permission to update this bus
             if ($request->user()->id !== $bus->user_id) {
                 return response()->json(['message' => 'Unauthorized action.'], 403);
             }

             // Validate the incoming request data
             $validatedData = $request->validated();

             // Update the bus attributes
             $bus->update($validatedData);
             //$bus->addSeats();

             // Return a success response
             return response()->json(['message' => 'Bus Updated Successfully!!']);
         }


            public function destroy(Bus $bus, Request $request)
            {
                $user = $request->user();
                if ($user->id !== $bus->user_id) {
                    return abort(403, 'Unauthorized action.');
                }

                $bus->delete();


                return response()->json([
                    'message'=>'Bus was successfully deleted!',
                    //'bus'=>new BusResource($bus)
                ],200);
             }


                public function deleteAllBus(Request $request)
                {

            $id = $request->data;
            foreach($id as $bus){
               Bus::where('id',$bus)->delete();

            }

                    return response()->json([
                        'message'=>"Bus wes successfully deleted"
                    ]);



               }



}
