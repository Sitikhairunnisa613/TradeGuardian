<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ExchangeService;

class ExchangeController extends Controller
{
    public function show(
        $currency,
        ExchangeService $exchangeService
    )
    {
        try {

            return response()->json(

                $exchangeService->getExchange($currency)

            );

        } catch (\Throwable $e) {

            return response()->json([

                'message' => $e->getMessage()

            ],500);

        }
    }
}