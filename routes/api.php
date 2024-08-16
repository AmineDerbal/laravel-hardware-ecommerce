<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductImageController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::controller(AuthController::class)->group(function () {
    Route::post('auth/login', 'login')->name('login');
    Route::post('auth/register', 'register')->name('register');
    Route::post('auth/logout', 'logout')->name('logout');
});

Route::middleware(['usePassportTokenFromCookie','auth:api','checkAdminAccess'])->group(function () {
    Route::controller(CategoryController::class)->group(function () {
        Route::get('categories', 'index')->name('categories');
        Route::get('categories/select', 'forSelect')->name('categories.select');
        Route::get('categories/header', 'forHeader')->name('categories.header');
        Route::get('categories/{id}', 'show')->name('categories.show');
        Route::post('categories/store', 'store')->name('categories.store');
        Route::put('categories/update', 'update')->name('categories.update');
        Route::delete('categories/{id}', 'destroy')->name('categories.destroy');
    });

    Route::controller(ProductController::class)->group(function () {
        Route::get('products', 'index')->name('products');
        Route::get('products/{id}', 'show')->name('products.show');
        Route::post('products/store', 'store')->name('products.store');
        Route::post('products/update/thumbnail', 'updateThumbnailImage')->name('products.update.thumbnail');
        Route::put('products/update', 'update')->name('products.update');
        Route::delete('products/{id}', 'destroy')->name('products.destroy');
    });

    Route::controller(ProductImageController::class)->group(function () {
        Route::post('products/store/images', 'store')->name('products.store.images');
        Route::post('products/update/images', 'update')->name('products.update.images');
        Route::delete('products/images/{id}', 'destroy')->name('products.images.destroy');
    });
});
