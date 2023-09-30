<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TodoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('api')->group(function () {
    Route::prefix('user')->group(function () {
        Route::post('create', [UserController::class, 'create']);
        Route::post('login', [UserController::class, 'login']);
        Route::get('me', [UserController::class, 'me'])->middleware('auth');
        Route::get('meSessions', [UserController::class, 'meSessions'])->middleware('auth');
        Route::post('logout', [UserController::class, 'logout'])->middleware('auth');
        Route::get('index', [UserController::class, 'index'])->middleware('auth');
    });
    Route::prefix('todo')
        ->middleware('auth')
        ->group(function () {
            Route::post('create', [TodoController::class, 'create']);
            Route::get('search', [TodoController::class, 'search']);
            Route::put('{id}', [TodoController::class, 'update']);
        });
});
