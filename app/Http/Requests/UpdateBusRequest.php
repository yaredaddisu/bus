<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBusRequest extends FormRequest
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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'busNumber' => ['string',' ',Rule::unique('buses')->ignore($this->id)],

             'capacity' => 'required|string|max:200',
            'type' =>'required|string|max:200',
            'availability' => 'boolean',
            'user_id' => 'exists:users,id',


        ];
    }
}
