<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\EconomyService;

class EconomyController extends Controller
{
    public function show(
        $country,
        EconomyService $economyService
    )
    {
        try {

            return response()->json(

                $economyService->getEconomy($country)

            );

        } catch (\Throwable $e) {

            return response()->json([

                "message" => $e->getMessage()

            ], 500);

        }
    }
}