<?php

namespace App\Http;

class Paginator extends \Illuminate\Pagination\LengthAwarePaginator
{
    public function toArray()
    {
        $total = $this->total();
        return [
            'data' => $this->items->toArray(),
            'page' => $this->currentPage(),
            'perPage' => $this->perPage(),
            'total' => $total,
            'totalPages' => ceil($total / $this->perPage()),
        ];
    }
}
