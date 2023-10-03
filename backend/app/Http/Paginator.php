<?php

namespace App\Http;

class Paginator extends \Illuminate\Pagination\Paginator
{
    public function toArray()
    {
        return [
            'data' => $this->items->toArray(),
            'page' => $this->currentPage(),
            'perPage' => $this->perPage(),
            'total' => $this->lastItem(),
            'totalPages' => ceil($this->lastItem() / $this->perPage()),
        ];
    }
}
