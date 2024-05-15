<?php

namespace App\Http\Controllers;

use App\Http\Requests\CityRequest;
use App\Http\Resources\CityResource;
use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $perPage = request('per_page', 10000000000);
        $search = request('search', '');
        $sortField = request('sort_field', 'updated_at');
        $sortDirection = request('sort_direction', 'desc');



        $data =  City::query()
        ->where('user_id', $user->id)
        ->where(function($query) use ($search){
            $query->where('cityName', 'LIKE', '%'.$search.'%');


        })
         ->orderBy($sortField, $sortDirection)
        ->paginate($perPage);

        return CityResource::collection($data);

     }
    public function store(CityRequest $request)
    {
        $data = $request->validated();


        $City = City::create($data);

        return response()->json([
            'message'=>'City Created Successfully!!',
            //'City'=>new CityResource($City)
        ]);
      }

      public function show($id)
      {


          $purchase = City::where('id', $id)->firstOrFail();
          return new CityResource($purchase);

         }



         public function update(CityRequest $request, $id)
         {
             $City = City::findOrFail($id); // Find the City by its ID

             // Check if the authenticated user has permission to update this City
             if ($request->user()->id !== $City->user_id) {
                 return response()->json(['message' => 'Unauthorized action.'], 403);
             }

             // Validate the incoming request data
             $validatedData = $request->validated();

             // Update the City attributes
             $City->update($validatedData);

             // Return a success response
             return response()->json(['message' => 'City Updated Successfully!!']);
         }


            public function destroy(City $City, Request $request)
            {
                $user = $request->user();
                if ($user->id !== $City->user_id) {
                    return abort(403, 'Unauthorized action.');
                }

                $City->delete();


                return response()->json([
                    'message'=>'City was successfully deleted!',
                    //'City'=>new CityResource($City)
                ],200);
             }


                public function deleteAllCity(Request $request)
                {

            $id = $request->data;
            foreach($id as $City){
               City::where('id',$City)->delete();

            }

                    return response()->json([
                        'message'=>"City wes successfully deleted"
                    ]);



               }
}
