<?php

namespace App\Http\Resources;

use \DateTime;
use Illuminate\Http\Resources\Json\JsonResource;

class BusResource extends JsonResource
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
            'busNumber' => $this->busNumber,
            'capacity' => $this->capacity,
            'type' => $this->type,
            'availability' => !!$this->availability,

            'created_at' => (new DateTime($this->created_at))->format('Y-m-d '),
            'updated_at' => (new \DateTime($this->updated_at))->format('Y-m-d '),
          ];    }
}
