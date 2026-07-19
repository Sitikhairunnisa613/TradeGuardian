<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CountryService;

class CountryController extends Controller
{
    public function show($country, CountryService $countryService)
    {
        try {

            return response()->json(

                $countryService->getCountry($country)

            );

        } catch (\Throwable $e) {

            return response()->json([

                'message' => $e->getMessage()

            ],500);

        }
    }
}