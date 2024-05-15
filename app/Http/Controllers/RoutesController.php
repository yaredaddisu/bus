<?php

namespace App\Http\Controllers;

use App\Http\Requests\RouteRequest;
use App\Http\Resources\RouteResource;
use App\Models\Route;
use Illuminate\Http\Request;

class RoutesController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();
        $perPage = request('per_page', 10000000000);
        $search = request('search', '');
        $sortField = request('sort_field', 'updated_at');
        $sortDirection = request('sort_direction', 'desc');



        $data =  Route::query()
        ->where('user_id', $user->id)
        ->where(function($query) use ($search){
            $query->where('source_city', 'LIKE', '%'.$search.'%')
                   ->orWhere('destination_city', 'LIKE', '%'.$search.'%');


        })
         ->orderBy($sortField, $sortDirection)
        ->paginate($perPage);

        return RouteResource::collection($data);

     }
    public function store(RouteRequest $request)
    {
        $data = $request->validated();


        $route = Route::create($data);

        return response()->json([
            'message'=>'Route Created Successfully!!',
            //'route'=>new routeResource($route)
        ]);
      }

      public function show($id)
      {


          $purchase = Route::where('id', $id)->firstOrFail();
          return new RouteResource($purchase);

         }



         public function update(RouteRequest $request, $id)
         {
             $route = Route::findOrFail($id); // Find the route by its ID

             // Check if the authenticated user has permission to update this route
             if ($request->user()->id !== $route->user_id) {
                 return response()->json(['message' => 'Unauthorized action.'], 403);
             }

             // Validate the incoming request data
             $validatedData = $request->validated();

             // Update the route attributes
             $route->update($validatedData);

             // Return a success response
             return response()->json(['message' => 'Route Updated Successfully!!']);
         }


            public function destroy(Route $route, Request $request)
            {
                $user = $request->user();
                if ($user->id !== $route->user_id) {
                    return abort(403, 'Unauthorized action.');
                }

                $route->delete();


                return response()->json([
                    'message'=>'route was successfully deleted!',
                    //'route'=>new routeResource($route)
                ],200);
             }


                public function deleteAllRoute(Request $request)
                {

            $id = $request->data;
            foreach($id as $route){
               Route::where('id',$route)->delete();

            }

                    return response()->json([
                        'message'=>"route wes successfully deleted"
                    ]);



               }


               public function getRoutesById(Route $route)
               {


               // Retrieve seats for the given bus created today or in the future
               $seats = Route::query()
                           ->where('id', $route->id)
                           ->get()->first();

               return $seats;
               }

}
