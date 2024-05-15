<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BusRequest extends FormRequest
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
     * @return array<string, mixed>
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
            'busNumber' => 'required|string|max:200|unique:buses,busNumber',

             'capacity' => 'required|string|max:200',
            'type' =>'required|string|max:200',
            'availability' => 'boolean',
            'user_id' => 'exists:users,id',


        ];
    }
}
