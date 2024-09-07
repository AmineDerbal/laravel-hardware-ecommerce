<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductImageController;
use App\Http\Controllers\Api\UserController;

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

Route::controller(CategoryController::class)->group(function () {
    Route::get('categories/header', 'forHeader')->name('categories.header');
});

Route::controller(ProductController::class)->group(function () {
    Route::get('products/latest', 'latest')->name('products.latest');
    Route::get('products/category-products/{slug}', 'getCategoryProducts')->name('products.category-products');
    Route::get('products/{slug}', 'showClientProduct')->name('products.show');

});

Route::controller(AuthController::class)->group(function () {
    Route::post('auth/login', 'login')->name('login');
    Route::post('auth/register', 'register')->name('register');
    Route::post('auth/logout', 'logout')->name('logout');
});

Route::middleware(['usePassportTokenFromCookie','auth:api','checkAdminAccess'])->group(function () {
    Route::controller(UserController::class)->group(function () {
        Route::get('admin/users', 'index')->name('users.admin');
        Route::patch('admin/users/{id}/toggle-active-status', 'toggleIsActiveStatus')->name('users.admin.toggleActiveStatus');
    });

    Route::controller(CategoryController::class)->group(function () {
        Route::get('categories', 'index')->name('categories');
        Route::get('categories/select', 'forSelect')->name('categories.select');
        Route::get('categories/{id}', 'show')->name('categories.show');
        Route::post('categories/store', 'store')->name('categories.store');
        Route::put('categories/update', 'update')->name('categories.update');
        Route::delete('categories/{id}', 'destroy')->name('categories.destroy');
    });

    Route::controller(ProductController::class)->group(function () {
        Route::get('admin/products', 'index')->name('products.admin');
        Route::get('admin/products/{id}', 'show')->name('products.admin.show');
        Route::post('admin/products/store', 'store')->name('products.admin.store');
        Route::post('admin/products/update/thumbnail', 'updateThumbnailImage')->name('products.admin.update.thumbnail');
        Route::put('admin/products/update', 'update')->name('products.admin.update');
        Route::delete('admin/products/{id}', 'destroy')->name('products.admin.destroy');
    });

    Route::controller(ProductImageController::class)->group(function () {
        Route::post('admin/products/store/images', 'store')->name('products.admin.store.images');
        Route::post('admin/products/update/images', 'update')->name('products.admin.update.images');
        Route::delete('admin/products/images/{id}', 'destroy')->name('products.admin.images.destroy');
    });
});
