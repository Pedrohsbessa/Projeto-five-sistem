<?php

use App\Http\Controllers\AlbumController;
use Illuminate\Http\Request;
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
use Illuminate\Support\Facades\Route;

Route::resource('albums', AlbumController::class);

use App\Http\Controllers\ImageController;

Route::prefix('albums')->group(function () {
    Route::get('{albumId}/images', [ImageController::class, 'index']);
    Route::get('{albumId}/images/{imageId}', [ImageController::class, 'show']);
    Route::post('{albumId}/images', [ImageController::class, 'store']);
    Route::put('{albumId}/images/{imageId}', [ImageController::class, 'update']);
    Route::delete('{albumId}/images/{imageId}', [ImageController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
