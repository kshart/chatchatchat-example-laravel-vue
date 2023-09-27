<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RequestAcceptJson
{
    public function handle(Request $request, Closure $next)
    {
        // $accept = $request->headers->get('Accept');

        // if ($accept === null || $accept === '*/*' || $accept === 'application/*') {
        //     $request->headers->set('Accept', 'application/json');
        // }

        $request->headers->set('Accept', 'application/json');
        return $next($request);
    }
}
