<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\URL;
 use Illuminate\Http\Resources\Json\JsonResource;

class UserManagmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
             'phone' => $this->phone,
             'is_admin' => $this->is_admin,
            'status' => $this->status,
            'is_super_admin' => $this->is_super_admin,
            'image_url' => $this->image ? URL::to($this->image) : null,
            'email' => $this->email,
            'profile' => $this->profile,
            'created_at' => (new \DateTime($this->created_at))->format('D M Y-m-d '),
            'updated_ at' => (new \DateTime($this->updated_at))->format('D M Y-m-d '),

        ];    }
}
