<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SeatRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
    protected function prepareForValidation()
    {
        $this->merge([
            'user_id' => $this->user()->id
        ]);
    }

    public function rules()
    {
        return [
             'capacity' => 'numeric',
              'route_id' => 'exists:routes,id',
              'journeyDate' => 'date',

              'user_id' => 'exists:users,id',
             'bus_id' => 'exists:buses,id',

        ];
    }
}
