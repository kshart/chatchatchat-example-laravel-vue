<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Pagination\Paginator;

class UserController extends Controller
{
    public function create(Request $request)
    {
        $fields = $request->validate([
            'name' => ['required'],
            'phone' => ['required'],
            'password' => ['required'],
        ]);

        $oldUserExists = User::where('phone', $fields['phone'])
            ->when(isset($fields['email']), fn ($q) => $q->orWhere('email', $fields['email']))
            ->exists();
        if ($oldUserExists) {
            abort(400, 'Пользователь уже существует');
        }
        return User::create($fields);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'phone' => ['required'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($credentials)) {
            abort(401);
        }
        $request->session()->regenerate();

        return true;
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->flush();
        return true;
    }

    public function me(Request $request)
    {
        $user = $request->user();
        return $user;
    }

    public function meSessions(Request $request)
    {
        return $request->user()->sessions;
    }

    public function index(Request $request)
    {
        return User::simplePaginate((int) $request->limit);
    }
}
