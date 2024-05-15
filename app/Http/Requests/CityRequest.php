<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CityRequest extends FormRequest
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

             'cityName' => 'required|string|max:200',
             'status' => 'boolean',
            'user_id' => 'exists:users,id',


        ];
    }
}
