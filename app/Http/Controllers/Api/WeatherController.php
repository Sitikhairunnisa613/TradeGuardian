<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\WeatherService;

class WeatherController extends Controller
{
    public function show($lat, $lng, WeatherService $weatherService)
    {
        try {

            $weather = $weatherService->getWeather(
                (float) $lat,
                (float) $lng
            );

            return response()->json($weather);

        } catch (\Throwable $e) {

            return response()->json([
                'temperature' => '-',
                'humidity'    => '-',
                'wind'        => '-',
                'weather'     => 'Unknown',
                'message'     => $e->getMessage()
            ], 500);

        }
    }
}