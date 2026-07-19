<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\LocationService;

class LocationController extends Controller
{
    public function show($country, LocationService $locationService)
    {
        try {

            return response()->json(

                $locationService->getCoordinates($country)

            );

        } catch (\Exception $e) {

            return response()->json([

                'message' => $e->getMessage()

            ],404);

        }
    }
}