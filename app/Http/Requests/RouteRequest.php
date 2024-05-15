<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RouteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'user_id' => $this->user()->id
        ]);
    }

    public function rules()
    {
        return [
            'source_city' => 'required|string|max:200',
            'destination_city' => 'required|string|max:200',
            'distance' => 'required|numeric',
'duration' => 'integer|min:0',
            'price' => 'required|numeric',
            'departure_time' => ' date_format:H:i', // Assuming time format is HH:MM
            'arrival_time' => 'date_format:H:i', // Assuming time format is HH:MM
            'user_id' => 'exists:users,id',
            'status' => 'boolean',


        ];

}
}
