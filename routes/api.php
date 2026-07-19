<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CountryController;
use App\Http\Controllers\Api\WeatherController;
use App\Http\Controllers\Api\EconomyController;
use App\Http\Controllers\Api\ExchangeController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\RiskController;
use App\Services\LocationService;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\DashboardController;

Route::get('/country/{country}', [CountryController::class, 'show']);

Route::get('/weather/{lat}/{lng}', [WeatherController::class, 'show']);

Route::get('/economy/{country}', [EconomyController::class, 'show']);

Route::get('/exchange/{currency}', [ExchangeController::class, 'show']);

Route::get(
    '/news/{country}',
    [NewsController::class,'show']
);

Route::get('/risk/{country}',[RiskController::class,'show']);

Route::get('/location/{country}', [LocationController::class, 'show']);

Route::get('/dashboard/{country}', [DashboardController::class, 'show']);